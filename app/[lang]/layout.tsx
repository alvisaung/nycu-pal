import type { Metadata } from "next";
import PHeader from "components/Header/PHeader";
import Footer from "components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "style/globals.css";

import { Inter } from "next/font/google";
import Head from "next/head";
export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NYCU PAL",
  description: "Photonics Lab",
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <PHeader />
          <main className="flex-grow">{children}</main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
