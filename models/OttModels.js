const mongoose = require("mongoose");
const slugify = require("slugify");

const ottSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Item description is required"],
        minlength: [3, "Item description must be at least 3 characters long"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["ott", "music", "professional"],
            message: "Category must be either ott or music or professional",
        },
    },
    img: {
        type: String,
    },
    banner: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    stock: {
        type: Boolean,
    },
    items: [
        {
            name: {
                type: String,
                required: [true, "Item name is required"],
                minlength: [3, "Item name must be at least 3 characters long"],
            },
            price: {
                type: Number,
                required: [true, "Item price is required"],
                min: [0, "Item price must be at least 0"],
            },
            description: {
                type: String,
                required: [true, "Item description is required"],
                minlength: [
                    3,
                    "Item description must be at least 3 characters long",
                ],
            },
            period: {
                type: String,
                required: [true, "Item dorm is required"],
                enum: {
                    values: ["days", "weeks", "months"],
                    message: "Item dorm must be either days, weeks, or months",
                },
            },
            count: {
                type: Number,
                required: [true, "Item count is required"],
                min: [0, "Item count must be at least 0"],
            },
        },
    ],
});

ottSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
const Ott = mongoose.model("Ott", ottSchema);
module.exports = Ott;
