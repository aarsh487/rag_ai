import React from 'react'
import { YoutubeEmbed } from './YoutubeEmbed'

export const Card = ({title, content}: { title: string, content: string}) => {
  return (
    <div>
        <div className='max-w-sm bg-neutral-900 border border-white p-2'>
            <div className='font-semibold text-xl'>
                <h1>{title}</h1>
            </div>
            <div className='font-semibold text-xl'>
                <h1>{content}</h1>
            </div>
            <div className='aspect-video'>
                <YoutubeEmbed embedId="TGpG56pg3UU" />
            </div>
        </div>
    </div>
  )
}
