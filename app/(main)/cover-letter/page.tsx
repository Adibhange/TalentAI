import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/CoverLetterList";
import { getCoverLetters } from "@/actions/coverLetters";



const CoverLetter = async () => {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="mb-5 flex flex-col items-center justify-between gap-2 md:flex-row">
        <h1 className="gradient-title text-6xl font-bold">My Cover Letters</h1>
        <Link href="/cover-letter/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
};

export default CoverLetter;
