import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1715790000000 implements MigrationInterface {
  name = 'InitialSchema1715790000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Users
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" varchar NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "role" varchar NOT NULL DEFAULT 'user',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
      );
    `);

    // Rentals
    await queryRunner.query(`
      CREATE TABLE "rentals" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "title" varchar NOT NULL,
        "address" varchar NOT NULL,
        "rooms" int NOT NULL,
        "accessibility" boolean NOT NULL DEFAULT false,
        "price" numeric(10,2) NOT NULL,
        "area" numeric(10,2),
        "description" text,
        "available_from" date,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_rentals_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_rentals_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
      );
    `);

    // Rental Photos
    await queryRunner.query(`
      CREATE TABLE "rental_photos" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "rental_id" uuid NOT NULL,
        "url" varchar NOT NULL,
        CONSTRAINT "PK_rental_photos_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_photos_rental" FOREIGN KEY ("rental_id") REFERENCES "rentals"("id") ON DELETE CASCADE
      );
    `);

    // Favorites
    await queryRunner.query(`
      CREATE TABLE "favorites" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "rental_id" uuid NOT NULL,
        CONSTRAINT "PK_favorites_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_favorites_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_favorites_rental" FOREIGN KEY ("rental_id") REFERENCES "rentals"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "favorites";`);
    await queryRunner.query(`DROP TABLE "rental_photos";`);
    await queryRunner.query(`DROP TABLE "rentals";`);
    await queryRunner.query(`DROP TABLE "users";`);
  }
}
