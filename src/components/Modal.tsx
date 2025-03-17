"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { axiosInstance } from "@/config/axiosInstance";
import { Textarea } from "./ui/textarea";

export const Modal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({ title: "", note: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.note.trim()) return;
    setLoading(true);
    setError(""); // Reset error state

    try {
      const response = await axiosInstance.post("/notes", formData);
      if (response.data.success) {
        console.log("Success:", response.data);
        setFormData({ title: "", note: "" });
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

  return (
    <div className="relative w-96 p-6 bg-neutral-900 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Add a Note</h2>

      {/* Error Message */}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex flex-col gap-4">
        {/* Title Input */}
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          type="text"
          placeholder="Title"
          className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2"
        />

        {/* Note Textarea */}
        <Textarea
          value={formData.note}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Write your note..."
          className="bg-neutral-800 border border-neutral-700 text-white rounded-lg px-4 py-2 h-24"
        />

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
              handleSubmit();
            }}
            className={`w-1/2 text-lg rounded-lg transition-all ${
              loading || !formData.title.trim() || !formData.note.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={loading || !formData.title.trim() || !formData.note.trim()}
          >
            {loading ? "Saving..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};
