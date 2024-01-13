import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(req: NextRequest) {
  try {
    const contacts = await prisma.contact.findMany();
    return new Response(JSON.stringify({ contacts }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}