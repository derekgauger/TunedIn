import React from "react";

interface BackgroundImageProps {
  image: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ image }) => {
  return (
    <div className="z-0">
      {image ? (
        <img
          src={image}
          alt="Random full-screen background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading image...</p>
        </div>
      )}
    </div>
  );
};

export default BackgroundImage;
