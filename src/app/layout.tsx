import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for a modern tech look
import "./globals.css";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Voltaje | Estaciones de Carga Inteligentes",
  description: "Mantente cargado y conectado con las estaciones de voltaje inteligente de Voltaje.",
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased bg-background text-foreground bg-[url('/grid-bg.svg')]`}
        suppressHydrationWarning
      >
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  );
}
