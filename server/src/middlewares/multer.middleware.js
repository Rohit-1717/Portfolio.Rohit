import multer from "multer";
import path from "path";

const uploadDir = path.resolve(__dirname, '../../public/uploads');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${path.basename(file.originalname)}`);
  },
});

export const upload = multer({ storage: storage });
