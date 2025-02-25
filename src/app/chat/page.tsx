import { AskAI } from "@/components/AskAI";
import { Sidebar } from "@/components/Sidebar";
import React from "react";

function page() {
  return (
    <section>
      <div className="grid grid-cols-6">
        <div className="col-span-1 bg-neutral-900 p-4 h-auto flex flex-col justify-between">
          <Sidebar />
        </div>
        <div className="col-span-5">
            <AskAI />
        </div>
      </div>
    </section>
  );
}

export default page;
