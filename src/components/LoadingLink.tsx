'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Loading from './Loading';

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  targetContact?: boolean;
}

export default function LoadingLink({ href, children, className = '', targetContact = false }: LoadingLinkProps) {
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    // Only show loading if targetContact is true and we're navigating
    if (targetContact && pathname !== href) {
      e.preventDefault();
      setShowLoading(true);
      
      // Show loading for 2 seconds then navigate
      setTimeout(() => {
        router.push(href);
      }, 2000);
    }
  };

  // Auto-hide loading after 2 seconds if somehow still visible
  useEffect(() => {
    if (showLoading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showLoading]);

  if (showLoading && targetContact) {
    return <Loading fullScreen={true} />;
  }

  return (
    <Link 
      href={href} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
