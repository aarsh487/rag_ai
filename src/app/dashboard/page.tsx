"use client";

import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import React, { useState } from "react";
import nonote from "/public/images/nonote.png";
import { Card } from "@/components/Card";
import { Topbar } from "@/components/Topbar";
import { Modal } from "@/components/Modal";

function Page() {
  const [modalOpen, setModalOpen] = useState(false);

  const notes = [
    { title: "one", content: "one tow three" },
    { title: "two", content: "one tow three" },
    { title: "three", content: "one tow three" },
    { title: "four", content: "one tow three" },
    { title: "five", content: "one tow three" },
    { title: "six", content: "one tow three" },
    { title: "eight", content: "one tow three" },
    { title: "seven", content: "one tow three" },
    { title: "nine", content: "one tow three" },
    { title: "ten", content: "one tow three" },
  ];

  return (
    <section className="relative min-h-screen">
      <div className="grid grid-cols-6">
        {/* Sidebar with subtle glassmorphism */}
        <div className="col-span-1 bg-neutral-900/80 backdrop-blur-lg p-4 h-screen flex flex-col justify-between">
          <Sidebar />
        </div>

        {/* Modal - Stronger Glass Effect */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-lg">
            <Modal onClose={() => setModalOpen(false)} />
          </div>
        )}

        {/* Main Content */}
        <div className="col-span-5">
          <div className="p-8">
            <Topbar modalOpen={modalOpen} setModalOpen={setModalOpen} />
          </div>

          {/* Notes Grid */}
          {notes.length > 0 ? (
            <div className="p-8 grid grid-cols-3 gap-4">
              {notes.map((note) => (
                <div
                  key={note.title}
                  className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg"
                >
                  <Card title={note.title} content={note.content} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Image width={300} height={300} src={nonote} alt="nonote" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
