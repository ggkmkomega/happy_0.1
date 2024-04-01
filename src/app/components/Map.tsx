import Image from "next/image";
import React from "react";
import Google_Image from "~/app/assets/Google_Image.png";

const Map: React.FC = () => {
  return (
    <Image
      src={Google_Image}
      className=" h-screen w-screen overflow-hidden"
      alt="Google Map Mockup"
    />
  );
};

export default Map;
