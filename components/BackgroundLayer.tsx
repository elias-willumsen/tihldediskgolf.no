"use client";

import AnimatedBackground from "@/components/bg-anim";
import { useAnimation } from "@/app/animation-provider";

export default function BackgroundLayer() {
  const { isEnabled } = useAnimation();
  if (!isEnabled) return null;
  return <AnimatedBackground />;
}
