"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { generateAIInsights } from "./dashboard";

interface UpdateUserData {
  industry: string;
  experience: number;
  bio: string;
  skills: string[];
}

export const updateUser = async (data: UpdateUserData) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const result = await db.$transaction(
      async (tx) => {
        let industryInsight = await tx.industryInsight.findUnique({
          where: { industry: data.industry },
        });

        if (!industryInsight) {
          const insights = await generateAIInsights(data.industry);

          industryInsight = await tx.industryInsight.create({
            data: {
              industry: data.industry,
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
          });
        }

        const updateUser = await tx.user.update({
          where: { id: user.id },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { updateUser, industryInsight };
      },
      { timeout: 10000 },
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error updating user and industry:", error);
    throw new Error("Failed to update profile");
  }
};

export const getUserOnboardingStatus = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  if (!user) throw new Error("User not found");

  return { isOnboarded: Boolean(user.industry) };
};
