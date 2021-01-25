const { join } = require("path");

module.exports = {
  type: "sqlite",
  synchronize: true,
  entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  database: "tmp/data.sqlite",
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
