'use strict';
 
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Get all indexes except PRIMARY and those used in foreign keys
      const [indexes] = await queryInterface.sequelize.query(`
        SELECT DISTINCT INDEX_NAME 
        FROM INFORMATION_SCHEMA.STATISTICS 
        WHERE TABLE_SCHEMA = 'mydb' 
        AND TABLE_NAME = 'courses' 
        AND INDEX_NAME != 'PRIMARY'
        AND INDEX_NAME NOT IN (
          SELECT CONSTRAINT_NAME 
          FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
          WHERE REFERENCED_TABLE_NAME IS NOT NULL 
          AND TABLE_SCHEMA = 'mydb'
          AND TABLE_NAME = 'courses'
        )
      `);
      // Drop redundant indexes but keep those needed for foreign keys
      for (const row of indexes) {
        // Skip indexes with names that suggest they're for foreign keys
        if (!row.INDEX_NAME.includes('professor_id') && 
            !row.INDEX_NAME.includes('fk_')) {
          await queryInterface.sequelize.query(`DROP INDEX \`${row.INDEX_NAME}\` ON \`courses\``);
        }
      }
      // Now add the unique constraint for code column if it doesn't exist
      // First check if it exists
      const [codeIndexes] = await queryInterface.sequelize.query(`
        SHOW INDEXES FROM courses WHERE Column_name = 'code' AND Non_unique = 0
      `);
      if (codeIndexes.length === 0) {
        // Add unique index for code
        await queryInterface.addIndex('courses', ['code'], {
          unique: true,
          name: 'courses_code_unique'
        });
      }
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
 
  async down(queryInterface, Sequelize) {
    // This is a cleanup migration, so down method could be empty
    // or implement a restore from backup if needed
    return Promise.resolve();
  }
};