/*
  Warnings:

  - Made the column `location` on table `SalaryRange` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SalaryRange" ALTER COLUMN "location" SET NOT NULL;
