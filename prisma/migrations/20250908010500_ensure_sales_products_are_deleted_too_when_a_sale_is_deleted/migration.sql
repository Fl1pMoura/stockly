-- DropForeignKey
ALTER TABLE "public"."SalesToProduct" DROP CONSTRAINT "SalesToProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "public"."SalesToProduct" DROP CONSTRAINT "SalesToProduct_salesId_fkey";

-- AddForeignKey
ALTER TABLE "public"."SalesToProduct" ADD CONSTRAINT "SalesToProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SalesToProduct" ADD CONSTRAINT "SalesToProduct_salesId_fkey" FOREIGN KEY ("salesId") REFERENCES "public"."Sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
