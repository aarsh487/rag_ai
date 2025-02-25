import React from "react";
import { YoutubeEmbed } from "./YoutubeEmbed";

export const Card = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="relative max-w-[350px] h-80 bg-neutral-900 border rounded-xl overflow-hidden">
      {/* <div className="absolute top-0 left-0 bg-red-500 opacity-10 blur-xl rounded-full"></div> */}

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-neutral-900 to-neutral-900 rounded-xl">
        <div className="font-semibold text-xl pl-8 mt-8">
          <h1>{title}</h1>
        </div>
        <div className="aspect-video overflow-hidden px-2">
          <YoutubeEmbed embedId="Zk6YBljdyOw" />
        </div>
        <div className="font-semibold text-sm pt-4 pl-4">
          <h1>lorem*20</h1>
        </div>
      </div>
    </div>
  );
};
