-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "location" TEXT;
