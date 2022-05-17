import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import {
  homeRoute,
  allRoute,
  addRouteGet,
  addRoutePost,
  detailedGet,
  editPost,
  editGet,
  cartPost,
  cartGet,
  cartDelete,
} from './routes/routes';

const app = express();
const PORT = process.env.PORT || 4004;
const homeDir = path.resolve();
const dirname = path.join(homeDir, 'src');
const staticDir = path.join(homeDir, 'dist/public');

app.engine('hbs', engine({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(dirname, 'pages'));

app.use(express.static(staticDir));
app.use(express.urlencoded({ extended: true }));
app.use(homeRoute);
app.use(addRouteGet);
app.use(addRoutePost);
app.use(allRoute);
app.use(detailedGet);
app.use(editGet);
app.use(editPost);
app.use(cartPost);
app.use(cartGet);
app.use(cartDelete);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
