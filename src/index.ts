import * as express from 'express';
import * as fs from 'fs';
import * as menu from './menu.json';
import * as menu_responsive from './menu_responsive.json';
import * as news from './news.json';
import {linkGenerator, newsGenerator, paginationGenerator} from './functions';

const app = express();
const router = express.Router();

app.use(express.static("public"));
app.use(router);
app.set('view engine', 'ejs');

app.use((req, res) => {
  res.render('index', { page: '404', lang: 'sk' });
});
router.get('/', (req: express.Request, res) => {
  res.redirect('/sk/home');
});
router.get('/:lang/:page', (req: express.Request, res) => {
  const lang = req.params.lang === 'de' ? 'de' : 'sk';
  if (fs.existsSync('views/pages/'+ lang + '/' + req.params.page + '.ejs')) {
    const pageNumber = req.query.page ? parseInt(req.query.page as string) : 1;
    res.render('index', { page: req.params.page, 
                          linkGenerator, 
                          menu,
                          menu_responsive,
                          newsGenerator,
                          news,
                          paginationGenerator,
                          pageNumber,
                          lang});
  } else {
    res.render('index', { page: '404', lang });
  }
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));
