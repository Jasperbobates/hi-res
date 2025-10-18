import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, handleContactScroll, isBlog, isResume }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
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
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      className="h-6"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                      alt="theme toggle"
                    />
                  </Button>
                )}

                <Popover.Button>
                  {mounted && (
                    <img
                      className="h-5"
                      src={`/images/${
                        !open
                          ? theme === "dark"
                            ? "menu-white.svg"
                            : "menu.svg"
                          : theme === "light"
                          ? "cancel.svg"
                          : "cancel-white.svg"
                      }`}
                      alt="menu toggle"
                    />
                  )}
                </Popover.Button>
              </div>
            </div>

            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1 gap-3">
                  <Button onClick={() => handleWorkNavigation(close)}>
                    Work
                  </Button>
                  <Button onClick={() => handleAboutNavigation(close)}>
                    About
                  </Button>
                  {showBlog && (
                    <Link href="/blog">
                      <a>
                        <Button onClick={close}>
                          Blog
                        </Button>
                      </a>
                    </Link>
                  )}
                  {showResume && (
                    <Link href="/resume">
                      <a>
                        <Button onClick={close}>
                          Resume
                        </Button>
                      </a>
                    </Link>
                  )}
                  <Button onClick={() => handleContactNavigation(close)}>
                    Contact
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/">
                    <a>
                      <Button onClick={close}>
                        Home
                      </Button>
                    </a>
                  </Link>
                  <Button onClick={() => handleWorkNavigation(close)}>
                    Work
                  </Button>
                  <Button onClick={() => handleAboutNavigation(close)}>
                    About
                  </Button>
                  {showBlog && (
                    <Link href="/blog">
                      <a>
                        <Button onClick={close}>
                          Blog
                        </Button>
                      </a>
                    </Link>
                  )}
                  {showResume && (
                    <Link href="/resume">
                      <a>
                        <Button onClick={close}>
                          Resume
                        </Button>
                      </a>
                    </Link>
                  )}
                  <Button onClick={() => handleContactNavigation(close)}>
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
          theme === "light" && "bg-white"
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

            {mounted && theme && data.darkMode && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0"
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="toggle theme"
                />
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
            {mounted && theme && data.darkMode && (
              <Button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <img
                  className="h-6"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="toggle theme"
                />
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
