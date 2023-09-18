"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
var mongoose_1 = require("mongoose");
var ImageScheme = new mongoose_1.default.Schema({
    name: { type: String, unique: true },
    img: {
        data: String,
        contentType: String,
    }
});
exports.ImageModel = mongoose_1.default.model("Image", ImageScheme);
