export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    tableName: process.env.TABLE_NAME,
  },
};
