 import  express from "express";
 import mongoose from "mongoose";
 import multer from "multer";
 import cors from 'cors';
 import UserSchema from './models/User.js'

import { postCreateValidation, sliderItemAddValidation  } from './validations.js';

import * as PostController from './controllers/PostController.js';
import * as SlideController from './controllers/SlideController.js';

mongoose.connect(process.env.MONGODB_URI) 
.then(() =>{console.log("DB ok")})
.catch((err) => console.log("DB error", err))

 const app = express();

 const storage = multer.diskStorage({
    destination: (_, __, cb) =>{
        cb(null, 'uploads')
    },
    filename: (_, file, cb) =>{
        cb(null, file.originalname)
    },
 })

const upload = multer({storage})

 app.use(express.json());
 app.use(cors());
 app.use('/admin/slider', express.static('uploads'))

 app.post('/reg',  async (req, res) => {
    try{
        const doc = new UserSchema({
            log: req.body.log,
            pas: req.body.pas,
        });

        const user = await doc.save();
        res.json(user)
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать admin"
        })
    }
 });

 
 app.post('/login',  async (req, res) => {
    try{
        const user = await UserSchema.findOne({pas: req.body.pas})

        if(user.pas === req.body.pas){
            return res.json({
                message: "получилось войти",
                auth: true,
            })
        } else{
            return req.status(500).json({
                message: "не получилось войти"
            })
        }
        
          
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось войти"
        })
    }
});
        
////////////////post////////////////////
 app.get('/', PostController.getAll);
 app.get('/news/:id', PostController.getOne);
 app.post('/admin/news', postCreateValidation , PostController.create);
////////////////////////////////////////

////////////////slider////////////////////
//app.get('/', SlideController.getAll);
app.delete('/admin/slider/:id', SlideController.remove);
app.post('/admin/slider',  upload.single('image') ,sliderItemAddValidation, SlideController.create);
////////////////////////////////////////
 




app.listen(4444, (err) => {
    if(err) {
        return console.log(err)
    }

    console.log("Server OK!");
 });
