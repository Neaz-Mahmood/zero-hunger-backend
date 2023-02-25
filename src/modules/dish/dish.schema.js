const { object, string, number } = require("yup");

const dishUploadSchema = object().shape({
    name: string()
        .min(3, "Name must be at least 3 characters.")
        .max(255, "Name must be at most 255 characters long.")
        .required("Name is required."),
    price: number()
        .typeError('Price must be a number')
        .positive('Price must be a positive number.')
        .required("Price is required."),
    description: string()
        .max(2000, "Description must be at most 2000 characters long."),
    category_id: string()
        .required("Category is required.")
});

const dishUpdateSchema = object().shape({
    name: string()
        .min(3, "Name must be at least 3 characters.")
        .max(255, "Name must be at most 255 characters long.")
        .required("Name is required."),
    price: number()
        .typeError('Price must be a number')
        .positive('Price must be a positive number.')
        .required("Price is required."),
    description: string()
        .max(2000, "Description must be at most 2000 characters long."),
    category_id: string()
        .required("Category is required.")
});

module.exports.dishUploadSchema = dishUploadSchema;
module.exports.dishUpdateSchema = dishUpdateSchema;