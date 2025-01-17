const paginateBtnPrev = document.querySelector('.paginate-btn-prev');
const paginateBtnNext = document.querySelector('.paginate-btn-next');
const paginateBtnCurrent = document.querySelectorAll('.paginate-btn');
const searchTitle = document.querySelector('#search-title');
const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('q');
const sortField = urlParams.get('sort_field');
const sortOrder = urlParams.get('sort_order');
let page = +urlParams.get('page[cod]');

const updateUrl = (key, value, url) => {
  if (url.searchParams.has(key)) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.append(key, value);
  }
};

const convertUrl = (key, value) => {
  const url = new URL(window.location.href);

  updateUrl(key, value, url);

  return url;
};

const convertUrlWithMultipleQuery = (keys, values) => {
  const url = new URL(window.location.href);

  keys.forEach((key, i) => updateUrl(key, values[i], url));

  return url;
};

if (page <= 1 || !page) {
  page = 1;
}

if (paginateBtnPrev) {
  paginateBtnPrev.setAttribute('href', convertUrl('page[cod]', page - 1));
}

if (paginateBtnNext) {
  paginateBtnNext.setAttribute('href', convertUrl('page[cod]', page + 1));
}

if (paginateBtnCurrent) {
  paginateBtnCurrent.forEach((btn) => btn.setAttribute('href', convertUrl('page[cod]', btn.dataset.index)));
}

if (searchTitle) {
  searchTitle.innerHTML = query;
}

const sortBtns = document.querySelectorAll('.sort-items-holder .pawn');

if (sortBtns) {
  sortBtns.forEach((btn) => {
    const convertedSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    btn.setAttribute(
      'href',
      convertUrlWithMultipleQuery(['sort_field', 'sort_order'], [btn.dataset.value, convertedSortOrder]),
    );

    const sortBtn = document.querySelector(`.sort-items-holder .pawn[data-value='${sortField}']`);

    if (sortBtn) {
      sortBtn.classList.add('active');

      const sortBtnIcon = sortBtn.querySelector('ion-icon');

      if (sortBtnIcon) {
        if (sortOrder === 'asc') {
          sortBtnIcon.setAttribute('name', 'chevron-up-outline');
        } else {
          sortBtnIcon.setAttribute('name', 'chevron-down-outline');
        }
      }
    }
  });
}
