const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        const updatedname = Date.now() + path.extname(file.originalname);
        cb(null, updatedname);
    },
});

const upload = multer({
    storage: storage,
});

module.exports = upload;