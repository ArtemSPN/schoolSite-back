import PostModel from "../models/Post.js";
import SlideItem from "../models/SlideItem.js";

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
        });

        const post = await doc.save();
        res.json(post)
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать запись"
        })
    }
}

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find();
        const diapos = posts.length - 6;
        posts.map((item, index) =>  {
            if(index >= diapos){
                console.log(`--------------${index+1} NEWS------------------`);
                console.log(`title - ${item.title}`);
                console.log(`text - ${item.text}`);
                console.log(`url - ${item.imageUrl}`);
                console.log(`id - ${item._id}`);
                console.log('---------------------------------------')
            }
        }
        )
        const slider = await SlideItem.find()
        slider.map((item, index) =>  {
                console.log(`--------------${index+1} slide------------------`);
                console.log(`url - ${item.imageUrl}`);
                console.log('------------------------------------------')
        }
        )
        res.json({
            posts: posts,
            slider: slider,
        })   
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить посты"
        })
    }
}

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id;

        console.log(postId)

        PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: {viewCount: 1},
            },
            {
                returnDocument: 'after',
            },
            (err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({message: "не удалось получить новость"})
                }
                if(!doc){
                    return res.status(404).json({
                        message: 'Статья не найдена'
                    })
                }
                res.json(doc) 
            }
        )

          
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить пост"
        })
    }
}