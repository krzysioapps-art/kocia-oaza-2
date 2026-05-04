"use client";

import { useReveal } from "@/app/hooks/useReveal";

export default function RevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useReveal();

  return <>{children}</>;
}