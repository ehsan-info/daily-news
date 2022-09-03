// console.log('hello');
const loadCategoriesList = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayList(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}
const displayList = categories => {
    // console.log(categories);
    const getCategoryUl = document.getElementById('category-list-id');
    categories.forEach(category => {
        console.log(category);
        const createLi = document.createElement('li');
        createLi.classList.add('nav-item', 'active');
        createLi.innerHTML = `
        <button onclick="categoryListDetails('${category.category_id}','${category.category_name}')" class="nav-link" id="" data-bs-toggle="pill"
        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
        aria-selected="true">${category.category_name}</button>
        `;
        getCategoryUl.appendChild(createLi);
    });
}
loadCategoriesList();

const categoryListDetails = async (catId, catName) => {
    //star laoder
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        loadCategoryDetails(data.data, catName);
    }
    catch (error) {
        console.log(error);
    }
}
const loadCategoryDetails = (catDetails, catName) => {
    const getNewsContainerDiv = document.getElementById('news-container-id');
    getNewsContainerDiv.innerHTML = '';
    //display message
    const itemFound = document.getElementById('item-found-message');
    itemFound.classList.remove('d-none');
    const createMessage = document.createElement('p');
    if (catDetails.length === 0) {
        createMessage.innerHTML = `
            <span>No</span> items found for category <span>${catName}</span>
            `;
    }
    else {
        createMessage.innerHTML = `
            <span>${catDetails.length}</span> items found for category <span>${catName}</span>
            `;
    }
    itemFound.appendChild(createMessage);

    catDetails.forEach(catDetail => {
        console.log(catDetail);

        const sliceDetails = inputData => inputData.length > 500 ? `${inputData.substring(0, 500)}...` : inputData;
        const createNewsRow = document.createElement('div');
        createNewsRow.classList.add('news-div-row', 'my-3', 'card', 'p-4');
        createNewsRow.innerHTML = `
        <div class="row g-3">
            <div class="col-md-3">
                <img src="${catDetail.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h5 class="card-title">${catDetail.title}</h5>
                    <p class="card-text">${sliceDetails(catDetail.details)}</p>
                    <div class="row">
                        <div class="col-3">
                            <div class="row">
                                <div class="col-4">
                                    <img class="img-fluid" src="${catDetail.author.img}" alt="">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12">
                                            <p>${catDetail.author.name ? catDetail.author.name : 'No Author'}</p>
                                        </div>
                                        <div class="col-12">
                                            <p class="card-text"><small class="text-muted">${catDetail.author.published_date}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <p><i class="fa-solid fa-eye"></i><span>${catDetail.total_view ? catDetail.total_view : 'No views yet'}</span></p>
                        </div>
                        <div class="col-3"></div>
                        <div class="col-3">
                            <p><i class="fa-solid fa-arrow-right"></i></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        getNewsContainerDiv.appendChild(createNewsRow);
    });
    //stop loader or hide loader
    toggleSpinner(false);
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}