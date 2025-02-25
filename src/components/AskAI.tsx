"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { axiosInstance } from "@/config/axiosInstance";

export const AskAI = () => {
    const [ query, setQuery ] = useState("");
    const [ data, setData ] = useState("");

    const hanfleSubmit = async() => {
        try {
            console.log(query)
            const response = await axiosInstance.post('/chat', {query})
            if(response.data.success){
                console.log("success:", response.data.response)
            }
            setData(response.data.response)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-neutral-900 rounded-xl flex-col gap-8">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-neutral-900 to-neutral-900 rounded-xl p-8"> */}
      <div className="text-white bg-red-500">
        {data}
      </div>
      <div className="absolute bottom-20 w-full px-20 flex flex-col gap-4">
        <Input className="py-20" onChange={(e) => setQuery(e.target.value)} type="text" placeholder="query" />
        <Button onClick={(e) => { e.preventDefault(); hanfleSubmit()}}>Submit</Button>
        </div>
      {/* </div> */}
    </div>
  );
};
