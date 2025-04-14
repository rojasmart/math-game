"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "../contexts/UserContext";

interface GameHeaderProps {
  title: string;
}

export default function GameHeader({ title }: GameHeaderProps) {
  const { userSettings } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white shadow-md p-4 mb-6 rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Home
          </Link>
          <h1 className="text-2xl font-bold text-blue-700">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          {mounted && (
            <>
              <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-700 font-medium">{userSettings.difficulty}</div>

              <div className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {userSettings.points} pts
              </div>
            </>
          )}

          <Link href="/profile" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
