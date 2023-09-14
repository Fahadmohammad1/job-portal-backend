-- CreateTable
CREATE TABLE "Page" (
    "pageId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "coverPic" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "follower" TEXT NOT NULL,
    "websiteURL" TEXT NOT NULL,
    "foundedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("pageId")
);

-- CreateTable
CREATE TABLE "JobPost" (
    "postId" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "responsibility" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "vacancy" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "categoryId" TEXT NOT NULL,
    "extraInfo" TEXT NOT NULL,

    CONSTRAINT "JobPost_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Blog" (
    "blogId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,
    "upVote" TEXT NOT NULL,
    "downVote" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("blogId")
);

-- CreateTable
CREATE TABLE "Location" (
    "locationId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "district" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("locationId")
);

-- CreateTable
CREATE TABLE "Member" (
    "memberId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "joiningDate" TIMESTAMP(3) NOT NULL,
    "role" TEXT NOT NULL,
    "pageId" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("memberId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_email_key" ON "Page"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Member_email_key" ON "Member"("email");
