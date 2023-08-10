/*
  Warnings:

  - A unique constraint covering the columns `[creatorId,receiverId,groupId]` on the table `GroupInvitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupInvitation_creatorId_receiverId_groupId_key" ON "GroupInvitation"("creatorId", "receiverId", "groupId");
