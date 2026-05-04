// app/(public)/layout.tsx

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import { ReactNode } from "react";

export default function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}