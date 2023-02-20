import PixabayApiService from './js/pixabay-servise.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  pixabayApiService.searchQuery =
    event.currentTarget.elements.searchQuery.value.trim();
  if (pixabayApiService.searchQuery === '') {
    return;
  }
  refs.searchForm.reset();
  pixabayApiService.resetPage();
  pixabayApiService.fetchImages();
}

function onLoadMore() {
  pixabayApiService.fetchImages();
}
