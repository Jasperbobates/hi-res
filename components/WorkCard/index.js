import React from "react";

const WorkCard = ({ img, name, description, onClick, backgroundColor = "#ffffff", objectPosition = "center", aspectRatio = "auto" }) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300"
        style={{ backgroundColor: backgroundColor }}
      >
        <img
          alt={name}
          className={`w-full h-96 rounded-lg shadow-lg hover:scale-110 transition-all ease-out duration-300 ${
            aspectRatio !== "auto" ? "object-contain" : "object-cover"
          }`}
          style={{ 
            objectPosition: objectPosition,
            aspectRatio: aspectRatio !== "auto" ? aspectRatio : undefined
          }}
          src={img}
        ></img>
      </div>
      <h1 className="mt-5 text-3xl font-medium">
        {name ? name : "Project Name"}
      </h1>
      <h2 className="text-xl opacity-50">
        {description ? description : "Description"}
      </h2>
    </div>
  );
};

export default WorkCard;
