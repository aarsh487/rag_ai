import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import React from "react";
import nonote from "/public/images/nonote.png";
import { Card } from "@/components/Card";

function page() {
  const notes = [
    { title: "one", content: "one tow three"},
  ];

  return (
    <section>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-neutral-900 p-4 h-screen flex flex-col justify-between">
          <Sidebar />
        </div>
        {notes.length > 0 ? (
          <div className="col-span-3">
            {notes.map((note) => (
                <Card title={note.title} content={note.content} />
            ))}
          </div>
        ) : (
          <div className="col-span-3 inline-flex justify-center items-center">
            <Image width={300} height={300} src={nonote} alt="nonote" />
          </div>
        )}
      </div>
    </section>
  );
}

export default page;
