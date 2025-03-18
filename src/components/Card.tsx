import React from "react";
import { YoutubeEmbed } from "./YoutubeEmbed";
import { Trash, Edit, Star } from "lucide-react";
import { notesType } from "@/app/dashboard/page";



export const Card = ({
 note,
  url,
  deleteNote
}: {
note: notesType
  url?: string | null,
  deleteNote: (id: string) => void;
}) => {

  function extractYouTubeID(url: string) {
      const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    }

     const videoID = url ? extractYouTubeID(url) : null;
    
  return (
    <div className="max-w-[350px] max-h-80 border border-neutral-800 rounded-lg overflow-hidden shadow-md">
      {/* Gradient Background */}
      <div className="bg-transparent">
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-semibold text-lg flex items-center gap-2">
            📝 {note.title}
          </h1>
          <div className="flex gap-2">
            <Edit size={18} className="cursor-pointer hover:text-blue-400" />
            <Trash size={18} className="cursor-pointer hover:text-red-400" onClick={() => deleteNote(note.id)} />
            <Star size={18} className="cursor-pointer hover:text-yellow-400" />
          </div>
        </div>

        {/* YouTube Embed */}
       { url && <div className="px-2">
          <YoutubeEmbed link={videoID} />
        </div> }

        {/* Content */}
        <div className="font-medium text-sm text-neutral-300 pt-4">
          <p>{note.note}</p>
        </div>

        {/* Timestamp */}
        <p className="text-xs text-neutral-500 mt-2">Last edited: 2 hours ago</p>
      </div>
    </div>
  );
};
