/*
  Warnings:

  - A unique constraint covering the columns `[displayUsername]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_displayUsername_key" ON "public"."user"("displayUsername");
