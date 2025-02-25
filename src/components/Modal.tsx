"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { axiosInstance } from "@/config/axiosInstance";

export const Modal = () => {
    const [ formdata, setFormdata ] = useState({
        title: "",
        note: ""
    })

    const hanfleSubmit = async() => {
        try {
            const response = await axiosInstance.post('/notes', formdata)
            if(response.data.success){
                console.log("success:", response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="relative w-96 h-96 flex justify-center items-center bg-neutral-900 rounded-xl">
      {/* <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 via-neutral-900 to-neutral-900 rounded-xl p-8"> */}
      <div className="flex flex-col gap-4">
        <Input onChange={(e) => setFormdata({...formdata, title: e.target.value})} type="text" placeholder="name" />
        <Input onChange={(e) => setFormdata({...formdata, note: e.target.value})} type="text" placeholder="note" />
        <Button onClick={(e) => { e.preventDefault(); hanfleSubmit()}}>Submit</Button>
        </div>
      {/* </div> */}
    </div>
  );
};
