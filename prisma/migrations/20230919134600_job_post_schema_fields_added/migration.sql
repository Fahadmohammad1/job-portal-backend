/*
  Warnings:

  - You are about to drop the column `workEnvoirement` on the `JobPost` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "WorkEnvoirement" ADD VALUE 'Relocate';

-- AlterTable
ALTER TABLE "JobPost" DROP COLUMN "workEnvoirement",
ADD COLUMN     "workEnvironment" "WorkEnvoirement" NOT NULL DEFAULT 'Onsite';
