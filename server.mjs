import Koa from 'koa';
import koaBody from 'koa-body';
import Router from '@koa/router';
import multer from '@koa/multer';
import extract from './routes/extract.mjs';

const PORT = 3001;
const HOST = '0.0.0.0';

const app = new Koa();
const router = new Router();
const upload = multer();

router
    .post('/extract/cv', upload.single('file'), extract.cv.bind(extract))
    .post('/extract/vacancy', upload.single('file'), extract.vacancy.bind(extract))
    .post('/extract/detect', upload.single('file'), extract.detect.bind(extract));

app
    .use(koaBody({
        jsonLimit: '500kb'
    }))
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(PORT, HOST);