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
        <button onclick=categoryListDetails('${category.category_id}') class="nav-link" id="" data-bs-toggle="pill"
        data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
        aria-selected="true">${category.category_name}</button>
        `;
        getCategoryUl.appendChild(createLi);
    });
}
loadCategoriesList();

const categoryListDetails = async (catId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        loadCategoryDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
}
const loadCategoryDetails = catDetails => {
    const getNewsContainerDiv = document.getElementById('news-container-id');
    catDetails.forEach(catDetail => {
        console.log(catDetail);
        const createNewsRow = document.createElement('div');
        createNewsRow.classList.add('news-div-row', 'my-3', 'card', 'p-4');
        createNewsRow.innerHTML = `
        <div class="row g-3">
            <div class="col-md-4">
                <img src="${catDetail.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">This is a wider card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.</p>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    <div class="row">
                        <div class="col-3">
                            <div class="row">
                                <div class="col-4">
                                    <img class="img-fluid" src="images/fas-removebg-preview.png" alt="">
                                </div>
                                <div class="col-8">
                                    <div class="row">
                                        <div class="col-12">
                                            <p>Jane Cooper</p>
                                        </div>
                                        <div class="col-12">
                                            <p>Jan 10,2022</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3">
                            <p><i class="fa-solid fa-eye"></i><span>1.5M</span></p>
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
}