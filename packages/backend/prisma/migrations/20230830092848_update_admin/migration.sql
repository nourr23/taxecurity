/*
  Warnings:

  - You are about to drop the column `age` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "age",
DROP COLUMN "city";
