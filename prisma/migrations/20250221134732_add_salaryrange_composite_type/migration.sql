/*
  Warnings:

  - You are about to drop the column `salaryRanges` on the `IndustryInsight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "salaryRanges";

-- CreateTable
CREATE TABLE "SalaryRange" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "min" DOUBLE PRECISION NOT NULL,
    "max" DOUBLE PRECISION NOT NULL,
    "median" DOUBLE PRECISION NOT NULL,
    "location" TEXT,
    "industryInsightId" TEXT NOT NULL,

    CONSTRAINT "SalaryRange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SalaryRange" ADD CONSTRAINT "SalaryRange_industryInsightId_fkey" FOREIGN KEY ("industryInsightId") REFERENCES "IndustryInsight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
