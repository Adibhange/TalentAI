import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full pt-36 pb-10 md:pt-48">
      <div className="space-y-6 text-center">
        <div className="mx-auto space-y-6">
          <div className="flex justify-center">
            <h1 className="gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
              Your AI Coach for
              <br />
              Professional Success
            </h1>
          </div>

          <p className="text-muted-foreground mx-auto max-w-[600px] md:text-xl">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div>
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get started
            </Button>
          </Link>
        </div>

        <div>
          <Image
            src={"/Banner.jpeg"}
            alt="banner"
            width={1280}
            height={720}
            className="mx-auto rounded-lg border shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
