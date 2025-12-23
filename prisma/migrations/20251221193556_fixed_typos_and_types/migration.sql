/*
  Warnings:

  - You are about to drop the column `grenre` on the `Movie` table. All the data in the column will be lost.
  - The `releaseDate` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "grenre",
ADD COLUMN     "genre" TEXT[],
DROP COLUMN "releaseDate",
ADD COLUMN     "releaseDate" INTEGER;
