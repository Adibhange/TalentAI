import { features } from "@/data/features";
import { Card, CardContent } from "./ui/card";

const Features = () => {
  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter">
          Powerful Features for Your Career Growth
        </h2>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:border-primary border-2 transition-colors duration-300"
            >
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <div className="flex flex-col items-center pt-6 text-center">
                  <feature.icon className="text-primary mb-4 h-10 w-10" />
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
