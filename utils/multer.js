import multer from 'multer';

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname.split('.')[0] + '-' + Date.now() + '.csv')
    }
})

const upload = multer({storage:storage})

export default upload;

