import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CommentModel1614034506087 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "comments",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "body",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "author_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "parent_post_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "parent_comment_id",
            type: "int",
            isNullable: true,
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

    const authorForeignKey = new TableForeignKey({
      columnNames: ["author_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("comments", authorForeignKey);

    const postForeignKey = new TableForeignKey({
      columnNames: ["parent_post_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "posts",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("comments", postForeignKey);

    const commentForeignKey = new TableForeignKey({
      columnNames: ["parent_comment_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "comments",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("comments", commentForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("comments");

    const authorForeignKey = table.foreignKeys.find((key) =>
      key.columnNames.includes("author_id"),
    );
    const postForeignKey = table.foreignKeys.find((key) =>
      key.columnNames.includes("parent_post_id"),
    );
    const commentForeignKey = table.foreignKeys.find((key) =>
      key.columnNames.includes("parent_comment_id"),
    );

    await queryRunner.dropForeignKeys(table, [
      authorForeignKey,
      postForeignKey,
      commentForeignKey,
    ]);

    await queryRunner.dropTable("comments");
  }
}
