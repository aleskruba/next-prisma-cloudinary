'use client';

import type { PutBlobResult } from '@vercel/blob';
import React, { ChangeEvent, useState,useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [data, setData] = useState({
    name: "",
    password:"",
    image: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
  onSubmit={async (event) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current?.files[0];

    const imageResponse = await fetch(
      `/api/newimage?filename=${file?.name}`,
      {
        method: 'POST',
        body: file
      },
    );

    const newBlob = (await imageResponse.json()) as PutBlobResult;
    setBlob(newBlob);

    if (newBlob.url) {

        setData({...data,image:newBlob.url})
    
        const dataResponse = await fetch('/api/newcontact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({...data,image:newBlob.url}), // Sending the message in the request body
          });  

          return dataResponse
        }



}}
  
  >


            <input
              required
              className="form-control"
              placeholder="Enter name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}/>
                
                <input
              required
              className="form-control"
              placeholder="Enter password"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}/>
   
   
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>


      
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}