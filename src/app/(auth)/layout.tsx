"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactNode } from "react";

function Navbar({ children }: { children: ReactNode }) {
  const url = usePathname();
  console.log(url);


  return (
    <>
      <div className="flex justify-between px-8 py-12 text-xs tracking-[0.15rem]">
        <div className="border-b border-red-500 pb-1"><Link href={'/'}>HOME</Link></div>
        {url.startsWith("/signin") ? (
            <div className="border-b border-red-500 pb-1"> <Link href={'/signup'}>CREATE ACCOUNT</Link></div>
        ) : (
          <div className="border-b border-red-500 pb-1"> <Link href={'/signin'}>LOG IN</Link></div>
        )}
      </div>
      {children}
    </>
  );
}

export default Navbar;
