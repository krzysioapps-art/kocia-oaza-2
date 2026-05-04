import "./style/root.css";
import "./style/ui/share-bar.css";
import RevealProvider from "@/app/components/ui/RevealProvider";

//import { DM_Sans, Quicksand } from "next/font/google";
import { Quicksand, Caveat } from "next/font/google";

const quicksand = Quicksand({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-quicksand',
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata = {
  title: "Kocia Oaza",
  description: "Kocia Oaza - strona główna",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${quicksand.variable} ${caveat.variable}`}>
        <RevealProvider>
          {children}
        </RevealProvider>
      </body>
    </html>
  );
}