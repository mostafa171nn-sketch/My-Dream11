import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MY Dream Academy - Achieve Your Dreams with Expert Coaching",
  description: "MY Dream Academy offers personalized coaching and training programs to help you achieve your goals. Join our community of champions and unlock your potential.",
  keywords: "academy, coaching, training, personal development, champions, dreams, MY Dream Academy",
  authors: [{ name: "MY Dream Academy" }],
  openGraph: {
    title: "MY Dream Academy - Achieve Your Dreams",
    description: "Personalized coaching and training to unlock your potential.",
    type: "website",
  },
  icons: {
    icon: "/logoo.jpeg",
    shortcut: "/logoo.jpeg",
    apple: "/logoo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
