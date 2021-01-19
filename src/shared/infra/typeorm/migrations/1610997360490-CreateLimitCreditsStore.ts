import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line import/prefer-default-export
export class CreateLimitCreditsStore1610997360490
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'limit_credits_account_store',
        type: 'float',
        default: 100,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('account', 'limit_credits_account_store');
  }
}
