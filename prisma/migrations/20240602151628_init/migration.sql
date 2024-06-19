-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" VARCHAR NOT NULL,
    "hashed_password" VARCHAR NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
