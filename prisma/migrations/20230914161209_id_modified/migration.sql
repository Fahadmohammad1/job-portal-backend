/*
  Warnings:

  - The primary key for the `Blog` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `blogId` on the `Blog` table. All the data in the column will be lost.
  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `Category` table. All the data in the column will be lost.
  - The primary key for the `CategoryConnection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `connectionId` on the `CategoryConnection` table. All the data in the column will be lost.
  - The primary key for the `Education` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `educationId` on the `Education` table. All the data in the column will be lost.
  - The primary key for the `Experience` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `experienceId` on the `Experience` table. All the data in the column will be lost.
  - The primary key for the `JobPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `postId` on the `JobPost` table. All the data in the column will be lost.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `locationId` on the `Location` table. All the data in the column will be lost.
  - The primary key for the `Member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `memberId` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `Page` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pageId` on the `Page` table. All the data in the column will be lost.
  - The primary key for the `PlatformConnection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `connectionId` on the `PlatformConnection` table. All the data in the column will be lost.
  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `projectId` on the `Project` table. All the data in the column will be lost.
  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serviceId` on the `Service` table. All the data in the column will be lost.
  - The primary key for the `SkillConnection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skillConnectionId` on the `SkillConnection` table. All the data in the column will be lost.
  - The primary key for the `Skills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skillsId` on the `Skills` table. All the data in the column will be lost.
  - The primary key for the `SocialPlatform` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `platfromId` on the `SocialPlatform` table. All the data in the column will be lost.
  - The primary key for the `SubCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subCategoryId` on the `SubCategory` table. All the data in the column will be lost.
  - The required column `id` was added to the `Blog` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Category` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `CategoryConnection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Education` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Experience` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `JobPost` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Location` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Page` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `PlatformConnection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Project` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Service` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SkillConnection` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Skills` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SocialPlatform` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `SubCategory` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_pkey",
DROP COLUMN "blogId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Blog_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "categoryId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CategoryConnection" DROP CONSTRAINT "CategoryConnection_pkey",
DROP COLUMN "connectionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CategoryConnection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Education" DROP CONSTRAINT "Education_pkey",
DROP COLUMN "educationId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Education_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_pkey",
DROP COLUMN "experienceId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Experience_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "JobPost" DROP CONSTRAINT "JobPost_pkey",
DROP COLUMN "postId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "JobPost_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
DROP COLUMN "locationId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Member" DROP CONSTRAINT "Member_pkey",
DROP COLUMN "memberId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Page" DROP CONSTRAINT "Page_pkey",
DROP COLUMN "pageId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Page_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PlatformConnection" DROP CONSTRAINT "PlatformConnection_pkey",
DROP COLUMN "connectionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PlatformConnection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
DROP COLUMN "projectId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Project_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "serviceId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SkillConnection" DROP CONSTRAINT "SkillConnection_pkey",
DROP COLUMN "skillConnectionId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SkillConnection_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_pkey",
DROP COLUMN "skillsId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Skills_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SocialPlatform" DROP CONSTRAINT "SocialPlatform_pkey",
DROP COLUMN "platfromId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SocialPlatform_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_pkey",
DROP COLUMN "subCategoryId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
