import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class AlterAccountUser1609811494111 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'account_id',
        type: 'uuid',
      }),
    );
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'AccountUser',
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'AccountUser');
    await queryRunner.dropColumn('users', 'account_id');
  }
}
