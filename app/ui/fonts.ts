import localFont from "next/font/local";

export const helveticaNeue = localFont({
  src: [
    {
      path: "./fonts/HelveticaNeueBlack.otf",
      style: "normal",
      weight: "900",
    },
    {
      path: "./fonts/HelveticaNeueBlackItalic.otf",
      style: "italic",
      weight: "700",
    },
    {
      path: "./fonts/HelveticaNeueBold.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./fonts/HelveticaNeueLight.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./fonts/HelveticaNeueMedium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./fonts/HelveticaNeueMediumItalic.otf",
      style: "italic",
      weight: "500",
    },
  ],
  variable: "--font-helvetica",
});
