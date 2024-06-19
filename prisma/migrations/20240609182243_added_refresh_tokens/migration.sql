-- CreateTable
CREATE TABLE "Refresh_Tokens" (
    "id" TEXT NOT NULL,
    "token" VARCHAR NOT NULL,

    CONSTRAINT "Refresh_Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_Tokens_token_key" ON "Refresh_Tokens"("token");
