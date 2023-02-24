import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './js/pixabay-servise.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  searchBtn: document.querySelector('button'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const pixabayApiService = new PixabayApiService();
const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

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
    refs.loadMoreBtn.style.display = 'none';
    refs.searchForm.reset();
    pixabayApiService.resetPage();
    clearImgList();
    const data = await pixabayApiService.fetchImages();
    const images = data.hits;
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
    lightbox.refresh();
  } catch {}
}

async function onLoadMore() {
  try {
    const data = await pixabayApiService.fetchImages();
    const images = data.hits;
    const markup = images.reduce(
      (markup, image) => createMarkup(image) + markup,
      ''
    );
    appendImgToList(markup);
    lightbox.refresh();
    if (data.totalHits < 40 * pixabayApiService.page) {
      refs.loadMoreBtn.style.display = 'none';
      return Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch {}
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
  <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" data-source="${largeImageURL}"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>
  `;
}

function clearImgList() {
  refs.gallery.innerHTML = '';
}

function appendImgToList(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
