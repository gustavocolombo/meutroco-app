import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateTransfer1607648585223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfer',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'account_sender',
            type: 'uuid',
          },
          {
            name: 'account_recipient',
            type: 'uuid',
          },
          {
            name: 'value',
            type: 'float',
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
        foreignKeys: [
          {
            name: 'relationshipTransferRecipient',
            columnNames: ['account_recipient'],
            referencedColumnNames: ['id'],
            referencedTableName: 'account',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'relationshipTransferSender',
            columnNames: ['account_sender'],
            referencedColumnNames: ['id'],
            referencedTableName: 'account',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transfer');
  }
}
