import { NextResponse } from "next/server";

export async function GET(request) {
  // Here you can fetch and return game data
  const games = [
    { id: 1, name: "Addition" },
    { id: 2, name: "Subtraction" },
    { id: 3, name: "Multiplication" },
    { id: 4, name: "Division" },
  ];

  return NextResponse.json(games);
}

export async function POST(request) {
  const data = await request.json();
  // Handle the creation of new game data or scores here

  return NextResponse.json({ message: "Game data received", data });
}
