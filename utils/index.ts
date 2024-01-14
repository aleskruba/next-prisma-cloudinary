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
        // Add your custom headers here
        // Example:
        'Content-Disposition': 'attachment; filename="filename.extension"',
        'Content-Security-Policy': 'default-src "none"',
        'x-frame-options': 'DENY',
        'x-content-type-options': 'nosniff',
      },
      body: JSON.stringify({ name, password, image }),
    });
  
    return dataResponse;
  }

