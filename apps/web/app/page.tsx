import Hero from "@/components/Hero";
import Wizard from "@/components/Wizard";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col">
      <Hero />
      
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-20">
        <Wizard />
      </div>

      <footer className="py-8 text-center text-sm text-text-gray border-t border-border-light dark:border-border-dark mt-auto">
        <div className="flex justify-center gap-6 mb-4">
            <a href="#" className="hover:text-brand-primary transition-colors">Docs</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Examples</a>
            <a href="https://github.com/PrathameshAdate05/BuildBot" target="_blank" className="hover:text-brand-primary transition-colors">GitHub</a>
        </div>
        <p>Built with Next.js, Tailwind, and Love.</p>
      </footer>
    </main>
  );
}
