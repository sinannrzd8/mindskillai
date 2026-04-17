import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSectionModern from "@/components/pricing/PricingSectionModern";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-12 pb-12">
        <PricingSectionModern showTitle={false} showHero={true} />
      </main>
      <Footer />
    </div>
  );
}
