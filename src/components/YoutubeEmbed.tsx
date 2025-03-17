import React from "react";

export const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <div className="w-full aspect-video rounded-lg overflow-hidden border border-neutral-800">
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube"
    />
  </div>
);
