/*
  Warnings:

  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `taxi_number` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_phone_number_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone_number",
DROP COLUMN "taxi_number",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "taxiNumber" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
