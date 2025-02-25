"use client";

import React, { ReactNode, SetStateAction, useState } from 'react'
import { Button } from './ui/button'

export const Topbar = ({ modalOpen, setModalOpen}: { modalOpen: boolean, setModalOpen: React.Dispatch<SetStateAction<boolean>>}) => {

    const handleModalOpen = () => {
        const newOption = !modalOpen
        setModalOpen(newOption)
        console.log(newOption)
    };
    
  return (
    <div className='flex justify-end gap-4'>
        <Button onClick={handleModalOpen}>Add Note</Button>
        <Button variant={"outline"}>Ask Ai</Button>
    </div>
  )
}
