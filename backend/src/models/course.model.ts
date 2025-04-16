import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';

interface CourseAttributes {
  id: number;
  name: string;
  code: string;
  description?: string;
  professor_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, 'id' | 'created_at' | 'updated_at'> {}

class Course extends Model<CourseAttributes, CourseCreationAttributes> implements CourseAttributes {
  public id!: number;
  public name!: string;
  public code!: string;
  public description?: string;
  public professor_id?: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public readonly professor?: User;
  public readonly students?: User[];
}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    professor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'courses',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['code']
      },
      {
        fields: ['professor_id']
      }
    ]
  }
);

// Define junction model explicitly
const CourseStudent = sequelize.define('CourseStudent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  course_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  student_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'course_students',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['course_id', 'student_id']
    }
  ]
});

// Define associations
Course.belongsTo(User, { 
  as: 'professor', 
  foreignKey: 'professor_id' 
});

User.hasMany(Course, { 
  as: 'taughtCourses', 
  foreignKey: 'professor_id' 
});

Course.belongsToMany(User, { 
  through: CourseStudent,
  as: 'students',
  foreignKey: 'course_id',
  otherKey: 'student_id'
});

User.belongsToMany(Course, { 
  through: CourseStudent,
  as: 'enrolledCourses',
  foreignKey: 'student_id',
  otherKey: 'course_id'
});

export default Course;