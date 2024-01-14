export async function fetchImage(file: File | null | undefined)  {
    const imageResponse = await fetch(
      `/api/newimage?filename=${file?.name}`,
      {
        method: 'POST',
        body: file,
      }
    );
  
    return imageResponse;
  }
  export async function fetchAddContact(
    name: string,
    password: string,
    image?: string
  ): Promise<Response> {
    const dataResponse = await fetch('/api/newcontact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ name, password, image }),
    });
  
    return dataResponse;
  }


  export async function fetchAddContactTEST(
    name: string,
    password: string,
    image?: string
  ): Promise<Response> {
    const dataResponse = await fetch('/api/testpost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ name, password, image }),
    });
  
    return dataResponse;
  }

