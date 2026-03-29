
enum UserStatus {
  active
  suspended
}

enum Role {
  admin
  user
}

enum ProductStatus {
  draft
  active
  archived
  banned
}

enum OrderStatus {
  created
  confirmed
  partially_shipped
  shipped
  completed
  cancelled
}

enum SubOrderStatus {
  new
  processing
  shipped
  delivered
  cancelled
}

enum ShipmentStatus {
  label_created
  in_transit
  delivered
}

model users {
  id             String     @id @default(uuid()) @db.Uuid
  email          String     @unique
  password_hash  String
  name           String?
  phone          String?
  status         UserStatus @default(active)
  seller_enabled Boolean    @default(false)
  store_name     String?
  store_slug     String?    @unique
  store_bio      String?
  store_logo_url String?
  created_at     DateTime   @default(now())
  updated_at     DateTime   @updatedAt

  user_roles       user_roles[]
  products         products[]
  carts            carts[]
  buyer_orders     orders[]     @relation("buyer_orders")
  seller_suborders sub_orders[] @relation("seller_suborders")
  reviews          reviews[]
}

model user_roles {
  user_id String @db.Uuid
  role    Role

  user users @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@id([user_id, role])
}

model categories {
  id         String   @id @default(uuid()) @db.Uuid
  name       String
  slug       String   @unique
  parent_id  String?  @db.Uuid
  is_active  Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  parent   categories?  @relation("category_hierarchy", fields: [parent_id], references: [id], onDelete: SetNull)
  children categories[] @relation("category_hierarchy")
  products products[]
}

model products {
  id          String        @id @default(uuid()) @db.Uuid
  seller_id   String        @db.Uuid
  category_id String        @db.Uuid
  title       String
  description String?
  status      ProductStatus @default(draft)
  created_at  DateTime      @default(now())
  updated_at  DateTime      @updatedAt

  seller      users              @relation(fields: [seller_id], references: [id], onDelete: Restrict)
  category    categories         @relation(fields: [category_id], references: [id], onDelete: Restrict)
  images      product_images[]
  variants    product_variants[]
  reviews     reviews[]
  order_items sub_order_items[]

  @@index([seller_id])
  @@index([category_id])
}

model product_images {
  id         String  @id @default(uuid()) @db.Uuid
  product_id String  @db.Uuid
  url        String
  alt        String?
  sort_order Int     @default(0)

  product products @relation(fields: [product_id], references: [id], onDelete: Cascade)

  @@index([product_id])
}

model product_variants {
  id                     String   @id @default(uuid()) @db.Uuid
  product_id             String   @db.Uuid
  sku                    String   @unique
  color                  String?
  size                   String?
  price_cents            Int
  compare_at_price_cents Int?
  stock_on_hand          Int
  created_at             DateTime @default(now())
  updated_at             DateTime @updatedAt

  product         products          @relation(fields: [product_id], references: [id], onDelete: Cascade)
  cart_items      cart_items[]
  sub_order_items sub_order_items[]

  @@index([product_id])
}

model carts {
  id         String   @id @default(uuid()) @db.Uuid
  user_id    String   @unique @db.Uuid
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  user  users        @relation(fields: [user_id], references: [id], onDelete: Cascade)
  items cart_items[]
}

model cart_items {
  id         String @id @default(uuid()) @db.Uuid
  cart_id    String @db.Uuid
  variant_id String @db.Uuid
  qty        Int

  cart    carts            @relation(fields: [cart_id], references: [id], onDelete: Cascade)
  variant product_variants @relation(fields: [variant_id], references: [id], onDelete: Restrict)

  @@unique([cart_id, variant_id])
  @@index([variant_id])
}

model orders {
  id                   String      @id @default(uuid()) @db.Uuid
  buyer_id             String      @db.Uuid
  order_number         String      @unique
  status               OrderStatus @default(created)
  items_subtotal_cents Int
  shipping_cents       Int
  tax_cents            Int
  discount_cents       Int
  grand_total_cents    Int
  ship_name            String
  ship_phone           String
  ship_line1           String
  ship_line2           String?
  ship_city            String
  ship_region          String
  ship_postal          String
  ship_country         String
  placed_at            DateTime?
  created_at           DateTime    @default(now())
  updated_at           DateTime    @updatedAt

  buyer      users        @relation("buyer_orders", fields: [buyer_id], references: [id], onDelete: Restrict)
  sub_orders sub_orders[]

  @@index([buyer_id])
}

model sub_orders {
  id             String         @id @default(uuid()) @db.Uuid
  order_id       String         @db.Uuid
  seller_id      String         @db.Uuid
  status         SubOrderStatus @default(new)
  subtotal_cents Int
  shipping_cents Int
  tax_cents      Int
  discount_cents Int
  total_cents    Int
  created_at     DateTime       @default(now())
  updated_at     DateTime       @updatedAt

  order    orders            @relation(fields: [order_id], references: [id], onDelete: Cascade)
  seller   users             @relation("seller_suborders", fields: [seller_id], references: [id], onDelete: Restrict)
  items    sub_order_items[]
  shipment shipments?

  @@index([seller_id, status])
  @@index([order_id])
}

model sub_order_items {
  id                  String  @id @default(uuid()) @db.Uuid
  sub_order_id        String  @db.Uuid
  variant_id          String  @db.Uuid
  qty                 Int
  unit_price_cents    Int
  product_title       String
  product_description String?
  image_url           String?
  variant_sku         String
  variant_color       String?
  variant_size        String?

  sub_order  sub_orders       @relation(fields: [sub_order_id], references: [id], onDelete: Cascade)
  variant    product_variants @relation(fields: [variant_id], references: [id], onDelete: Restrict)
  products   products?        @relation(fields: [productsId], references: [id])
  productsId String?          @db.Uuid

  @@index([sub_order_id])
  @@index([variant_id])
}

model shipments {
  id              String         @id @default(uuid()) @db.Uuid
  sub_order_id    String         @unique @db.Uuid
  carrier         String?
  tracking_number String?
  status          ShipmentStatus @default(label_created)
  shipped_at      DateTime?
  delivered_at    DateTime?
  created_at      DateTime       @default(now())
  updated_at      DateTime       @updatedAt

  sub_order sub_orders @relation(fields: [sub_order_id], references: [id], onDelete: Cascade)
}


