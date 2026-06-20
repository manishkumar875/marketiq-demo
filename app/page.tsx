import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import SurveyBuilder from "@/components/SurveyBuilder";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Solutions />
      <SurveyBuilder />
      <LeadForm />
      <Footer />
    </main>
  );
}
