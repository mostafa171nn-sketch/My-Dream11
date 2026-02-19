'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { collection, getDocs, updateDoc, doc, deleteDoc, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface ContactMessage {
  id: string;
  name: string;
  category: string;
  phone: string;
  message: string;
  date: any;
  status: 'pending' | 'waiting' | 'confirmed';
}

// notification sound function using Web Audio API
const playNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create first beep (higher pitch)
    const oscillator1 = audioContext.createOscillator();
    const gainNode1 = audioContext.createGain();
    oscillator1.connect(gainNode1);
    gainNode1.connect(audioContext.destination);
    oscillator1.frequency.value = 800;
    oscillator1.type = 'sine';
    gainNode1.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    oscillator1.start(audioContext.currentTime);
    oscillator1.stop(audioContext.currentTime + 0.3);
    
    // Create second beep (lower pitch)
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    oscillator2.frequency.value = 600;
    oscillator2.type = 'sine';
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.35);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.65);
    oscillator2.start(audioContext.currentTime + 0.35);
    oscillator2.stop(audioContext.currentTime + 0.65);
  } catch (error) {
    console.log('Audio not supported');
  }
};

// Helper to convert Firestore timestamp to Date
const getDateFromTimestamp = (timestamp: any): Date => {
  if (!timestamp) return new Date(0);
  if (timestamp.toDate) return timestamp.toDate();
  if (timestamp.seconds) return new Date(timestamp.seconds * 1000);
  return new Date(timestamp);
};

