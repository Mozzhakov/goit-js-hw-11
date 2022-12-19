import refs from './js/refs';
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
  try {
    const arrOfImages = await imagesApiService.fetchImages();
    createMarkup(renderImages(arrOfImages));

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 0.25,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
}

refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  try {
    const arrOfImages = await imagesApiService.fetchImages();
    createMarkup(renderImages(arrOfImages));

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2.7,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', images);
  simpleGallery.refresh();
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

refs.switcherBtn.addEventListener('click', () => {
  refs.loadMoreBtn.remove();
  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && imagesApiService.searchQuery !== '') {
        onLoadMoreBtnClick();
      }
    });
  };

  const options = {
    rootMargin: '200px',
  };

  const observer = new IntersectionObserver(onEntry, options);

  observer.observe(refs.scrollSwitcher);
});
