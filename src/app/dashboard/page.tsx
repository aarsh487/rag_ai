"use client";

import React from "react";
import { IoDocumentOutline, IoHomeOutline } from "react-icons/io5";
import appLogo1 from "/public/images/appLogo1.png";
import Image from "next/image";
import { useSession } from "next-auth/react";

function page() {
  const tags = [
    { name: "Home", icon: <IoHomeOutline /> },
    { name: "Links", icon: <IoDocumentOutline /> },
    { name: "Ask Ai", icon: <IoHomeOutline /> },
  ];

  const { data, status } = useSession();

  console.log(data?.user);

  return (
    <section>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-neutral-900 p-4 h-screen flex flex-col justify-between">
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
                  <div>{tag.icon}</div>
                  <div>{tag.name}</div>
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
        </div>
        <div className="col-span-3"></div>
      </div>
    </section>
  );
}

export default page;
