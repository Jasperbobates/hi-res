import React from "react";
import Image from "next/image";

const WorkCard = ({
  img,
  name,
  description,
  onClick,
  backgroundColor = "#ffffff",
  objectPosition = "center",
  aspectRatio = "4/3",
}) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 w-full"
        style={{
          backgroundColor: backgroundColor,
          aspectRatio: aspectRatio, // keeps consistent scaling
        }}
      >
        <Image
          src={img}
          alt={name || "Project image"}
          layout="fill"                     // ✅ correct for Next.js 12
          objectFit="cover"                 // ✅ fill behavior
          objectPosition={objectPosition}   // ✅ centers image
          className="rounded-lg shadow-lg hover:scale-110 transition-all ease-out duration-300"
          priority
        />
      </div>

      <h1 className="mt-5 text-3xl font-medium">
        {name || "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description || "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;