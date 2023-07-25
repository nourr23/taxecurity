/*
  Warnings:

  - You are about to drop the column `updateddAt` on the `Alert` table. All the data in the column will be lost.
  - You are about to drop the column `updateddAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Alert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alert" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updateddAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
