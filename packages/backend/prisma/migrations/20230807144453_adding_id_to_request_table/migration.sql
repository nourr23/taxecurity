/*
  Warnings:

  - The primary key for the `Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Request" DROP CONSTRAINT "Request_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_senderId_receiverId_key" ON "Request"("senderId", "receiverId");
