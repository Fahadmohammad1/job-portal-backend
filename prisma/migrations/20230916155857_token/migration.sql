/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Page` table. All the data in the column will be lost.
  - The primary key for the `UserProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_userId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformConnection" DROP CONSTRAINT "PlatformConnection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_userId_fkey";

-- DropForeignKey
ALTER TABLE "SkillConnection" DROP CONSTRAINT "SkillConnection_userId_fkey";

-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "userProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "userProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "PlatformConnection" ADD COLUMN     "userProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "userProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "userProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "SkillConnection" ADD COLUMN     "userProfileUserId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "UserProfile" DROP CONSTRAINT "UserProfile_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId");

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_userProfileUserId_fkey" FOREIGN KEY ("userProfileUserId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformConnection" ADD CONSTRAINT "PlatformConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformConnection" ADD CONSTRAINT "PlatformConnection_userProfileUserId_fkey" FOREIGN KEY ("userProfileUserId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_userProfileUserId_fkey" FOREIGN KEY ("userProfileUserId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userProfileUserId_fkey" FOREIGN KEY ("userProfileUserId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryConnection" ADD CONSTRAINT "CategoryConnection_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryConnection" ADD CONSTRAINT "CategoryConnection_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userProfileUserId_fkey" FOREIGN KEY ("userProfileUserId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillConnection" ADD CONSTRAINT "SkillConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillConnection" ADD CONSTRAINT "SkillConnection_userProfileUserId_fkey" FOREIGN KEY ("userProfileUserId") REFERENCES "UserProfile"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobPost" ADD CONSTRAINT "JobPost_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
