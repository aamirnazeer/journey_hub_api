/*
  Warnings:

  - You are about to drop the `Agent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Agent";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "agent" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_id_key" ON "agent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
