export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `https://pixabay.com/api/?key=33776129-06b0afe52f3ec0e98d1b43427&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page40&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.page += 1;
      });
  }
  resetPage() {
    this.page = 1;
  }
}
