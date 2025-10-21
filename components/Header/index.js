import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, handleContactScroll, isBlog, isResume }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  // resolvedTheme gives the final "light" or "dark" after system preference
  // resolution. Use it when deciding which icon/classes to show.
  const currentTheme = resolvedTheme || theme;
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  // Handle work and about navigation from other pages
  const handleWorkNavigation = (closeMenu) => {
    if (handleWorkScroll) {
      handleWorkScroll();
    } else {
      router.push('/#work');
    }
    if (closeMenu) closeMenu();
  };

  const handleAboutNavigation = (closeMenu) => {
    if (handleAboutScroll) {
      handleAboutScroll();
    } else {
      router.push('/#about');
    }
    if (closeMenu) closeMenu();
  };

  // Handle contact navigation
  const handleContactNavigation = (closeMenu) => {
    router.push('/#contact');
    if (closeMenu) closeMenu();
  };

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* --- MOBILE MENU --- */}
      <Popover className="block tablet:hidden mt-5">
        {({ open, close }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link cursor-pointer"
              >
                {name}.
              </h1>

              <div className="flex items-center">
                {data.darkMode && mounted && (
                  <Button
                    onClick={() =>
                      setTheme(currentTheme === "dark" ? "light" : "dark")
                    }
                  >
                    <div className="h-6 w-6 relative">
                      <Image
                        src={`/images/${currentTheme === "dark" ? "moon.svg" : "sun.svg"}`}
                        alt="theme toggle"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </Button>
                )}

                <Popover.Button className="text-sm p-1 m-1 rounded-lg">
                  {mounted && (
                    <div className="h-6 w-6 relative">
                      <Image
                        src={`/images/${
                          !open
                            ? currentTheme === "dark"
                              ? "menu-white.svg"
                              : "menu.svg"
                            : currentTheme === "light"
                            ? "cancel.svg"
                            : "cancel-white.svg"
                        }`}
                        alt="menu toggle"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  )}
                </Popover.Button>
              </div>
            </div>

            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                currentTheme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="flex flex-col gap-2 items-stretch text-left">
                  <Button classes="w-full justify-start" onClick={() => handleWorkNavigation(close)}>
                    Work
                  </Button>
                  <Button classes="w-full justify-start" onClick={() => handleAboutNavigation(close)}>
                    About
                  </Button>
                  {showBlog && (
                    <Link href="/blog">
                      <Button classes="w-full justify-start" onClick={close}>
                        Blog
                      </Button>
                    </Link>
                  )}
                  {showResume && (
                    <Link href="/resume">
                      <Button classes="w-full justify-start" onClick={close}>
                        Resume
                      </Button>
                    </Link>
                  )}
                  <Button classes="w-full justify-start" onClick={() => handleContactNavigation(close)}>
                    Contact
                  </Button>
                </div>
              ) : (
                  <div className="flex flex-col gap-2 items-stretch text-left">
                    <Button classes="w-full justify-start" onClick={() => handleWorkNavigation(close)}>
                      Work
                    </Button>
                    <Button classes="w-full justify-start" onClick={() => handleAboutNavigation(close)}>
                      About
                    </Button>
                    {showBlog && (
                      <Link href="/blog">
                        <Button classes="w-full justify-start" onClick={close}>
                          Blog
                        </Button>
                      </Link>
                    )}
                    {showResume && (
                      <Link href="/resume">
                        <Button classes="w-full justify-start" onClick={close}>
                          Resume
                        </Button>
                      </Link>
                    )}
                    <Button classes="w-full justify-start" onClick={() => handleContactNavigation(close)}>
                      Contact
                    </Button>
                  </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>

      {/* --- DESKTOP HEADER --- */}
      <div
        className={`mt-10 mb-10 hidden flex-row items-center justify-between ${
          currentTheme === "light" && "bg-white"
        } dark:text-white tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer"
        >
          {name}.
        </h1>

        {!isBlog ? (
          <div className="flex items-center gap-3">
            <Button onClick={() => handleWorkNavigation()}>
              Work
            </Button>
            <Button onClick={() => handleAboutNavigation()}>
              About
            </Button>

            {showBlog && (
              <Link href="/blog">
                <a>
                  <Button>
                    Blog
                  </Button>
                </a>
              </Link>
            )}

            {showResume && (
              <Link href="/resume">
                <a>
                  <Button>
                    Resume
                  </Button>
                </a>
              </Link>
            )}

            <Button onClick={() => handleContactNavigation()}>
              Contact
            </Button>

            {mounted && currentTheme && data.darkMode && (
              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0"
              >
                <div className="h-6 w-6 relative">
                  <Image
                    src={`/images/${currentTheme === "dark" ? "moon.svg" : "sun.svg"}`}
                    alt="toggle theme"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/">
              <a>
                <Button>
                  Home
                </Button>
              </a>
            </Link>
            <Button onClick={() => handleWorkNavigation()}>
              Work
            </Button>
            <Button onClick={() => handleAboutNavigation()}>
              About
            </Button>
            {showBlog && (
              <Link href="/blog">
                <a>
                  <Button>
                    Blog
                  </Button>
                </a>
              </Link>
            )}
            {showResume && (
              <Link href="/resume">
                <a>
                  <Button>
                    Resume
                  </Button>
                </a>
              </Link>
            )}
            <Button onClick={() => handleContactNavigation()}>
              Contact
            </Button>
            {mounted && currentTheme && data.darkMode && (
              <Button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              >
                <div className="h-6 w-6 relative">
                  <Image
                    src={`/images/${currentTheme === "dark" ? "moon.svg" : "sun.svg"}`}
                    alt="toggle theme"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
