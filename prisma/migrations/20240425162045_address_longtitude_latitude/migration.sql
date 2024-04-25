/*
  Warnings:

  - You are about to drop the column `location` on the `Record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "decision" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Record" DROP COLUMN "location",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "latitude" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "longitude" TEXT NOT NULL DEFAULT '';
