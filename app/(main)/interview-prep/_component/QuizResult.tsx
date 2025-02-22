"use client";

import { Assessment, QuestionResult } from "@/actions/interviewPrep";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2Icon, TrophyIcon, XCircleIcon } from "lucide-react";

const QuizResult = ({
  result,
  onStartNew,
  hideStartNew = false,
}: {
  result: Assessment;
  onStartNew: () => void;
  hideStartNew: boolean;
}) => {
  if (!result) return null;

  // console.log(result);
  const questions = result.questions as unknown as QuestionResult[];

  return (
    <div className="mx-auto">
      <h1 className="gradient-title flex items-center gap-2 text-3xl">
        <TrophyIcon className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="space-y-2 text-center">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full" />
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-muted rounded-lg p-4">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {questions.map((q, index: number) => (
            <div key={index} className="space-y-2 rounded-lg border p-4">
              {q && (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{q.question}</p>
                    {q.isCorrect ? (
                      <CheckCircle2Icon className="h-5 w-5 flex-shrink-0 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 flex-shrink-0 text-red-500" />
                    )}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    <p>Your answer: {q.userAnswer}</p>
                    {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
                  </div>
                  <div className="bg-muted rounded p-2 text-sm">
                    <p className="font-medium">Explanation:</p>
                    <p>{q.explanation}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
};

export default QuizResult;
