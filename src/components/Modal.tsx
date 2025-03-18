"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { formDataTypes } from "@/app/dashboard/page";

export enum NoteEnums {
  DOCUMENT = "DOCUMENT",
  YOUTUBE = "YOUTUBE",
  TWITTER = "TWITTER",
  INSTAGRAM = "INSTAGRAM",
  LINKEDIN = "LINKEDIN",
  OTHER = "OTHER",
}

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  formData: formDataTypes;
  setFormData: React.Dispatch<React.SetStateAction<formDataTypes>>;
  loading: boolean;
}

export const Modal = ({
  onClose,
  onSubmit,
  formData,
  setFormData,
  loading,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="relative w-96 p-6 bg-neutral-900 rounded-xl shadow-lg"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="text-xl font-semibold text-white mb-4">
          Add a Note
        </h2>

        <div className="flex flex-col gap-4">
          {/* Title Input */}
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
            placeholder="Title"
            className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2"
          />

          {/* Note Textarea */}
          <select
            value={formData.noteType ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                noteType: e.target.value as NoteEnums, // Ensure type safety
                note: "", // Reset the input when switching types
                link: "", // Reset link when switching
              }))
            }
            className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2"
          >
            <option value="" disabled>
              Select Note Type
            </option>
            {Object.values(NoteEnums).map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          {/* Conditional Input Rendering */}
          {formData.noteType === NoteEnums.DOCUMENT ? (
            <Textarea
              value={formData.note}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, note: e.target.value }))
              }
              placeholder="Write your note..."
              className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2 h-24"
            />
          ) : (
            <Input
              value={formData.link ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, link: e.target.value }))
              }
              type="url"
              placeholder="Paste your link..."
              className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2"
            />
          )}

          {/* Buttons Section */}
          <div className="flex justify-between gap-2">
            {/* Cancel Button */}
            <Button
              onClick={onClose}
              className="w-1/2 bg-gray-700 text-white hover:bg-gray-600 transition-all"
            >
              Cancel
            </Button>

            {/* Submit Button */}
            <Button
              onClick={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className={`w-1/2 text-lg rounded-lg transition-all ${
                loading || !formData.title.trim() || !formData.note?.trim()
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={
                loading || !formData.title.trim() || !formData.note?.trim()
              }
            >
              {loading ? "Saving..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
