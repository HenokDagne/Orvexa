-- Add product references before removing variant references
ALTER TABLE "cart_items"
ADD COLUMN "product_id" UUID;

UPDATE "cart_items" ci
SET "product_id" = pv."product_id"
FROM "product_variants" pv
WHERE ci."variant_id" = pv."id";

ALTER TABLE "cart_items"
ALTER COLUMN "product_id" SET NOT NULL;

ALTER TABLE "sub_order_items"
ADD COLUMN "product_id" UUID;

UPDATE "sub_order_items" soi
SET "product_id" = COALESCE(soi."productsId", pv."product_id")
FROM "product_variants" pv
WHERE soi."variant_id" = pv."id";

ALTER TABLE "sub_order_items"
ALTER COLUMN "product_id" SET NOT NULL;

-- Drop old variant-related constraints and indexes
ALTER TABLE "cart_items" DROP CONSTRAINT IF EXISTS "cart_items_variant_id_fkey";
DROP INDEX IF EXISTS "cart_items_cart_id_variant_id_key";
DROP INDEX IF EXISTS "cart_items_variant_id_idx";

ALTER TABLE "sub_order_items" DROP CONSTRAINT IF EXISTS "sub_order_items_productsId_fkey";
ALTER TABLE "sub_order_items" DROP CONSTRAINT IF EXISTS "sub_order_items_variant_id_fkey";
DROP INDEX IF EXISTS "sub_order_items_variant_id_idx";

-- Remove old columns
ALTER TABLE "cart_items" DROP COLUMN IF EXISTS "variant_id";
ALTER TABLE "sub_order_items" DROP COLUMN IF EXISTS "productsId";
ALTER TABLE "sub_order_items" DROP COLUMN IF EXISTS "variant_id";

-- Create new constraints and indexes
CREATE UNIQUE INDEX "cart_items_cart_id_product_id_key" ON "cart_items"("cart_id", "product_id");
CREATE INDEX "cart_items_product_id_idx" ON "cart_items"("product_id");
CREATE INDEX "sub_order_items_product_id_idx" ON "sub_order_items"("product_id");

ALTER TABLE "cart_items"
ADD CONSTRAINT "cart_items_product_id_fkey"
FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "sub_order_items"
ADD CONSTRAINT "sub_order_items_product_id_fkey"
FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Drop variants table (after remapping references)
DROP TABLE IF EXISTS "product_variants";
