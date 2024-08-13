import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from '../Redux/Provider/reduxProvider'; // Adjust the path as needed

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To Do",
  description: "Developed by devdragon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
