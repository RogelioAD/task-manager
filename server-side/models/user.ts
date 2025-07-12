import { DataTypes, Model, Sequelize } from 'sequelize';
import { Task } from './task';

export class User extends Model {
    declare id: number;
    declare username: string;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare passwordHash: string;
    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
    declare readonly deletedAt: Date | null;
}

export function initUser(sequelize: Sequelize) {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
        paranoid: true,
    });

    return User;
}

export function initUserRelations(sequelize: Sequelize) {
    const { User } = sequelize.models;
    User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
}
