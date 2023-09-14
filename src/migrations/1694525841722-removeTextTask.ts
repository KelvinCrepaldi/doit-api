import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTextTask1694525841722 implements MigrationInterface {
    name = 'RemoveTextTask1694525841722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "message"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "message" character varying NOT NULL`);
    }

}
