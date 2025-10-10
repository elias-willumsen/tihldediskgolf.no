"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AnimationContextValue = {
  isEnabled: boolean;
  setIsEnabled: (value: boolean) => void;
};

const AnimationContext = createContext<AnimationContextValue | null>(null);

export function useAnimation() {
  const value = useContext(AnimationContext);
  if (!value)
    throw new Error("useAnimation must be used inside AnimationProvider");
  return value;
}

export default function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isEnabled, setIsEnabled] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("ui.animation.enabled");
    if (stored != null) setIsEnabled(stored === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("ui.animation.enabled", String(isEnabled));
  }, [isEnabled]);

  return (
    <AnimationContext.Provider value={{ isEnabled, setIsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
}
