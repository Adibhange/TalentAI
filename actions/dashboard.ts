"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface SalaryRange {
  role: string;
  min: number;
  max: number;
  median: number;
  location: string;
}

export interface AIInsights {
  salaryRanges: SalaryRange[];
  growthRate: number;
  demandLevel: "HIGH" | "MEDUIM" | "LOW";
  topSkills: string[];
  marketOutlook: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  keyTrends: string[];
  recommendedSkills: string[];
  lastUpdated: Date;
  nextUpdate: Date;
}

export const generateAIInsights = async (
  industry: string,
): Promise<AIInsights> => {
  const prompt = `
                    Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
                    {
                        "salaryRanges": [
                            { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
                        ],
                        "growthRate": number,
                        "demandLevel": "HIGH" | "MEDUIM" | "LOW",
                        "topSkills": ["skill1", "skill2"],
                        "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
                        "keyTrends": ["trend1", "trend2"],
                        "recommendedSkills": ["skill1", "skill2"]
                    }
                    
                    IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
                    Include at least 5 common roles for salary ranges.
                    Growth rate should be a percentage.
                    Include at least 5 skills and trends.
                `;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = await response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

  return JSON.parse(cleanedText) as AIInsights;
};

export const getIndustryInsights = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: {
        include: {
          salaryRanges: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    if (!user.industry) throw new Error("User industry not found");
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        growthRate: insights.growthRate,
        demandLevel: insights.demandLevel,
        topSkills: insights.topSkills,
        marketOutlook: insights.marketOutlook,
        keyTrends: insights.keyTrends,
        recommendedSkills: insights.recommendedSkills,
        salaryRanges: {
          create: insights.salaryRanges.map((range) => ({
            role: range.role,
            min: range.min,
            max: range.max,
            median: range.median,
            location: range.location,
          })),
        },
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      include: {
        salaryRanges: true,
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
};
