import refs from './js/refs';
// const searchForm = document.querySelector('#search-form');
// const loadMoreBtn = document.querySelector('.load-more');
// const gallery = document.querySelector('.gallery');
import ImagesApiServise from './js/images-service';
import renderImages from './js/render-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let simpleGallery = new SimpleLightbox('.gallery a', {});

const imagesApiService = new ImagesApiServise();

refs.searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  clearMarkup();
  imagesApiService.resetPage();
  const arrOfImages = await imagesApiService.fetchImages();
  createMarkup(renderImages(arrOfImages));
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  const arrOfImages = await imagesApiService.fetchImages();
  createMarkup(renderImages(arrOfImages));
}

function createMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', images);
  simpleGallery.refresh();
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

// https://pixabay.com/api/?key=32125598-727b0dcec7c138f75a012e8ea&q=cat&page=1&perPage=40&image_type=photo&orientation=horizontal&safesearch=true
