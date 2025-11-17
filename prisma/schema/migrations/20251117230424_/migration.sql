/*
  Warnings:

  - Made the column `title` on table `Meeting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Meeting" ALTER COLUMN "title" SET NOT NULL;
