'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    
    // 1. Create course_students table if not exists
    await queryInterface.createTable('course_students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'courses',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 2. Add unique constraint to code column
    await queryInterface.addIndex('courses', ['code'], {
      unique: true,
      name: 'courses_code_unique'
    });

    // 3. Clean up redundant indexes
    const [results] = await queryInterface.sequelize.query(`
      SELECT INDEX_NAME 
      FROM INFORMATION_SCHEMA.STATISTICS 
      WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'courses'
      AND INDEX_NAME != 'PRIMARY'
      AND INDEX_NAME != 'courses_code_unique'
      AND INDEX_NAME NOT LIKE '%professor_id%'
    `);

    for (const row of results) {
      try {
        await queryInterface.removeIndex('courses', row.INDEX_NAME);
      } catch (e) {
        console.log(`Skipping index ${row.INDEX_NAME}:`, e.message);
      }
    }

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  },

  async down(queryInterface) {
    await queryInterface.dropTable('course_students');
    await queryInterface.removeIndex('courses', 'courses_code_unique');
  }
};