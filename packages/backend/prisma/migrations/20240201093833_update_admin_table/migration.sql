/*
  Warnings:

  - You are about to drop the column `phone_number` on the `Admin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Admin` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Admin_phone_number_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "phone_number",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_key" ON "Admin"("phone");
