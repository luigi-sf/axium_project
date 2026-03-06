/*
  Warnings:

  - The values [admin,user] on the enum `enum_Users_role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `password` on the `Suppliers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Suppliers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Suppliers` table without a default value. This is not possible if the table is not empty.
  - Made the column `active` on table `Suppliers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `Users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `active` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "enum_Users_role_new" AS ENUM ('ADMIN', 'USER', 'SUPPLIER');
ALTER TABLE "public"."Users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Users" ALTER COLUMN "role" TYPE "enum_Users_role_new" USING ("role"::text::"enum_Users_role_new");
ALTER TYPE "enum_Users_role" RENAME TO "enum_Users_role_old";
ALTER TYPE "enum_Users_role_new" RENAME TO "enum_Users_role";
DROP TYPE "public"."enum_Users_role_old";
ALTER TABLE "Users" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Suppliers" DROP CONSTRAINT "Suppliers_createdBy_fkey";

-- AlterTable
ALTER TABLE "ErrorLogs" ALTER COLUMN "ipAddress" SET DATA TYPE TEXT,
ALTER COLUMN "userAgent" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "HttpLogs" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "timestamp" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "ipAddress" SET DATA TYPE TEXT,
ALTER COLUMN "userAgent" SET DATA TYPE TEXT,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Suppliers" DROP COLUMN "password",
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "createdBy" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "active" SET NOT NULL,
ALTER COLUMN "passwordChangedAt" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Suppliers_userId_key" ON "Suppliers"("userId");

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suppliers" ADD CONSTRAINT "Suppliers_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
