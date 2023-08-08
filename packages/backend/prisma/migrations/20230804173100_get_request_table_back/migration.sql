/*
  Warnings:

  - You are about to drop the `AddRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InviteRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AddRequest" DROP CONSTRAINT "AddRequest_senderId_fkey";

-- DropForeignKey
ALTER TABLE "InviteRequest" DROP CONSTRAINT "InviteRequest_receiverId_fkey";

-- DropTable
DROP TABLE "AddRequest";

-- DropTable
DROP TABLE "InviteRequest";

-- CreateTable
CREATE TABLE "Request" (
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("senderId","receiverId")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
