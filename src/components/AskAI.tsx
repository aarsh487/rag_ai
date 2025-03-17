"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { axiosInstance } from "@/config/axiosInstance";
import { ArrowRightCircle } from "lucide-react";

export const AskAI = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!query.trim() || loading) return;
    setLoading(true);
    setError("");

    try {
      console.log("User Query:", query);
      const response = await axiosInstance.post("/chat", { query });

      if (response.data.success) {
        console.log("Success:", response.data.response);
        setData(response.data.response);
      } else {
        setError("Failed to fetch response. Try again!");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center rounded-xl p-8 gap-6">
      {/* AI Response Box */}
      <div className="text-white bg-red-500 p-4 rounded-md text-center">
        {error ? <span className="text-red-300">{error}</span> : data || "Ask me something..."}
      </div>

      {/* Input Field with Embedded Button */}
      <div className="absolute bottom-16 w-3/4 flex items-center">
        <div className="relative w-full">
          <Input
            className="w-full py-10 px-4 pr-12 text-lg bg-neutral-800 border border-neutral-700 text-white rounded-lg focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Type your question..."
            disabled={loading}
          />
          {/* Arrow Button Inside Input */}
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
              loading || !query.trim()
                ? "text-gray-600 cursor-not-allowed"
                : "text-red-500 hover:text-red-400 transition-all"
            }`}
            disabled={loading || !query.trim()}
          >
            <ArrowRightCircle size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};
