import SlideItem from "../models/SlideItem.js";

export const create = async (req, res) => {
    try{
        const doc = new SlideItem({
            imageUrl: `/uploads/${req.file.originalname}`,
        });

         const slider = await doc.save();
        res.json({
            url: `/uploads/${req.file.originalname}`,
        })
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось создать слайд"
        })
    }
}

export const getAll = async (req, res) => {
    try{
        const slider = await SlideItem.find()
        slider.map((item, index) =>  {
                console.log(`--------------${index+1} slide------------------`);
                console.log(`url - ${item.imageUrl}`);
                console.log('------------------------------------------')
        }
        )
        res.json(slider)   
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "не удалось получить картинки"
        })
    }
}

export const remove = async (req, res) =>{
    try{
        const slideId = req.params.id;
        SlideItem.findByIdAndDelete(
            {
                _id: slideId,
            },
            (err, doc) => {
                if(err){
                    console.log(err);
                    return res.status(500).json({message: "не удалось удалить картинку"})
                }
                if(!doc){
                    return res.status(404).json({
                        message: 'картинка не найдена'
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