/*
  Warnings:

  - You are about to drop the column `priceInCents` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Sales` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Sales" DROP COLUMN "priceInCents",
DROP COLUMN "quantity";
