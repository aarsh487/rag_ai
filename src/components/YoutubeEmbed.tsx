import React from "react";

export const YoutubeEmbed = ({ embedId }: { embedId: string }) => (
  <div className="">
    <iframe
    className="aspect-video"
      width=""
      height=""
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

