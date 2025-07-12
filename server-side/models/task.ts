import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './user';

export class Task extends Model {
    declare id: number;
    declare userId: number;
    declare title: string;
    declare description: string;
    declare status: string;
    declare dueDate: Date;
    declare calendarEventId: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date | null;
}

export function initTask(sequelize: Sequelize) {
    Task.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
            allowNull: false,
            defaultValue: 'pending',
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        calendarEventId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
        timestamps: true,
        paranoid: true,
    });

    return Task;
}

export function initTaskRelations(sequelize: Sequelize) {
    const { Task } = sequelize.models;  

    Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
}
