import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const CTA = () => {
  return (
    <section className="w-full">
      <div className="gradient mx-auto rounded-lg py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 text-center">
          <h2 className="text-primary-foreground text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-primary-foreground/80 mx-auto max-w-[600px] md:text-xl">
            Join thousands of professionals who are advancing their careers with
            AI-powered guidance.
          </p>
          <Link href="/dashboard" passHref className="group">
            <Button
              size="lg"
              variant="secondary"
              className="mt-5 h-11 animate-bounce"
            >
              Start Your Journey Today{" "}
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
