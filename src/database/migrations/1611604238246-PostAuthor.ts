import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class PostAuthor1611604238246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "posts",
      new TableColumn({
        name: "author_id",
        type: "int",
        isNullable: false,
      }),
    );

    const foreignKey = new TableForeignKey({
      columnNames: ["author_id"],
      referencedColumnNames: ["id"],
      referencedTableName: "users",
      onDelete: "CASCADE",
    });
    await queryRunner.createForeignKey("posts", foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("posts");
    const foreignKey = table.foreignKeys.find((key) =>
      key.columnNames.includes("author_id"),
    );
    await queryRunner.dropForeignKey(table, foreignKey);
  }
}
