/*
  Warnings:

  - You are about to drop the `Refresh_Tokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Refresh_Tokens";

-- CreateTable
CREATE TABLE "Refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" VARCHAR NOT NULL,

    CONSTRAINT "Refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_tokens_token_key" ON "Refresh_tokens"("token");
