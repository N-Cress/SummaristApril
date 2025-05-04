import { ReduxProvider } from '../lib/redux-provider'
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Find your next book!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body  cz-shortcut-listen="true">
      <ReduxProvider>
        {children}
      </ReduxProvider>
    </body>
  </html>
  );
}
