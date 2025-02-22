"use client"

import { Assessment } from "@/actions/interviewPrep"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainIcon, TargetIcon, TrophyIcon } from "lucide-react";

const Stats = ({assessments} : {assessments: Assessment[]}) => {
    const getAverageScore = () => {
      if (!assessments?.length) return 0;
      const total = assessments.reduce(
        (sum, assessment) => sum + assessment.quizScore,
        0,
      );
      return (total / assessments.length).toFixed(1);
    };

    const getLatestAssessment = () => {
      if (!assessments?.length) return null;
      return assessments[0];
    };

    const getTotalQuestions = () => {
      if (!assessments?.length) return 0;
      return assessments.reduce(
        (sum, assessment) => sum + assessment.questions.length,
        0,
      );
    };
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          <TrophyIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getAverageScore()}%</div>
          <p className="text-muted-foreground text-xs">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Questions Practiced
          </CardTitle>
          <BrainIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getTotalQuestions()}</div>
          <p className="text-muted-foreground text-xs">Total questions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
          <TargetIcon className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-muted-foreground text-xs">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Stats