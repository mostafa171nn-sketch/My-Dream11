import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, phone, message } = body;

    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    // Firebase REST API
    const projectId = "my-dream-academy-8cf12";
    const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/contactMessages`;
    
    const response = await fetch(firestoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: {
          name: { stringValue: name },
          category: { stringValue: category || '' },
          phone: { stringValue: phone || '' },
          message: { stringValue: message },
          date: { timestampValue: new Date().toISOString() },
          status: { stringValue: 'pending' }
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to save to Firebase');
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message. Please update Firebase Firestore rules to allow write access.' },
      { status: 500 }
    );
  }
}
