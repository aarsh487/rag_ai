/*
  Warnings:

  - Made the column `link` on table `Links` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Links` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "NoteType" AS ENUM ('DOCUMENT', 'YOUTUBE', 'TWITTER', 'INSTAGRAM', 'LINKEDIN', 'OTHER');

-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_userId_fkey";

-- AlterTable
ALTER TABLE "Links" ALTER COLUMN "link" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Notes" ADD COLUMN     "type" "NoteType" NOT NULL DEFAULT 'DOCUMENT';

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
