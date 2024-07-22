import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

export default function Header() {
  const t = useTranslations("Layout");

  return (
    <div className="font-space-grotesk">
      <div className="hidden sm:flex bg-black text-white ">
        <div className="w-5/6  py-5 flex flex-row justify-between m-auto text-base">
          <div className=" cursor-pointer font-bold ">Photonics and Lithography Lab</div>
          <div className="gap-x-8 flex-row flex font-medium ">
            <span className="cursor-pointer nav_menu_item">{t("Home")}</span>
            <span className="cursor-pointer nav_menu_item">{t("Research")}</span>
            <span className="cursor-pointer nav_menu_item">{t("Members")}</span>
            <span className="cursor-pointer nav_menu_item">{t("Publications")}</span>
            <span className="cursor-pointer nav_menu_item">{t("Events")}</span>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden bg-mobile-header px-6 py-4">
        <img src={"/imgs/menu.png"} alt="Menu" width={22} height={22} />
      </div>
    </div>
  );
}
