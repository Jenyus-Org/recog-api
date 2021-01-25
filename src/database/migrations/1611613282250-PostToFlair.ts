import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class PostToFlair1611613282250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "posts_flairs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "post_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "flair_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );

    const postForeignKey = new TableForeignKey({
      columnNames: ["post_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "posts",
    });
    await queryRunner.createForeignKey("posts_flairs", postForeignKey);

    const flairForeignKey = new TableForeignKey({
      columnNames: ["flair_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "flairs",
    });
    await queryRunner.createForeignKey("posts_flairs", flairForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("posts_flairs");
  }
}
