import { NextResponse } from "next/server";

export async function GET(){
  return NextResponse.json({
    hello: "World"
  })
}


export async function POST(req){
  const data = await req.json();
  console.log(data.message);
  return NextResponse.json({
    hello: "World"
  })
}