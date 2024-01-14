"use client"

import React, { ChangeEvent, useState,useRef } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import { fetchAddContact } from '@/utils';

const TestFetch = () => {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const [data, setData] = useState({
        name: '',
        password:"",
        image: "",
      });
  
      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      };
    
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
                const dataResponse = await fetchAddContact(
                    data.name,
                    data.password,
                    newBlob.url
                         );  //custom fetch function  utils/index.ts
                  
         
        
                  if(dataResponse.status !== 200) {
                    console.log('something went wrong')
                  }

                  console.log(dataResponse)
        
              return dataResponse
                }
            }
    }    
    return (
    <div>TestFetch
 

        <form onSubmit={submitFunction}>
        <input
              required
              className="form-control"
              placeholder="Enter name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              autoComplete="username"/>
                
                <input
              required
              className="form-control"
              placeholder="Enter password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              autoComplete="current-password"/>

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