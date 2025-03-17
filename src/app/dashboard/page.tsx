"use client";

import { Sidebar } from "@/components/Sidebar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import nonote from "/public/images/nonote.png";
import { Card } from "@/components/Card";
import { Topbar } from "@/components/Topbar";
import { Modal } from "@/components/Modal";
import { axiosInstance } from "@/config/axiosInstance";

interface notesType {
  id: string;
  title: string;
  note?: string;
  link?: string;
  type: string;
  createdAt: Date;
  userId: string;
}

function Page() {
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ notes, setNotes ] = useState<notesType[]>([]);

  const getNotes = async () => {  
    try {
      const response = await axiosInstance.get('/notes');
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

 

  useEffect(() => {
    getNotes();
  },[])

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
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg"
                >
                  <Card title={note.title} content={note.note} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <p className="mt-4 text-lg text-gray-400">No notes yet! Start by creating one.</p>
            <button 
              onClick={() => setModalOpen(true)} 
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow-md transition"
            >
              Add Note
            </button>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Page;
