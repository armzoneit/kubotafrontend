import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import { Buffer } from 'buffer';




// first we need to disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req, res) => {
    if (req.method === 'PUT') {

        // parse form with a Promise wrapper
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();
            form.parse(req, (err, fields, files) => {
                if (err) return reject(err);
                resolve({ fields, files });
            });
        });

        try {
            const imageFile = data.files.image; // .image because I named it in client side by that name: // pictureData.append('image', pictureFile);
            const imagePath = imageFile[0].filepath;
            const datetimes = new Date();
            const filenames = datetimes.toLocaleDateString().replace("/","-").replace("/","-")+"-"+ datetimes.toLocaleTimeString().replace(" AM","").replace(" PM","").replace(":","-").replace(":","-");
            const names = imageFile[0].originalFilename.split(".");
            const savenamefile = names[0]+"-"+filenames+"-"+"."+names[1];
            // res.status(200).json({ message: savenamefile})
            // return;
            const pathToWriteImage = `./public/cardImage/${savenamefile}`; // include name and .extention, you can get the name from data.files.image object
            const image = await fs.readFile(imagePath);
            // res.status(200).json((imageFile[0]))
            // return;
            // const image = Buffer.form(imageFile.arrayBuffer());
            await fs.writeFile(pathToWriteImage, image);
            //store path in DB
            res.status(200).json({ message: savenamefile})
        } catch (error) {
            res.status(500).json({ message: error.message });
            return;
        }
    };
};