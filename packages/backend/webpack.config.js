module.exports = function (options) {
  return {
    ...options,
    devtool: 'source-map',
      externals: [
        {
          'sqlite3': 'sqlite3',
          'pg': 'pg',
          'oracledb': 'oracledb',
          'pg-query-stream': 'pg-query-stream',
          'mysql': 'mysql',
          'tedious': 'tedious',
          'better-sqlite3': 'better-sqlite3',
          'libsql': 'libsql',
          'mariadb/callback': 'mariadb/callback',
        }
      ]
           
  };
};
