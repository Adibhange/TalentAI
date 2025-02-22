"use client";

import { Assessment } from "@/actions/interviewPrep";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useState } from "react";
import QuizResult from "./QuizResult";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuizList = ({ assessments }: { assessments: Assessment[] }) => {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState<Assessment | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Quizzes
              </CardTitle>
              <CardDescription>
                Review your past quiz performance
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/interview/mock")}>
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.map((assessment, i) => (
              <Card
                key={i}
                className="hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader>
                  <CardTitle className="gradient-title text-2xl">
                    Quiz {i + 1}
                  </CardTitle>
                  <CardDescription className="flex w-full justify-between">
                    <div>Score: {assessment.quizScore.toFixed(1)}%</div>
                    <div>
                      {format(
                        new Date(assessment.createdAt),
                        "MMMM dd, yyyy HH:mm",
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {assessment.improvementTip}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-h-[90vh] !max-w-96 overflow-y-auto sm:!max-w-xl md:!max-w-2xl lg:!max-w-3xl xl:!max-w-4xl 2xl:!max-w-5xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          {selectedQuiz && (
            <QuizResult
              result={selectedQuiz}
              hideStartNew
              onStartNew={() => router.push("/interview/mock")}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuizList;
