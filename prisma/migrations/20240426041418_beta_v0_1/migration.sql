-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_mediaId_fkey";

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;
