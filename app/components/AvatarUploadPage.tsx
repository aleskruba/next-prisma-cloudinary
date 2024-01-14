'use client';

import ContactData from '@/types';
import { fetchAddContact, fetchImage } from '@/utils';
import type { PutBlobResult } from '@vercel/blob';
import React, { ChangeEvent, useState,useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [data, setData] = useState<ContactData>({
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

  const submitFunction = async  (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();

     if (inputFileRef.current?.files) {
    //  throw new Error("No file selected");


    let file = inputFileRef.current?.files[0];

    if (file) {
    
    
        const imageResponse = await fetchImage(file); //custom fetch function  utils/index.ts
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

          setData({
            name: "",
            password:"",
            image: "",
          })

          if (inputFileRef.current) {
            inputFileRef.current.value = '';
          }
     
          setBlob(null)

          return dataResponse

     

          
        }
      }
        else {

          setData({...data,image:''})
  
          const dataResponse = await fetchAddContact(
            data.name,
            data.password
                 );  //custom fetch function  utils/index.ts
       
                 if(dataResponse.status !== 200) {
            console.log('something went wrong')
          }

          setData({
            name: "",
            password:"",
            image: "",
          })
         

          return dataResponse
  
        }
      
       
      }

  }

  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form onSubmit={submitFunction}>

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


      
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}