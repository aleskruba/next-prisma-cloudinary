import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {

    try {
      const data = await req.json();
      console.log(data);
 
      const { name,image,password} = data;
      console.log(name,image,password);

       if (data) {
      const contact = await prisma.contact.create({
        data: {
            name,
            password,
            image
          }
     
      });  
    }
 
      return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ message: 'Failed to process the message' }),
        { status: 500 }
      );
    }
  } else {
    return new Response(
      JSON.stringify({ message: 'Method Not Allowed' }),
      { status: 500 }
    );
  }
}
