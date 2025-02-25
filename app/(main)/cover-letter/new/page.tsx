"use client";

import Link from "next/link";
import CoverLetterGenerator from "../_components/CoverLetterGenerator";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const NewCoverLetter = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <div className="pb-6">
          <h1 className="gradient-title text-6xl font-bold">
            Create Cover Letter
          </h1>
          <p className="text-muted-foreground">
            Generate a tailored cover letter for your job application
          </p>
        </div>
      </div>

      <CoverLetterGenerator />
    </div>
  );
};

export default NewCoverLetter;
