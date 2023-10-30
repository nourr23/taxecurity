-- DropForeignKey
ALTER TABLE "GroupInvitation" DROP CONSTRAINT "GroupInvitation_groupId_fkey";

-- DropForeignKey
ALTER TABLE "GroupRequest" DROP CONSTRAINT "GroupRequest_groupId_fkey";

-- AddForeignKey
ALTER TABLE "GroupInvitation" ADD CONSTRAINT "GroupInvitation_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRequest" ADD CONSTRAINT "GroupRequest_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
