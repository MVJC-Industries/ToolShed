CREATE TABLE "media"(
    "id" SERIAL PRIMARY KEY,
    "tool_id" INTEGER NOT NULL,
    "file_name" VARCHAR(255) NULL,
    "mime_type" VARCHAR(255) NULL,
    "public_link" VARCHAR(255) NOT NULL
);

CREATE TABLE "users"(
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone_number" VARCHAR(255) NULL,
    "zip_code" INTEGER NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
CREATE TABLE "reservations"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "tool_id" INTEGER NOT NULL,
    "pick_up_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "drop_off_date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE "tools"(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "tool_title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255) NULL,
    "published_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);

ALTER TABLE
    "media" ADD CONSTRAINT "media_tool_id_foreign" FOREIGN KEY("tool_id") REFERENCES "tools"("id");
ALTER TABLE
    "tools" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "reservations" ADD CONSTRAINT "reservations_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "reservations" ADD CONSTRAINT "reservations_tool_id_foreign" FOREIGN KEY("tool_id") REFERENCES "tools"("id");