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
  const handleWorkNavigation = () => {
    if (handleWorkScroll) {
      handleWorkScroll();
    } else {
      router.push('/#work');
    }
  };

  const handleAboutNavigation = () => {
    if (handleAboutScroll) {
      handleAboutScroll();
    } else {
      router.push('/#about');
    }
  };

  useEffect(() => setMounted(true), []);

  const handleFooterScroll = () => {
    console.log('Contact button clicked - attempting to scroll to footer');
    
    // Try multiple selectors to find the footer
    const footer = document.querySelector('footer') || 
                  document.querySelector('.mt-5.laptop\\:mt-40') ||
                  document.querySelector('[class*="mt-5"]') ||
                  document.querySelector('div:last-child');
    
    console.log('Footer element found:', footer);
    
    if (footer) {
      console.log('Scrolling to footer element');
      footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('No footer found, scrolling to bottom of page');
      // Fallback: scroll to bottom of page
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

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
                  <Button onClick={handleWorkNavigation}>
                    Work
                  </Button>
                  <Button onClick={handleAboutNavigation}>
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
                  <Button onClick={handleContactScroll}>
                    Contact
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/">
                    <a>
                      <Button>
                        Home
                      </Button>
                    </a>
                  </Link>
                  <Button onClick={handleWorkNavigation}>
                    Work
                  </Button>
                  <Button onClick={handleAboutNavigation}>
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
                  {isResume ? (
                    <Link href="/#contact">
                      <a>
                        <Button>
                          Contact
                        </Button>
                      </a>
                    </Link>
                  ) : (
                    <Button onClick={handleContactScroll || handleFooterScroll}>
                      Contact
                    </Button>
                  )}
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
            <Button onClick={handleWorkNavigation}>
              Work
            </Button>
            <Button onClick={handleAboutNavigation}>
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

            <Button onClick={handleContactScroll}>
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
            <Button onClick={handleWorkNavigation}>
              Work
            </Button>
            <Button onClick={handleAboutNavigation}>
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
            {isResume ? (
              <Link href="/#contact">
                <a>
                  <Button>
                    Contact
                  </Button>
                </a>
              </Link>
            ) : (
              <Button onClick={handleContactScroll || handleFooterScroll}>
                Contact
              </Button>
            )}
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
