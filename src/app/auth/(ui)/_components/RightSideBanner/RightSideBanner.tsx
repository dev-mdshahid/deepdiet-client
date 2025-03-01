import Image from "next/image";
import React from "react";

export default function RightSideBanner() {
  return (
    <Image
      src={"/img/illustrations/login.png"}
      alt="Image"
      width={600}
      height={600}
      className="m-auto w-full max-w-lg dark:brightness-[0.2] dark:grayscale"
    />
  );
}
