-- Users Table
CREATE TABLE users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(64) NOT NULL UNIQUE,
    address VARCHAR(255),
    city VARCHAR(32),
    postal_code VARCHAR(10),
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
    product_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    description VARCHAR NOT NULL,
    quantity INTEGER,
    price NUMERIC(12, 2) NOT NULL,
    img_urls VARCHAR [],
    specs JSONB
);

-- Orders Table
CREATE TABLE orders (
    order_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id),
    order_number SERIAL NOT NULL UNIQUE,
    total_price NUMERIC(12, 2) NOT NULL,
    status VARCHAR(32),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Carts Table
CREATE TABLE carts (
    cart_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(user_id)
);

-- Orders and Products Cross Reference Table
CREATE TABLE orders_products (
    order_id UUID REFERENCES orders(order_id),
    product_id UUID REFERENCES products(product_id),
    quantity INTEGER,
    color VARCHAR(32),
    PRIMARY KEY (order_id, product_id)
);

-- Carts and Products Cross Reference Table
CREATE TABLE carts_products (
    cart_id UUID REFERENCES carts(cart_id),
    product_id UUID REFERENCES products(product_id),
    quantity INTEGER,
    color VARCHAR(32),
    PRIMARY KEY (cart_id, product_id)
);