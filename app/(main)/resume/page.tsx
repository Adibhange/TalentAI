"use client";

import { getResume } from "@/actions/resume";
import ResumeBuilder from "./_componenets/ResumeBuilder";

import { useEffect, useState } from "react";

const Resume = () => {
  const [resume, setResume] = useState<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    const fetchResume = async () => {
      const data = await getResume();
      setResume(data);
    };

    fetchResume();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <ResumeBuilder initialContent={resume?.content || ""} />
    </div>
  );
};

export default Resume;
