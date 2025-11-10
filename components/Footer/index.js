import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({ showMakokoAttribution = false }) => {
  return (
    <footer id="footer" className="mt-5 laptop:mt-40">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Contact.</h1>
          <div className="mt-5">
            <h1 className="text-3xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl font-bold ml-1 laptop:ml-2">
              LET&apos;S WORK TOGETHER
            </h1>
            <div className="mt-2">
              <Socials />
            </div>
          </div>
        </div>

        {showMakokoAttribution && (
          <div className="flex justify-end">
            <p className="text-[11px] leading-tight text-right text-gray-500 dark:text-gray-400 max-w-sm">
              Makoko aerial image: By{" "}
              <a
                href="//commons.wikimedia.org/wiki/User:Kateregga1"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                Kateregga1
              </a>{" "}
              &ndash; Own work,{" "}
              <a
                href="https://creativecommons.org/licenses/by-sa/4.0"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                CC BY-SA 4.0
              </a>
              ,{" "}
              <a
                href="https://commons.wikimedia.org/w/index.php?curid=83928049"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                Link
              </a>
            </p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
