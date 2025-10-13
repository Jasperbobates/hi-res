import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, handleContactScroll, isBlog }) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* --- MOBILE MENU --- */}
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-medium p-2 laptop:p-0 link cursor-pointer"
              >
                {name}.
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100"
                  >
                    <img
                      className="h-6"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                      alt="theme toggle"
                    />
                  </button>
                )}

                <Popover.Button>
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
                </Popover.Button>
              </div>
            </div>

            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-slate-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              {!isBlog ? (
                <div className="grid grid-cols-1">
                  <button onClick={handleWorkScroll} className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                    Work
                  </button>
                  <button onClick={handleAboutScroll} className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                    About
                  </button>
                  {showBlog && (
                    <Link href="/blog">
                      <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                        Blog
                      </a>
                    </Link>
                  )}
                  {showResume && (
                    <Link href="/resume">
                      <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                        Resume
                      </a>
                    </Link>
                  )}
                  <button onClick={handleContactScroll} className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                    Contact
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1">
                  <Link href="/">
                    <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                      Home
                    </a>
                  </Link>
                  {showBlog && (
                    <Link href="/blog">
                      <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                        Blog
                      </a>
                    </Link>
                  )}
                  {showResume && (
                    <Link href="/resume">
                      <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                        Resume
                      </a>
                    </Link>
                  )}
                  <Link href="/#contact">
                    <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100">
                      Contact
                    </a>
                  </Link>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>

      {/* --- DESKTOP HEADER --- */}
      <div
        className={`mt-10 mb-10 hidden flex-row items-center justify-between p-4 ${
          theme === "light" && "bg-white"
        } dark:text-white tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer mob:p-2 laptop:p-0"
        >
          {name}.
        </h1>

        {!isBlog ? (
          <div className="flex items-center gap-2">
            <button onClick={handleWorkScroll} className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
              Work
            </button>
            <button onClick={handleAboutScroll} className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
              About
            </button>

            {showBlog && (
              <Link href="/blog">
                <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
                  Blog
                </a>
              </Link>
            )}

            {showResume && (
              <Link href="/resume">
                <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
                  Resume
                </a>
              </Link>
            )}

            <button onClick={handleContactScroll} className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
              Contact
            </button>

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
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
                Home
              </a>
            </Link>
            {showBlog && (
              <Link href="/blog">
                <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
                  Blog
                </a>
              </Link>
            )}
            {showResume && (
              <Link href="/resume">
                <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
                  Resume
                </a>
              </Link>
            )}
            <Link href="/#contact">
              <a className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100 tablet:first:ml-0">
                Contact
              </a>
            </Link>
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
        )}
      </div>
    </>
  );
};

export default Header;
