"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the user settings type
type UserSettings = {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  colorScheme: "default" | "dark" | "light" | "contrast";
  soundEnabled: boolean;
  points: number;
  highestPoints: number;
};

// Default settings
const defaultSettings: UserSettings = {
  name: "Player",
  difficulty: "medium",
  colorScheme: "default",
  soundEnabled: true,
  points: 0,
  highestPoints: 0,
};

// Create context with methods to update settings
type UserContextType = {
  userSettings: UserSettings;
  updateName: (name: string) => void;
  updateDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  updateColorScheme: (scheme: "default" | "dark" | "light" | "contrast") => void;
  toggleSound: () => void;
  addPoints: (points: number) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [userSettings, setUserSettings] = useState<UserSettings>(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("mathGameUserSettings");
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    }
    return defaultSettings;
  });

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mathGameUserSettings", JSON.stringify(userSettings));
    }
  }, [userSettings]);

  // Methods to update settings
  const updateName = (name: string) => {
    setUserSettings((prev) => ({ ...prev, name }));
  };

  const updateDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    setUserSettings((prev) => ({ ...prev, difficulty }));
  };

  const updateColorScheme = (colorScheme: "default" | "dark" | "light" | "contrast") => {
    setUserSettings((prev) => ({ ...prev, colorScheme }));
  };

  const toggleSound = () => {
    setUserSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  const addPoints = (points: number) => {
    setUserSettings((prev) => {
      // Só atualiza os pontos se o novo score for maior que o highestPoints
      if (points > prev.highestPoints) {
        return {
          ...prev,
          points: prev.points + points, // Adiciona ao total de pontos
          highestPoints: points, // Atualiza o recorde
        };
      }
      // Se não for maior, retorna o estado anterior sem modificação
      return prev;
    });
  };

  return (
    <UserContext.Provider
      value={{
        userSettings,
        updateName,
        updateDifficulty,
        updateColorScheme,
        toggleSound,
        addPoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
