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
    { name: "Home", icon: <IoHomeOutline /> },
    { name: "Links", icon: <IoDocumentOutline /> },
    { name: "Ask Ai", icon: <IoHomeOutline /> },
  ];

  console.log(data?.user);
  return (
    <>
      <div className="">
        <div className="flex items-center text-2xl font-semibold tracking-wider">
          <Image src={appLogo1} alt="logo" width={50} height={50} />
          <span className="pb-2">Brainly</span>
        </div>
        <div>
          {tags.map((tag) => (
            <div
              key={tag.name}
              className="flex gap-4 hover:bg-neutral-800 rounded-lg items-center px-2 py-1 text-lg mt-4"
            >
              <Link href={('/chat')}>
              <div>{tag.icon}</div>
              <div>{tag.name}</div>
              </Link>
            </div>
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
