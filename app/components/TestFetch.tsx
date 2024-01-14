"use client"
import React from 'react'

const TestFetch = () => {
  
    const submitFunction = async() => {
        const dataResponse = await fetch('/api/testpost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              
            },
            body: JSON.stringify({ name:'verce', password:'verce', image:'123verce5' }),
          });
        
          return dataResponse;
    }

    return (
    <div>TestFetch
        <button onClick={submitFunction}>fetch POST</button>
    </div>


  )
}

export default TestFetch