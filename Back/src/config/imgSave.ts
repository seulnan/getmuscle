import multer from "multer";
import path from "path";

const __dirname = path.resolve();

const upload = multer({storage:multer.diskStorage({
    destination:function(req, file, don) {
        don(null, path.join(__dirname, '/dist/public/image'));
    },
    filename:function(req, file, don){
        //const ext = path.extname(file.originalname);
        //const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext;
        don(null, file.originalname);
    }
})});

export default upload;