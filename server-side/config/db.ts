import { Sequelize } from 'sequelize';
import { initUser, initUserRelations } from '../models/user';
import { initTask, initTaskRelations } from '../models/task';

const sequelize = new Sequelize('taskManager', 'root', 'Password1!', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

const User = initUser(sequelize);
const Task = initTask(sequelize);   

initUserRelations(sequelize);
initTaskRelations(sequelize);

export { sequelize, User, Task };