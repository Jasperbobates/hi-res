import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, handleContactScroll, isResume }) => {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  // resolvedTheme gives the final "light" or "dark" after system preference
  // resolution. Use it when deciding which icon/classes to show.
  const currentTheme = resolvedTheme || theme;
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume } = data;

  // Handle work and about navigation from other pages
  const handleWorkNavigation = (closeMenu) => {
    const isMainPage = router.pathname === "/";

    if (isMainPage) {
      // ✅ Smooth scroll if #work exists on the current page
      const section = document.querySelector("#work");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // ✅ Navigate to home and then scroll
      router.push("/#work");
    }

    if (closeMenu) closeMenu();
  };

  const handleAboutNavigation = (closeMenu) => {
    const isMainPage = router.pathname === "/";

    if (isMainPage) {
      // ✅ Smooth scroll if #about exists
      const section = document.querySelector("#about");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      router.push("/#about");
    }

    if (closeMenu) closeMenu();
  };

  // Handle contact navigation
  const handleContactNavigation = (closeMenu) => {
  // Try to find a footer on the current page
    const footer = document.querySelector("#footer") || document.querySelector("footer");

    if (footer) {
      // ✅ Smooth scroll to footer if it exists
      footer.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      // ✅ Fallback: redirect to landing page contact section
      router.push("/#contact");
    }

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
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </Button>
                )}

                <Popover.Button as="div" className="w-full text-left">
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
                        fill
                        style={{ objectFit: "contain" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              {router.pathname === "/" ? (
                <div className="grid grid-cols-1 gap-3">
                  {/* About subsection */}
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button as="div" className="w-full text-left">
                          <Button>
                            About
                            <svg
                              className={`ml-1 h-4 w-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </Button>
                        </Popover.Button>

                        <Popover.Panel
                          className={`ml-4 mt-2 flex flex-col gap-2 ${currentTheme === "dark" ? "bg-slate-800" : "bg-gray-50"
                            } rounded-md p-2`}
                        >
                          <Button onClick={() => { handleAboutNavigation(close); }}>
                            About Hi-Res
                          </Button>
                          {showResume && (
                            <Link href="/resume">
                                <Button onClick={close}>About Jasper</Button>
                            </Link>
                          )}
                        </Popover.Panel>
                      </>
                    )}
                  </Popover>

                  <Button onClick={() => handleWorkNavigation(close)}>
                    Work
                  </Button>

                  {showBlog && (
                    <Link href="/blog">
                        <Button onClick={close}>
                          Blog
                        </Button>
                    </Link>
                  )}
                  <Button onClick={() => handleContactNavigation(close)}>
                    Contact
                  </Button>
                </div>
                
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/">
                      <Button onClick={close}>
                        Home
                      </Button>
                  </Link>
                    {/* About subsection */}
                    <Popover className="relative">
                      {({ open }) => (
                        <>
                          <Popover.Button as="div" className="w-full text-left">
                            <Button>
                              About
                              <svg
                                className={`ml-1 h-4 w-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
                            </Button>
                          </Popover.Button>

                          <Popover.Panel
                            className={`ml-4 mt-2 flex flex-col gap-2 ${currentTheme === "dark" ? "bg-slate-800" : "bg-gray-50"
                              } rounded-md p-2`}
                          >
                            <Button onClick={() => { handleAboutNavigation(close); }}>
                              About Hi-Res
                            </Button>
                            {showResume && (
                              <Link href="/resume">
                                  <Button onClick={close}>About Jasper</Button>
                              </Link>
                            )}
                          </Popover.Panel>
                        </>
                      )}
                    </Popover>

                    <Button onClick={() => handleWorkNavigation(close)}>
                      Work
                    </Button>

                  {showBlog && (
                    <Link href="/blog">
                        <Button onClick={close}>
                          Blog
                        </Button>
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
        className={`mt-10 mb-10 hidden flex-row items-center justify-between ${mounted && currentTheme === "light" ? "bg-white" : ""
          } dark:text-white tablet:flex`}
      >
        <h1
          onClick={() => router.push("/")}
          className="font-medium cursor-pointer"
        >
          {name}.
        </h1>

        {router.pathname === "/" ? (
          <div className="flex items-center gap-3">
            {/* About dropdown */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button as="div"
                    className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100"
                  >
                    About
                    <svg
                      className={`ml-1 h-4 w-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Popover.Button>

                  <Popover.Panel
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${currentTheme === "dark" ? "bg-slate-800" : "bg-white"
                      }`}
                  >
                    <div className="p-2 flex flex-col gap-1">
                      <Button onClick={() => handleAboutNavigation()}>
                        About Hi-Res
                      </Button>
                      {showResume && (
                        <Link href="/resume">
                            <Button>About Jasper</Button>
                        </Link>
                      )}
                    </div>
                  </Popover.Panel>
                </>
              )}
            </Popover>

            <Button onClick={() => handleWorkNavigation()}>
              Work
            </Button>

            {showBlog && (
              <Link href="/blog">
                  <Button>
                    Blog
                  </Button>
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
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/">
                <Button>
                  Home
                </Button>
            </Link>
              {/* About dropdown */}
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button as="div"
                      className="text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg flex items-center transition-all ease-out duration-300 text-black dark:text-white hover:scale-105 active:scale-100"
                    >
                      About
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform ${open ? "rotate-180" : "rotate-0"
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Popover.Button>

                    <Popover.Panel
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10 ${currentTheme === "dark" ? "bg-slate-800" : "bg-white"
                        }`}
                    >
                      <div className="p-2 flex flex-col gap-1">
                        <Button onClick={() => handleAboutNavigation()}>
                          About Hi-Res
                        </Button>
                        {showResume && (
                          <Link href="/resume">
                              <Button>About Jasper</Button>
                          </Link>
                        )}
                      </div>
                    </Popover.Panel>
                  </>
                )}
              </Popover>

              <Button onClick={() => handleWorkNavigation()}>
                Work
              </Button>

              {showBlog && (
                <Link href="/blog">
                    <Button>
                      Blog
                    </Button>
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
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
