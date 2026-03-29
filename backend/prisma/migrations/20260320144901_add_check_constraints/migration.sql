ALTER TABLE "product_variants"
ADD CONSTRAINT "product_variants_price_cents_nonnegative_chk" CHECK ("price_cents" >= 0),
ADD CONSTRAINT "product_variants_compare_at_price_cents_nonnegative_chk" CHECK ("compare_at_price_cents" IS NULL OR "compare_at_price_cents" >= 0),
ADD CONSTRAINT "product_variants_stock_on_hand_nonnegative_chk" CHECK ("stock_on_hand" >= 0);

ALTER TABLE "cart_items"
ADD CONSTRAINT "cart_items_qty_positive_chk" CHECK ("qty" > 0);

ALTER TABLE "orders"
ADD CONSTRAINT "orders_items_subtotal_cents_nonnegative_chk" CHECK ("items_subtotal_cents" >= 0),
ADD CONSTRAINT "orders_shipping_cents_nonnegative_chk" CHECK ("shipping_cents" >= 0),
ADD CONSTRAINT "orders_tax_cents_nonnegative_chk" CHECK ("tax_cents" >= 0),
ADD CONSTRAINT "orders_discount_cents_nonnegative_chk" CHECK ("discount_cents" >= 0),
ADD CONSTRAINT "orders_grand_total_cents_nonnegative_chk" CHECK ("grand_total_cents" >= 0);

ALTER TABLE "sub_orders"
ADD CONSTRAINT "sub_orders_subtotal_cents_nonnegative_chk" CHECK ("subtotal_cents" >= 0),
ADD CONSTRAINT "sub_orders_shipping_cents_nonnegative_chk" CHECK ("shipping_cents" >= 0),
ADD CONSTRAINT "sub_orders_tax_cents_nonnegative_chk" CHECK ("tax_cents" >= 0),
ADD CONSTRAINT "sub_orders_discount_cents_nonnegative_chk" CHECK ("discount_cents" >= 0),
ADD CONSTRAINT "sub_orders_total_cents_nonnegative_chk" CHECK ("total_cents" >= 0);

ALTER TABLE "sub_order_items"
ADD CONSTRAINT "sub_order_items_qty_positive_chk" CHECK ("qty" > 0),
ADD CONSTRAINT "sub_order_items_unit_price_cents_nonnegative_chk" CHECK ("unit_price_cents" >= 0);

ALTER TABLE "reviews"
ADD CONSTRAINT "reviews_rating_between_1_5_chk" CHECK ("rating" BETWEEN 1 AND 5);