import { getAssessments } from "@/actions/interviewPrep";
import Stats from "./_components/Stats";
import PerformanceChart from "./_components/PerformanceChart";
import QuizList from "./_components/QuizList";

const InterviewPrep = async () => {
  const assessments = await getAssessments();
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="gradient-title text-6xl font-bold">
          Interview Preparation
        </h1>
      </div>
      <div className="space-y-6">
        <Stats assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </>
  );
};

export default InterviewPrep;
