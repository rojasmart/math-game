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
  name: "",
  difficulty: "medium",
  colorScheme: "default",
  soundEnabled: true,
  points: 0, // Pontos iniciais para desbloquear jogos
  highestPoints: 0,
};

// Create context with methods to update settings
type UserContextType = {
  userSettings: UserSettings | null;
  isLoggedIn: boolean;
  updateName: (name: string) => void;
  updateDifficulty: (difficulty: "easy" | "medium" | "hard") => void;
  updateColorScheme: (scheme: "default" | "dark" | "light" | "contrast") => void;
  toggleSound: () => void;
  addPoints: (points: number) => void;
  logout: () => void;
  login: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [userSettings, setUserSettings] = useState<UserSettings | null>(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("mathGameUserSettings");
      return savedSettings ? JSON.parse(savedSettings) : null;
    }
    return null;
  });

  const isLoggedIn = userSettings !== null;

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mathGameUserSettings", JSON.stringify(userSettings));
    }
  }, [userSettings]);

  // Methods to update settings
  const updateName = (name: string) => {
    setUserSettings((prev) => (prev ? { ...prev, name } : defaultSettings));
  };
  const updateDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    setUserSettings((prev) => (prev ? { ...prev, difficulty } : { ...defaultSettings, difficulty }));
  };

  const updateColorScheme = (colorScheme: "default" | "dark" | "light" | "contrast") => {
    setUserSettings((prev) => (prev ? { ...prev, colorScheme } : { ...defaultSettings, colorScheme }));
  };

  const toggleSound = () => {
    setUserSettings((prev) => {
      if (!prev) return defaultSettings;
      return { ...prev, soundEnabled: !prev.soundEnabled };
    });
  };

  const addPoints = (points: number) => {
    setUserSettings((prev) => {
      if (!prev) return defaultSettings;

      const newTotalPoints = prev.points + points;
      return {
        ...prev,
        points: newTotalPoints,
        // Atualiza o recorde apenas se os pontos desta rodada forem maiores
        highestPoints: points > prev.highestPoints ? points : prev.highestPoints,
      };
    });
  };

  const logout = () => {
    setUserSettings(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("mathGameUserSettings");
    }
  };
  const login = (name: string) => {
    setUserSettings({
      ...defaultSettings,
      name,
    });
  };

  return (
    <UserContext.Provider
      value={{
        userSettings,
        isLoggedIn,
        updateName,
        updateDifficulty,
        updateColorScheme,
        toggleSound,
        addPoints,
        logout,
        login,
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
