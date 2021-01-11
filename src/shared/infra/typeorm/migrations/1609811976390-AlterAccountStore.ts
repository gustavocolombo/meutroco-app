import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class AlterAccountStore1609811976390 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'stores',
      new TableColumn({
        name: 'account_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'stores',
      new TableForeignKey({
        name: 'AccountStore',
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('stores', 'AccountStore');
    await queryRunner.dropColumn('stores', 'account_id');
  }
}
