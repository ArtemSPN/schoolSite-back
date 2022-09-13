import { body } from "express-validator";

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({min: 5}).isString(),
    body('text', 'Введите текст статьи').isLength({min: 25}).isString(),
    body('imageUrl', 'неверная ссылка на изображение').optional().isURL(),
]

export const sliderItemAddValidation = [
    body('imageUrl', 'неверная ссылка на изображение').optional().isURL(),
]