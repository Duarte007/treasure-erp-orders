import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1685136607536 implements MigrationInterface {
  name = 'initialMigration1685136607536';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_status" ("order_status_id" SERIAL NOT NULL, "order_status_name" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_b0cdd850e1381631889d51fc738" PRIMARY KEY ("order_status_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "orders" ("order_id" SERIAL NOT NULL, "order_uuid" uuid NOT NULL, "customer_uuid" uuid NOT NULL, "payment_uuid" uuid NOT NULL, "order_date" TIMESTAMP NOT NULL, "order_total" numeric(10,2) NOT NULL, "order_status_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_order_uuid" ON "orders" ("order_uuid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_customer_uuid" ON "orders" ("customer_uuid") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_payment_uuid" ON "orders" ("payment_uuid") `,
    );
    await queryRunner.query(
      `CREATE TABLE "order_items" ("order_item_id" SERIAL NOT NULL, "product_uuid" uuid NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "order_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_54c952fdc94b9b487ef968b4047" PRIMARY KEY ("order_item_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_product_uuid" ON "order_items" ("product_uuid") `,
    );
    await queryRunner.query(
      `CREATE TABLE "order_status_history" ("history_id" SERIAL NOT NULL, "order_id" integer, "order_status_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_a4248a149d1835f67729d493bab" PRIMARY KEY ("history_id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD CONSTRAINT "FK_f51b75ebdfdef60d264f982a60f" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("order_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_status_history" ADD CONSTRAINT "FK_1ca7d5228cf9dc589b60243933c" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_status_history" ADD CONSTRAINT "FK_10b838d6c1cf9d94775a4914a1d" FOREIGN KEY ("order_status_id") REFERENCES "order_status"("order_status_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_status_history" DROP CONSTRAINT "FK_10b838d6c1cf9d94775a4914a1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_status_history" DROP CONSTRAINT "FK_1ca7d5228cf9dc589b60243933c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_items" DROP CONSTRAINT "FK_145532db85752b29c57d2b7b1f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" DROP CONSTRAINT "FK_f51b75ebdfdef60d264f982a60f"`,
    );
    await queryRunner.query(`DROP TABLE "order_status_history"`);
    await queryRunner.query(`DROP INDEX "idx_product_uuid"`);
    await queryRunner.query(`DROP TABLE "order_items"`);
    await queryRunner.query(`DROP INDEX "idx_payment_uuid"`);
    await queryRunner.query(`DROP INDEX "idx_customer_uuid"`);
    await queryRunner.query(`DROP INDEX "idx_order_uuid"`);
    await queryRunner.query(`DROP TABLE "orders"`);
    await queryRunner.query(`DROP TABLE "order_status"`);
  }
}
