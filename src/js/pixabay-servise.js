const axios = require('axios').default;

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  resetPage() {
    this.page = 1;
  }

  async fetchImages() {
    const url = `https://pixabay.com/api/?key=33776129-06b0afe52f3ec0e98d1b43427&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    const response = await axios.get(url);

    this.page += 1;
    return response.data;
  }
  async additionalRequestImages() {
    const url = `https://pixabay.com/api/?key=33776129-06b0afe52f3ec0e98d1b43427&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=20&page=${this.page}`;

    const response = await axios.get(url);

    return response.data;
  }
}
