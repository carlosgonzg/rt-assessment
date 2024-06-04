import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RT - Assessment",
  description: "&copy; by Carlos Gonzalez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Roboto&display=swap" rel="stylesheet"/>
      </Head>
      <body className="flex flex-col min-h-screen">
        <div className="flex-grow overflow-auto">
          <div className="flex w-full h-12 items-center justify-center bg-main">
            <span className="font-monserrat text-white">
              RT - Assessment
            </span>
          </div>
          <div className="flex w-full p-12 font-montserrat">
            {children}
          </div>
        </div>
        <footer className="flex w-full h-12 items-center justify-center bg-main font-monserrat">
          <span className="text-white">&copy; by Carlos Gonzalez</span>
        </footer>
      </body>
    </html>
  );
}
