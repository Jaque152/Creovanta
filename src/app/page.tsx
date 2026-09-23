import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
    </>
  );
}
