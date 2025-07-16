import express, { NextFunction, Request, Response } from 'express';
import { taskManagerDb } from './config/db';
import cors from 'cors';
//import routes here when done

const corsOptions = {
    origin: 'http://localhost:3000',
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes

//Route not found
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

//Internal server error
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});


//Syncing database
taskManagerDb.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}).catch((error) => {
    console.error('Unable to sync database:', error);
});




