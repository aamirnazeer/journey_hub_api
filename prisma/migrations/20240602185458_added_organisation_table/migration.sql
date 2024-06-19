/*
  Warnings:

  - You are about to drop the column `uuid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `organisation_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_uuid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "organisation_id" VARCHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisation_id_key" ON "Organisation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "Organisation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
