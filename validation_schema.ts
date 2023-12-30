import * as Joi from '@hapi/joi';

const bookSchema = Joi.object({
    isbn: Joi.string().required(),
    title: Joi.string().required(),
    year: Joi.date(),
    author: Joi.string(),
    pages: Joi.number().integer().min(0),
    publisher_id: Joi.number().integer().min(0).required(),
});

const commentSchema = Joi.object({
    name: Joi.string().required(),
    comment: Joi.string().required(),
    book_id: Joi.number().integer().min(0).required(),
    stars: Joi.number().integer().min(1).max(5)
});

const publisherSchema = Joi.object({
    name: Joi.string().required(),
    country: Joi.string()
});

export {bookSchema, commentSchema, publisherSchema};