export default function Dashboard() {
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [waitingList, setWaitingList] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [isWaitingListOpen, setIsWaitingListOpen] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Track the latest message timestamp to detect truly NEW messages only
  const lastSeenTimestampRef = useRef<number>(0);
  const isFirstLoadRef = useRef(true);

  // Load contact messages from Firebase Firestore with real-time updates
  useEffect(() => {
    // Set up real-time listener for contactMessages collection
    const q = query(collection(db, 'contactMessages'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages: ContactMessage[] = [];
      snapshot.forEach((doc) => {
        messages.push({
          id: doc.id,
          ...doc.data()
        } as ContactMessage);
      });
      
      // Only notify for NEW messages (not deleted ones)
      if (messages.length > 0 && !isFirstLoadRef.current) {
        const latestMessage = messages[0];
        const latestTimestamp = getDateFromTimestamp(latestMessage.date).getTime();
        
        // Only show notification if this is a genuinely new message
        if (latestTimestamp > lastSeenTimestampRef.current) {
          playNotificationSound();
          setHasNewMessage(true);
          setTimeout(() => {
            setHasNewMessage(false);
          }, 10000);
          lastSeenTimestampRef.current = latestTimestamp;
        }
      } else if (messages.length > 0 && isFirstLoadRef.current) {
        // On first load, just set the timestamp without showing notification
        lastSeenTimestampRef.current = getDateFromTimestamp(messages[0].date).getTime();
        isFirstLoadRef.current = false;
      }
      
      setContactMessages(messages);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching messages:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Clear notification flag when user manually refreshes
  const handleRefresh = () => {
    setHasNewMessage(false);
    // Messages are automatically updated via Firebase real-time listener
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'contactMessages', id));
        // Don't update lastSeenTimestampRef - we want to keep tracking for new messages
      } catch (error) {
        console.error('Error deleting document: ', error);
        alert('Failed to delete message. Please try again.');
      }
    }
  };

  const handleConfirmMessage = (id: string) => {
    const updatedMessages = contactMessages.map(msg => 
      msg.id === id ? { ...msg, status: 'confirmed' as const } : msg
    );
    setContactMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    // Remove from waiting list if exists
    const updatedWaitingList = waitingList.filter(msg => msg.id !== id);
    if (updatedWaitingList.length !== waitingList.length) {
      setWaitingList(updatedWaitingList);
      localStorage.setItem('waitingList', JSON.stringify(updatedWaitingList));
    }
  };

  const handleWaitingMessage = (id: string) => {
    // Set status to waiting and add to waiting list
    const updatedMessages = contactMessages.map(msg => 
      msg.id === id ? { ...msg, status: 'waiting' as const } : msg
    );
    setContactMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    
    // Add to waiting list
    const messageToAdd = contactMessages.find(msg => msg.id === id);
    if (messageToAdd) {
      // Check if already in waiting list to avoid duplicates
      if (!waitingList.find(msg => msg.id === id)) {
        const updatedWaitingList = [...waitingList, { ...messageToAdd, status: 'waiting' as const }];
        setWaitingList(updatedWaitingList);
        localStorage.setItem('waitingList', JSON.stringify(updatedWaitingList));
      }
    }
  };

  const handleRemoveFromWaitingList = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      // Remove from waiting list
      const updatedWaitingList = waitingList.filter(msg => msg.id !== id);
      setWaitingList(updatedWaitingList);
      localStorage.setItem('waitingList', JSON.stringify(updatedWaitingList));
      
      // Also delete from main contact messages
      const updatedMessages = contactMessages.filter(msg => msg.id !== id);
      if (updatedMessages.length !== contactMessages.length) {
        setContactMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      }
    }
  };

  const stats = {
    total: contactMessages.length,
    pending: contactMessages.filter(m => m.status === 'pending' || !m.status).length,
    waiting: waitingList.length,
    confirmed: contactMessages.filter(m => m.status === 'confirmed').length
  };

  // Filter both lists based on global search
  const filteredWaitingList = waitingList.filter(message => 
    message.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    message.phone?.toLowerCase().includes(globalSearch.toLowerCase()) ||
    message.category?.toLowerCase().includes(globalSearch.toLowerCase())
  );

  const filteredContactMessages = contactMessages.filter(message => 
    message.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
    message.phone?.toLowerCase().includes(globalSearch.toLowerCase()) ||
    message.category?.toLowerCase().includes(globalSearch.toLowerCase()) ||
    message.message?.toLowerCase().includes(globalSearch.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1f2937] flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard - Contact Messages</h1>
            <div className="flex items-center space-x-4">
              {/* New Message Notification Badge */}
              {hasNewMessage && (
                <div className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg animate-pulse">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="font-semibold">New Message!</span>
                </div>
              )}
            
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-[#111827] rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</div>
              <div className="text-gray-600 dark:text-gray-300">Total Messages</div>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-gray-600 dark:text-gray-300">Pending</div>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-blue-600">{stats.waiting}</div>
              <div className="text-gray-600 dark:text-gray-300">Waiting</div>
            </div>
            <div className="bg-white dark:bg-[#111827] rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <div className="text-gray-600 dark:text-gray-300">Confirmed</div>
            </div>
          </div>
          
          {/* Global Search - Searches all messages */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search all messages..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1f2937] dark:text-white"
              />
              <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Waiting List Section */}
          {waitingList.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg shadow overflow-hidden mb-8">
              <div 
                className="px-6 py-4 bg-blue-100 dark:bg-blue-900/30 border-b border-blue-200 dark:border-blue-800 cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors"
                onClick={() => setIsWaitingListOpen(!isWaitingListOpen)}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-blue-800 dark:text-blue-300 flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Waiting List ({filteredWaitingList.length})
                  </h2>
                  <svg 
                    className={`w-5 h-5 text-blue-800 dark:text-blue-300 transform transition-transform duration-300 ${isWaitingListOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className={`overflow-x-auto transition-all duration-300 ${isWaitingListOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <table className="min-w-full divide-y divide-blue-200 dark:divide-blue-800">
                  <thead className="bg-blue-50 dark:bg-blue-900/20">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-[#111827] divide-y divide-blue-200 dark:divide-blue-800">
                    {filteredWaitingList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                          {globalSearch ? 'No matching results found' : 'No messages in waiting list'}
                        </td>
                      </tr>
                    ) : (
                      filteredWaitingList.map((message) => (
                      <tr key={message.id} className="bg-blue-50/50 dark:bg-blue-900/10">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{message.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 capitalize">{message.category || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{message.phone || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-md">
                          <div className="truncate" title={message.message}>{message.message}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{new Date(message.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Waiting
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleConfirmMessage(message.id)}
                              className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleRemoveFromWaitingList(message.id)}
                              className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 flex items-center"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contact Messages Table */}
          <div className="bg-white dark:bg-[#111827] rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#111827] divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredContactMessages.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                        {globalSearch ? 'No matching results found' : 'No messages yet. Submit a form on the contact page to see it here.'}
                      </td>
                    </tr>
                  ) : (
                    filteredContactMessages.map((message) => (
                      <tr key={message.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {message.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 capitalize">
                          {message.category || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {message.phone || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300 max-w-md">
                          <div className="truncate" title={message.message}>
                            {message.message}
                          </div>
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                        {new Date(message.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          message.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : message.status === 'waiting'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {message.status === 'confirmed' ? 'Confirmed' : message.status === 'waiting' ? 'Waiting' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleConfirmMessage(message.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleWaitingMessage(message.id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 flex items-center space-x-1"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Waiting</span>
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700 flex items-center"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
