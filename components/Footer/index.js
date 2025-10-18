import React from "react";
import Socials from "../Socials";
import Link from "next/link";
import Button from "../Button";

const Footer = ({}) => {
  return (
    <>
      <div className="mt-5 laptop:mt-40">
        <div>
          <h1 className="text-2xl text-bold">Contact.</h1>
          <div className="mt-5">
            <h1 className="text-3xl tablet:text-4xl laptop:text-4xl laptopl:text-6xl text-bold ml-1 laptop:ml-2">
              LET&apos;S WORK TOGETHER
            </h1>
            <div className="mt-2">
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
