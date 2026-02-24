import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import ClientDirection from "@/components/ClientDirection";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

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
    icon: [
      { url: "/logoo.jpeg", type: "image/jpeg", sizes: "32x32" },
      { url: "/logoo.jpeg", type: "image/jpeg", sizes: "16x16" },
    ],
    shortcut: "/logoo.jpeg",
    apple: [
      { url: "/logoo.jpeg", type: "image/jpeg" },
    ],
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
      <body className={`${inter.className} ${poppins.className}`}>
        <LanguageProvider>
          <ClientDirection>
            {children}
          </ClientDirection>
        </LanguageProvider>
      </body>
    </html>
  );
}
