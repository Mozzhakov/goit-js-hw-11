import axios from 'axios';
import { Notify } from 'notiflix';
export default class ImagesApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchImages() {
    const API_KEY = '32125598-727b0dcec7c138f75a012e8ea';
    const BASE_URL = 'https://pixabay.com/api/';
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: this.searchQuery,
        page: this.page,
        perPage: 40,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    let images = response.data;

    if (images.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (images.total > 0 && this.page === 1) {
      this.showTotalHits(images.totalHits);
    }

    this.incrementPage();
    // console.log(images.hits);

    return images.hits;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  showTotalHits(totalHits) {
    Notify.info(`Hooray! We found ${totalHits} images.`);
  }
}
