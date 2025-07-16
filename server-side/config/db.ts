import { Sequelize } from 'sequelize';
import { initUser, initUserRelations } from '../models/user';
import { initTask, initTaskRelations } from '../models/task';

const taskManagerDb = new Sequelize('taskManager', 'root', 'Password1!', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
});

const User = initUser(taskManagerDb);
const Task = initTask(taskManagerDb);   

initUserRelations(taskManagerDb);
initTaskRelations(taskManagerDb);

export { taskManagerDb, User, Task };