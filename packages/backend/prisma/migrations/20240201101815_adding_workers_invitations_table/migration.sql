-- CreateTable
CREATE TABLE "WorkersInvitations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "superAdminId" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "rakmSerri" TEXT NOT NULL,

    CONSTRAINT "WorkersInvitations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkersInvitations_destination_key" ON "WorkersInvitations"("destination");

-- AddForeignKey
ALTER TABLE "WorkersInvitations" ADD CONSTRAINT "WorkersInvitations_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
