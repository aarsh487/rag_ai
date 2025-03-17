import React from "react";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { Trash, Edit, Star } from "lucide-react";

export const Card = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="relative max-w-[350px] h-80 border border-neutral-800 rounded-xl overflow-hidden shadow-md transition-all hover:shadow-lg">
      {/* Gradient Background */}
      <div className="bg-transparent">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            📝 {title}
          </h1>
          <div className="flex gap-2">
            <Edit size={18} className="cursor-pointer hover:text-blue-400" />
            <Trash size={18} className="cursor-pointer hover:text-red-400" />
            <Star size={18} className="cursor-pointer hover:text-yellow-400" />
          </div>
        </div>

        {/* YouTube Embed */}
        <div className="px-2">
          <YoutubeEmbed embedId="Zk6YBljdyOw" />
        </div>

        {/* Content */}
        <div className="font-medium text-sm text-neutral-300 pt-4">
          <p>{content}</p>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-neutral-500 mt-2">Last edited: 2 hours ago</p>
      </div>
    </div>
  );
};
