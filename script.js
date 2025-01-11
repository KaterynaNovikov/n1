const images = [
  { title: 'Image 1', url: 'https://via.placeholder.com/300x200', description: 'This is image 1' },
  { title: 'Image 2', url: 'https://via.placeholder.com/300x200', description: 'This is image 2' },
  { title: 'Image 3', url: 'https://via.placeholder.com/300x200', description: 'This is image 3' },
  { title: 'Image 4', url: 'https://via.placeholder.com/300x200', description: 'This is image 4' },
  { title: 'Image 5', url: 'https://via.placeholder.com/300x200', description: 'This is image 5' },
  { title: 'Image 6', url: 'https://via.placeholder.com/300x200', description: 'This is image 6' },
  { title: 'Image 7', url: 'https://via.placeholder.com/300x200', description: 'This is image 7' }
];

const galleryContainer = document.getElementById('gallery-container');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.getElementById('close-modal');

// Створення галереї
images.forEach((image, index) => {
  const imgElement = document.createElement('img');
  imgElement.src = image.url;
  imgElement.alt = image.title;
  imgElement.title = image.description;
  imgElement.classList.add('gallery-image');
  
  // Додаємо зображення в галерею
  galleryContainer.appendChild(imgElement);

  // Додаємо обробник події для відкриття модального вікна
  imgElement.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = image.url;
    modalDescription.textContent = image.description;
  });
});

// Закриття модального вікна
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

let currentIndex = 0;

function changeImage(direction) {
  currentIndex += direction;

  // Перевірка меж
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }

  // Зміна зображення
  modalImg.src = images[currentIndex].url;
  modalDescription.textContent = images[currentIndex].description;
}

// Ініціалізація слайдера
modalImg.src = images[currentIndex].url;
modalDescription.textContent = images[currentIndex].description;

let itemsPerPage = 3;
let currentPage = 1;

function displayPage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const imagesToDisplay = images.slice(startIndex, endIndex);
  
  galleryContainer.innerHTML = '';
  imagesToDisplay.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.url;
    imgElement.alt = image.title;
    imgElement.classList.add('gallery-image');
    galleryContainer.appendChild(imgElement);
  });
}

function createPagination() {
  const pageCount = Math.ceil(images.length / itemsPerPage);
  const paginationContainer = document.createElement('div');
  
  for (let i = 1; i <= pageCount; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      displayPage(i);
    });
    paginationContainer.appendChild(pageButton);
  }

  document.body.appendChild(paginationContainer);
}

// Відображення першої сторінки і пагінації
displayPage(currentPage);
createPagination();
