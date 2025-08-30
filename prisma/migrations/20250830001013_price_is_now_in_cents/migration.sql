/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Sales` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `SalesToProduct` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `SalesToProduct` table. All the data in the column will be lost.
  - Added the required column `priceInCents` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInCents` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceInCents` to the `SalesToProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitPriceInCents` to the `SalesToProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "price",
ADD COLUMN     "priceInCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Sales" DROP COLUMN "price",
ADD COLUMN     "priceInCents" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."SalesToProduct" DROP COLUMN "totalPrice",
DROP COLUMN "unitPrice",
ADD COLUMN     "totalPriceInCents" INTEGER NOT NULL,
ADD COLUMN     "unitPriceInCents" INTEGER NOT NULL;
