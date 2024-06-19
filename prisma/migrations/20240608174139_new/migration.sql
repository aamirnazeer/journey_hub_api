/*
  Warnings:

  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_organisation_id_fkey";

-- DropTable
DROP TABLE "Organisation";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_id_key" ON "Agent"("id");
