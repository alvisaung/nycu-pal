import type { Metadata } from "next";
// import { usePathname } from "next/navigation";

import PHeader from "components/Header/PHeader";
import Footer from "components/Footer/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "style/globals.css";

import { helveticaNeue } from "style/fonts";

export const metadata: Metadata = {
  title: "NYCU PAL",
  description: "Photonics Lab",
};

export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const messages = await getMessages();
  // const pathname = usePathname();
  return (
    <html lang={locale} className={helveticaNeue.className}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <PHeader />
          <main className={`flex-grow flex flex-col  ${helveticaNeue.className}`}>{children}</main>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
