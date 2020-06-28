import http from 'http';
import cors from 'cors';
import express from 'express';
import { Sequelize } from 'sequelize';
import multer from 'multer';
import { resolve } from 'path';
import PhotoModel from './photo.model';

const config = {
    port: 3001,
    uploadDir: `${resolve(__dirname, '..')}/uploads/`,
    database: {
        username: "root",
        password: "admin",
        host: "localhost",
        port: "3306",
        dialect: "mysql",
        database: "photato",
    }
};

let app = express();
app.server = http.createServer(app);

// 3rd party middlewares
app.use(cors({}));

// setup multer
const uploadMiddleware = multer({ 
    dest: config.uploadDir,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'));
        }
        cb(null, true);
    }, 
}).single('photo');
// connect to db
const database = new Sequelize(config.database);
const Photo = PhotoModel.init(database);


database.sync().then(() => {
    app.get('/', (req, res) => {
        res.json({app: 'photato'});
    });

    app.server.listen(config.port, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
});

app.post('/photo', uploadMiddleware,(req, res)=>{
    try {
        const photo =  Photo.create(req.file);
        res.json({success: true, photo});
    } catch (err) {
        res.status(422).json({success: false, message: err.message});
    }
});

export default app