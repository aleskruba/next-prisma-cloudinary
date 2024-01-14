import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { name,image,password} = data;
    console.log(name,image,password);

    try {

        const contact = await prisma.contact.create({
            data: {
                name,
                password,
                image
              }
         
          }); 
        return NextResponse.json({ message: 'success' }, { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ message: 'Failed to process the message' }),
        { status: 500 }
      );
    }
  } 