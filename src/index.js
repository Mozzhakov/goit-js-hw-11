const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
import ImagesApiServise from './js/images-service';
import renderImages from './js/render-images';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let simpleGallery = new SimpleLightbox('.gallery a', {});

const imagesApiService = new ImagesApiServise();

searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;
  clearMarkup();
  imagesApiService.resetPage();
  const arrOfImages = await imagesApiService.fetchImages();
  createMarkup(renderImages(arrOfImages));
  loadMoreBtn.classList.remove('hidden');
}

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  const arrOfImages = await imagesApiService.fetchImages();
  createMarkup(renderImages(arrOfImages));
}

function createMarkup(images) {
  gallery.insertAdjacentHTML('beforeend', images);
  simpleGallery.refresh();
}

function clearMarkup() {
  gallery.innerHTML = '';
}

// https://pixabay.com/api/?key=32125598-727b0dcec7c138f75a012e8ea&q=cat&page=1&perPage=40&image_type=photo&orientation=horizontal&safesearch=true
