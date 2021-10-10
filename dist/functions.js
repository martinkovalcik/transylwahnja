"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationGenerator = exports.newsGenerator = exports.linkGenerator = void 0;
const linkGenerator = (items, selectedLocal, lang = 'sk') => {
    let lines = '';
    for (let item of items) {
        const active = selectedLocal === item.local ? ' class="active"' : '';
        const label = lang === 'sk' ? item.labelSk : item.labelDe;
        //    lines += '<li><a href="/' + lang + '/' + item.local + '"' + active + '>' + label + '</a></li>\n';
        lines += `<li><a href="/${lang}/${item.local}"${active}>${label}</a></li>\n`;
    }
    return lines;
};
exports.linkGenerator = linkGenerator;
const newsGenerator = (items, lang = 'sk', page = 1, pageSize = 2) => {
    let news = '';
    const startIndex = pageSize * Math.max(0, page - 1);
    for (let i = startIndex; i < Math.min(items.length, startIndex + pageSize); i++) {
        const item = items[i];
        const imageTitle = lang === 'sk' ? item.imageTitleSk : item.imageTitleDe;
        const dateLabel = lang === 'sk' ? item.dateLabelSk : item.dateLabelDe;
        const title = lang === 'sk' ? item.titleSk : item.titleDe;
        const text = lang === 'sk' ? item.textSk : item.textDe;
        news += `<article class="newsflash">
              <img src="${item.smallImage}" alt="${imageTitle}" data-big-picture="${item.bigImage}">
              <time datetime="${item.dateTime}">${dateLabel}</time>
              <h3>${title}</h3>
              <p>${text}</p>
             </article>\n`;
    }
    return news;
};
exports.newsGenerator = newsGenerator;
const paginationGenerator = (items, page = 1, pageSize = 2) => {
    let result = '';
    const pages = Math.floor(items.length / pageSize) + (items.length % pageSize > 0 ? 1 : 0);
    for (let i = 1; i <= pages; i++) {
        if (page === i) {
            result += `<li>${i}</li>\n`;
        }
        else {
            result += `<li><a href="./home?page=${i}">${i}</a></li>`;
        }
    }
    return result;
};
exports.paginationGenerator = paginationGenerator;
//# sourceMappingURL=functions.js.map