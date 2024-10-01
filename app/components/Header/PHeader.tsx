"use client";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Languages, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const t = useTranslations("Layout");
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Research", path: "/research" },
    { name: "Members", path: "/members" },
    { name: "Publications", path: "/publications" },
    { name: "Events", path: "/events" },
  ];
  // const isActive = (path: string) => router.pathname === path;
  let currentPath = pathname.replace(`/${currentLang}`, "");

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };

  const getCurrentNavName = () => {
    if (currentPath === "/") {
      return "Home";
    }
    const currentNav = navItems.find((item) => item.path !== "/" && currentPath.startsWith(item.path));
    return currentNav ? currentNav.name : "Nycu Pal";
  };

  const handleChangeLang = () => {
    const currentLang = pathname.startsWith("/en") ? "en" : "zh";
    const nextLocale = currentLang === "en" ? "zh" : "en";
    const pathWithoutLang = pathname.replace(/^\/(en|zh)/, "");

    router.push(`/${nextLocale}${pathWithoutLang}`);
  };

  return (
    <div className="">
      <div className="hidden sm:flex bg-black text-white ">
        <div className="w-5/6  py-4 flex flex-row justify-between m-auto text-base">
          {/* <div className="w-full py-4 flex flex-row justify-between m-auto text-base" style={{ fontSize: "0.95rem" }}> */}
          <div className=" cursor-pointer font-bold ">
            <Link href={"/"}>Photonics and Lithography (PAL) Lab</Link>
          </div>
          <div className="gap-x-8 flex-row flex font-medium ">
            {navItems.map((item) => (
              <Link key={item.name} href={item.path}>
                <span className={`cursor-pointer nav_menu_item ${isActive(item.path) ? "underline underline-offset-8" : ""}`}>{t(item.name)}</span>
              </Link>
            ))}
            <div onClick={handleChangeLang}>
              <Languages className="cursor-pointer nav_menu_item " />
            </div>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden bg-mobile-header px-6 py-6  items-center justify-between">
        <img src={"/imgs/menu.png"} alt="Menu" width={22} height={22} onClick={toggleMenu} />
        <h1 className="text-lg font-semibold text-white ">{getCurrentNavName()}</h1>
        <div className="w-[22px]"></div>
      </div>

      <div className={`fixed top-0 z-20 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4">
          <button onClick={toggleMenu} className="mb-4">
            <X size={24} />
          </button>
          <nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.path} className="mb-2">
                  <a
                    href={item.path}
                    className={`block p-2 ${isActive(item.path) ? "bg-gray-200" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.path);
                      toggleMenu();
                    }}
                  >
                    {t(item.name)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
