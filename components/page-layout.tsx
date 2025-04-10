import { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/features/home";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-10">{children}</main>
      <Footer />
    </div>
  );
}
