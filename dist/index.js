"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const menu = require("./menu.json");
const menu_responsive = require("./menu_responsive.json");
const news = require("./news.json");
const functions_1 = require("./functions");
const app = express();
const router = express.Router();
app.use(express.static("public"));
app.use(router);
app.set('view engine', 'ejs');
app.use((req, res) => {
    res.render('index', { page: '404', lang: 'sk' });
});
router.get('/', (req, res) => {
    res.redirect('/sk/home');
});
router.get('/:lang/:page', (req, res) => {
    const lang = req.params.lang === 'de' ? 'de' : 'sk';
    if (fs.existsSync('views/pages/' + lang + '/' + req.params.page + '.ejs')) {
        const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
        res.render('index', { page: req.params.page,
            linkGenerator: functions_1.linkGenerator,
            menu,
            menu_responsive,
            newsGenerator: functions_1.newsGenerator,
            news,
            paginationGenerator: functions_1.paginationGenerator,
            pageNumber,
            lang });
    }
    else {
        res.render('index', { page: '404', lang });
    }
});
app.listen(4000, () => console.log('Example app listening on port 4000!'));
//# sourceMappingURL=index.js.map