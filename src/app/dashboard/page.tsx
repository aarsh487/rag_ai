"use client";

import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import React, { useState } from "react";
import nonote from "/public/images/nonote.png";
import { Card } from "@/components/Card";
import { Topbar } from "@/components/Topbar";
import { Modal } from "@/components/Modal";

function page() {
  const [ modalOpen, setModalOpen ] = useState(true);


  const notes = [
    { title: "one", content: "one tow three"},
    { title: "two", content: "one tow three"},
    { title: "three", content: "one tow three"},
    { title: "four", content: "one tow three"},
    { title: "five", content: "one tow three"},
    { title: "six", content: "one tow three"},
    { title: "eight", content: "one tow three"},
    { title: "seven", content: "one tow three"},
    { title: "nine", content: "one tow three"},
    { title: "ten", content: "one tow three"},
  ];

  // if(modalOpen){
  //   return (
      
  //       <div>
  //         <Modal />
  //       </div>
  //   )
  // }

  return (
    <section>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-neutral-900 p-4 h-auto flex flex-col justify-between">
          <Sidebar />
        </div>
        {modalOpen && (
          <div className="absolute z-10 top-72 right-80">
            <Modal />
          </div>
        )}
        <div className="col-span-5">
        <div className="p-8">
          <Topbar modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
        {notes.length > 0 ? (
          <div className=" p-8 grid grid-cols-4 gap-8">
            {notes.map((note) => (
              <div key={note.title} className="">
                <Card title={note.title} content={note.content} />
              </div>
            ))}
          </div>
          
        ) : (
          <div className="inline-flex justify-center items-center">
            <Image width={300} height={300} src={nonote} alt="nonote" />
          </div>
        )}
      </div>
      </div>
    </section>
  );
}

export default page;
