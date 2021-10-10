type MenuItem = {
  local: string;
  labelSk: string;
  labelDe: string; 
}

type NewsItem = {
  bigImage : string;
  smallImage : string;
  imageTitleSk: string;
  imageTitleDe: string;
  dateTime: string;
  dateLabelSk: string;
  dateLabelDe: string;
  titleSk: string;
  titleDe: string;
  textSk : string;
  textDe : string;
}

export const linkGenerator = (items: MenuItem[], selectedLocal: string, lang: string = 'sk'): string => {
  let lines = '';
  for (let item of items) {
    const active = selectedLocal === item.local ? ' class="active"': '';
    const label = lang === 'sk' ? item.labelSk : item.labelDe; 
//    lines += '<li><a href="/' + lang + '/' + item.local + '"' + active + '>' + label + '</a></li>\n';
    lines += `<li><a href="/${lang}/${item.local}"${active}>${label}</a></li>\n`;
  }
  return lines;
}

export const newsGenerator = (items: NewsItem[], lang = 'sk', page = 1, pageSize = 2):string => {
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
}

export const paginationGenerator = (items: NewsItem[], page = 1, pageSize = 2):string => {
  let result = '';
  const pages = Math.floor(items.length / pageSize) + (items.length % pageSize > 0 ? 1 : 0);
  for (let i = 1; i <= pages; i++) {
    if (page === i) {
      result += `<li>${i}</li>\n`;
    } else {
      result += `<li><a href="./home?page=${i}">${i}</a></li>`;
    }  
  }
  return result;
}