"use client";
import { useEffect } from "react";

import "./cat-page.css";
import "../../page.css";
export default function CatLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add("page--cat");
    return () => document.body.classList.remove("page--cat");
  }, []);

  return <>{children}</>;
}