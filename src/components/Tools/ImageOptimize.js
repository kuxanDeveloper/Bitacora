import React, { useState } from "react";
import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  let url = src;

  if (url.indexOf("a.storyblok.com") > 0) {
    return `${src}?w=${width}&q=${quality || 100}`;
  } else {
    return `${src}`;
  }
};

function ImageOptimize({ Values }) {
  const [onError, setonError] = useState(false);
  const urlImagneDefault =
    "https://a.storyblok.com/f/160385/1204x738/c090de895c/fedegana.png/m/";
  const handleError = () => {
    setonError(true);
  };

  return (
    <>
      <Image
        loader={myLoader}
        alt={
          Values.alt !== "" && Values.alt != undefined ? Values.alt : "default"
        }
        src={onError ? urlImagneDefault : Values.src == null  ? urlImagneDefault:Values.src  }
        title={Values.title}
        className={Values.classValue}
        width={Values.width}
        height={Values.height}
        style={Values.style}
        quality={100}
        onError={() => handleError()}
      ></Image>
    </>
  );
}

export default ImageOptimize;
