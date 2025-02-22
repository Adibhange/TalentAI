import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Quiz from "../_component/Quiz";

const MockInterview = () => {
  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="mx-2 flex flex-col space-y-2">
        <Link href={"/interview-prep"}>
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Interview Preparation
          </Button>
        </Link>

        <div>
          <h1 className="gradient-title text-6xl font-bold">Mock Interview</h1>
          <p className="text-muted-foreground">
            Test your knowledge with industry-specific questions
          </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
};

export default MockInterview;
