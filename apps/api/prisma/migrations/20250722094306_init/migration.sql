/*
  Warnings:

  - You are about to drop the `bookings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_listingId_fkey";

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_renterId_fkey";

-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "floorArea" DROP NOT NULL,
ALTER COLUMN "floorArea" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "bookings";

-- DropEnum
DROP TYPE "BookingStatus";
