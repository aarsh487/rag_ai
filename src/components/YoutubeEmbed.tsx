import React from "react";

export const YoutubeEmbed = ({ embedId }: { embedId: string }) => (

    <iframe
    className="aspect-video max-w-64"
      width=""
      height=""
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
);

