"use client";

import { Sidebar } from "@/components/Sidebar";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Topbar } from "@/components/Topbar";
import { Modal, NoteEnums } from "@/components/Modal";
import { axiosInstance } from "@/config/axiosInstance";

export interface notesType {
  id: string;
  title: string;
  note?: string;
  link?: string;
  type: string;
  createdAt: Date;
  userId: string;
}

export interface formDataTypes {
  title: string;
  note?: string;
  link?: string;
  noteType: NoteEnums | null;
}

function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState<notesType[]>([]);
  const [formData, setFormData] = useState<formDataTypes>({
    title: "",
    note: "",
    noteType: null,
    link: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (
      !formData.title.trim() ||
      (!formData.note?.trim() && !formData.link?.trim())
    )
      return;

    setLoading(true);
    setError("");

    try {
      const payload: any = {
        title: formData.title,
        noteType: formData.noteType ? formData.noteType.toUpperCase() : null,
      };

      if (formData.noteType === NoteEnums.DOCUMENT) {
        payload.note = formData.note;
      } else {
        payload.link = formData.link;
      }

      const response = await axiosInstance.post("/notes", payload);

      if (response.data.success) {
        setNotes((prev) => [...prev, response.data.newNote]);
        setFormData({ title: "", note: "", link: "", noteType: null });
        onClose();
      } else {
        setError("Failed to save note. Try again!");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes");
      setNotes(response.data.notes);
      console.log("notes", response.data.notes)
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error in deleting:", error);
    }
  };
  

  const onClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getNotes();
  }, []);

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
            <Modal
              onClose={onClose}
              loading={loading}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />
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
                  <Card note={note} deleteNote={deleteNote} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <p className="mt-4 text-lg text-gray-400">
                No notes yet! Start by creating one.
              </p>
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
