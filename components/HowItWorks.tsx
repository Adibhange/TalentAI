import { howItWorks } from "@/data/howItWorks";

const HowItWorks = () => {
  return (
    <section className="bg-muted/50 w-full py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground">
            Four simple steps to accelerate your career growth
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 text-center"
            >
              <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                <item.icon className="text-primary h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
