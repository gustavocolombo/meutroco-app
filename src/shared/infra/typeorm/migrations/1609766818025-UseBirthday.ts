import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class UseBirthday1609766818025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'birthday',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'birthday');
  }
}
