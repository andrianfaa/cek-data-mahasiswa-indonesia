import { Heading } from "@/components/typography";
import { tw } from "@/lib/helpers";

function Home() {
  return (
    <div className={tw("container mx-auto min-h-screen", "p-4 md:p-6", "flex flex-col items-center justify-center")}>
      <Heading.h1 className={tw("mb-2")}>Hello World!</Heading.h1>
      <p>Lorem ipsum dolor sit amet.</p>
    </div>
  );
}

export default Home;
