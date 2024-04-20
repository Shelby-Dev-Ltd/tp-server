/*
  Warnings:

  - You are about to drop the column `BikesCount` on the `Analytics` table. All the data in the column will be lost.
  - The `type` column on the `Media` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('VIDEO', 'IMAGE');

-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "BikesCount",
ADD COLUMN     "BikeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "TruckCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "CarCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "type",
ADD COLUMN     "type" "MediaType" NOT NULL DEFAULT 'VIDEO';
