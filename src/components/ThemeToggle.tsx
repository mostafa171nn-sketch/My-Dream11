'use client';

import { useState, useEffect, useId } from 'react';

interface ThemeToggleProps {
  id?: string;
  isDark?: boolean;
  onToggle?: () => void;
}

const ThemeToggle = ({ id, isDark: externalIsDark, onToggle }: ThemeToggleProps) => {
  const [internalIsDark, setInternalIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const uniqueId = useId();
  const toggleId = id || `theme-toggle-${uniqueId}`;

  // Use external prop if provided, otherwise use internal state
  const isDark = externalIsDark !== undefined ? externalIsDark : internalIsDark;

  useEffect(() => {
    setMounted(true);
    // Only set initial state from localStorage if no external prop provided
    if (externalIsDark === undefined) {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setInternalIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setInternalIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, [externalIsDark]);

  const toggleTheme = () => {
    // If external onToggle provided, use it
    if (onToggle) {
      onToggle();
    } else {
      // Otherwise use internal state
      const newIsDark = !isDark;
      setInternalIsDark(newIsDark);
      
      if (newIsDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      
      // Update body styles
      document.body.style.backgroundColor = newIsDark ? '#0a0a0a' : '#ffffff';
      document.body.style.color = newIsDark ? '#ffffff' : '#171717';
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="toggle-container" style={{ width: '160px', height: '80px' }} />;
  }

  return (
    <div className="toggle-container" style={{ width: '160px', height: '80px', transform: 'scale(0.7)' }}>

      <input
        type="checkbox"
        id={toggleId}
        className="toggle-input"
        checked={isDark}
        onChange={toggleTheme}
      />
      <label htmlFor={toggleId} className="toggle-label">
        <div className="eye left-eye" style={{ position: 'absolute', left: '25px' }}></div>
        <div className="toggle-switch"></div>
        <div className="eye right-eye" style={{ position: 'absolute', right: '25px' }}></div>
        <div className="smile"></div>
      </label>
    </div>
  );
};

export default ThemeToggle;
