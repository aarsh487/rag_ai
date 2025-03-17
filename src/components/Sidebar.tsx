"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { IoDocumentOutline, IoHomeOutline } from "react-icons/io5";
import appLogo1 from "/public/images/appLogo1.png";
import Image from "next/image";
import Link from "next/link";

export const Sidebar = () => {
  const { data, status } = useSession();

  const tags = [
    { name: "Home", icon: <IoHomeOutline />, href: "dashboard" },
    { name: "Links", icon: <IoDocumentOutline />, href: "dashboard" },
    { name: "Ask Ai", icon: <IoHomeOutline />, href: "chat" },
  ];

  console.log(data?.user);
  return (
    <>
      <div className="">
        <div className="flex items-center text-2xl">
          <Image src={appLogo1} alt="logo" width={50} height={50} />
          {/* <span className="tracking-widest">Brainly</span> */}
        </div>
        <div>
          {tags.map((tag) => (
            <Link key={tag.name} href={`${tag.href}`}>
              <div className="flex gap-4 hover:bg-neutral-800 rounded-lg items-center px-2 py-1 text-lg mt-4">
                <div>{tag.icon}</div>
                <div>{tag.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="inline-flex justify-center items-center rounded-full size-8 border border-white">
        {data?.user.username
          .split(" ")
          .reduce((acc: string, word: string) => acc + word[0], "")
          .toUpperCase()}
      </div>
    </>
  );
};
