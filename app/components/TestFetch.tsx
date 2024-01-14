"use client"

import React, { ChangeEvent, useState,useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';

const TestFetch = () => {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [data, setData] = useState({
        name: 'MICH',
        password:"MICH",
        image: "",
      });
  
 /*    const submitFunction = async() => {
        const dataResponse = await fetch('/api/testpost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({ name:'verce', password:'verce', image:'123verce5' }),
          });
        
          return dataResponse;
    } */

    const submitFunction = async  (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
    
        if (inputFileRef.current?.files) {
     
            let file = inputFileRef.current?.files[0];
            
            const imageResponse = await fetch(
                    `/api/newimage?filename=${file?.name}`,
                    {
                      method: 'POST',
                      body: file,
                    }
                  );
              
                const newBlob = (await imageResponse.json()) as PutBlobResult;
                
                setBlob(newBlob);
        
        
            if (newBlob.url) {

        
                setData({...data,image:newBlob.url})
                const dataResponse = await fetch('/api/testpost', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      
                    },
                    body: JSON.stringify({ name:'live', password:'live-verce', image:newBlob.url }),
                  });
                  
         
        
                  if(dataResponse.status !== 200) {
                    console.log('something went wrong')
                  }
        
              return dataResponse
                }
            }
    }    
    return (
    <div>TestFetch
       {/*  <button onClick={submitFunction}>fetch POST</button> */}

        <form onSubmit={submitFunction}>
        <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center cursor-pointer">
          <svg
            className="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H5zm10 8H5v2h10v-2z" />
          </svg>
          Choose File
          <input
            name="file"
            ref={inputFileRef}
            type="file"
            className="hidden"
          />
        </label>
        <button type="submit">save new Contact</button>
        </form>
    </div>


  )
}

export default TestFetch