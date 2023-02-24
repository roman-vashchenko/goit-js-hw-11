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
    clearImgList();
    const data = await pixabayApiService.fetchImages();
    const images = data.hits;
    console.log(data);
    if (data.totalHits === 0) {
      refs.loadMoreBtn.style.display = 'none';
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (data.totalHits) {
      refs.loadMoreBtn.style.display = 'block';
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    const markup = images.reduce(
      (markup, image) => createMarkup(image) + markup,
      ''
    );
    appendImgToList(markup);
  } catch {}
}

async function onLoadMore(markup) {
  try {
    const loadMoreImages = await pixabayApiService.fetchImages();
    appendImgToList(markup);
  } catch {}
}

function clearImgList() {
  gallery.innerHTML = '';
}

function appendImgToList(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
  `;
}
