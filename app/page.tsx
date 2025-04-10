import { PageLayout } from "@/components/page-layout";
import { HeroSection, ServicesSection } from "@/features/home";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <ServicesSection />
    </PageLayout>
  );
}
