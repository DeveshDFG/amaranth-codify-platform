/*
  Warnings:

  - Made the column `displayUsername` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."user_displayUsername_key";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "displayUsername" SET NOT NULL;
