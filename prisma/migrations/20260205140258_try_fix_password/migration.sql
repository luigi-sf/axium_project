/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Suppliers" ADD COLUMN     "password" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_email_key" ON "Suppliers"("email");
