/*
  Warnings:

  - Made the column `password` on table `Suppliers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Suppliers" ALTER COLUMN "password" SET NOT NULL;
