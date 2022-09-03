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
    console.log(catDetails);
}