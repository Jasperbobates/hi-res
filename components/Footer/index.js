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
      </div>
    </footer>
  );
};

export default Footer;
