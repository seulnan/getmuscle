import multer from "multer";
import {google} from "googleapis"
import path from "path";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const { IMGDB_KEY } = process.env;
const __dirname = path.resolve();

const KEY_FILE_PATH = path.join("dkeun-426809-a17e6bec7a83.json");

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
})


const upload = multer({ 
    storage: multer.diskStorage({
        destination: function (req, file, don) {
            don(null, path.join(__dirname, '/dist/public/image'));
        },
        filename: function (req, file, don) {
            //const ext = path.extname(file.originalname);
            //const filename = path.basename(file.originalname, ext) + '_' + Date.now() + ext;
            don(null, file.originalname);
        }
    }) });

async function getFileDetails(req){

        try {
    
            const { file } = req;

            console.log(file);
            const {data} = await google.drive({ version: "v3", auth: auth }).files
                .create({
                    media: {
                        mimeType: file.mimeType,
                        body: fs.createReadStream(file.path)
                    },
                    requestBody: {
                        name: file.originalname,
                        parents: [IMGDB_KEY]   //folder id in which file should be uploaded
                    },
                    fields: "id,name"
                })
                    console.log(data);
    
                    console.log(`File uploaded successfully -> ${JSON.stringify(data)}`);
                    const ret = { status: 1, message: "success", file_name: data.name, id:data.id };
                    console.log(ret);
                    return ret;
                
    
        } catch (error) {
    
            console.log(error);
            return JSON.stringify({ status: -1, message: "failure", err: error.message });
    
        }
    }

export {upload, getFileDetails}
