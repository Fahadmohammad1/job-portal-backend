/*
  Warnings:

  - You are about to drop the column `endYear` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `startYear` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `endingYear` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `startingYear` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `endingYear` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startingYear` on the `Project` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endYear` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startYear` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endYear` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startYear` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Education" DROP COLUMN "endYear",
DROP COLUMN "startYear",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "endingYear",
DROP COLUMN "startingYear",
ADD COLUMN     "endYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startYear" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "endingYear",
DROP COLUMN "startingYear",
ADD COLUMN     "endYear" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startYear" TIMESTAMP(3) NOT NULL;
