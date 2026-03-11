-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "projectId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "wishes" TEXT NOT NULL,
    "services" TEXT NOT NULL,
    "budgetUsd" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'funding_pending',
    "quotedAmount" INTEGER,
    "quoteStatus" TEXT NOT NULL DEFAULT 'pending',
    "quoteNotes" TEXT,
    "quoteValidUntil" DATETIME,
    "estimatedWeeks" INTEGER,
    "startDate" DATETIME,
    "deliveryDate" DATETIME,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectRequest_projectId_key" ON "ProjectRequest"("projectId");
