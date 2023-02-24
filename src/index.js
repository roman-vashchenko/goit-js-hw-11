import { Notify } from 'notiflix/build/notiflix-notify-aio';
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

async function onSearch(event) {
  try {
    event.preventDefault();
    pixabayApiService.searchQuery =
      event.currentTarget.elements.searchQuery.value.trim();
    if (pixabayApiService.searchQuery === '') {
      return;
    }
    refs.searchForm.reset();
    pixabayApiService.resetPage();
    const getImages = await pixabayApiService.fetchImages();

    console.log(getImages);
    if (getImages.totalHits === 0) {
      refs.loadMoreBtn.style.display = 'none';
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (getImages.totalHits) {
      refs.loadMoreBtn.style.display = 'block';
      return Notify.success(`Hooray! We found ${getImages.totalHits} images.`);
    }
  } catch {}
}

async function onLoadMore() {
  const loadMoreImages = await pixabayApiService.fetchImages();
}
