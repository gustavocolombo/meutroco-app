import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateAccount1607568586338 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'agency',
            type: 'integer',
            default: 1,
          },
          {
            name: 'numberAccount',
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'balance',
            type: 'float',
            default: 0,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('account');
  }
}
