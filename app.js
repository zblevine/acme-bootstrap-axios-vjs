const apiURL = 'https://acme-users-api-rev.herokuapp.com/api/'
const getTD = (str) => `<td>${str}</td>`;
const getTR = (row) => `<tr>${row}</tr>`;

const getCompanyContents = (arr) => arr.map(company => {
    const vals = [company.id, company.name, company.phone, company.state, company.catchPhrase, company.createdAt, company.updatedAt];
    return getTR(vals.map(attr => getTD(attr)).join(''));
}).join('');

const getProductsContents = (arr) => arr.map(product => {
    const vals = [product.id, product.name, product.description, product.suggestPrice, product.createdAt, product.updatedAt];
    return getTR(vals.map(attr => getTD(attr)).join(''));
}).join('');

const getData = (tabState) => {
    Promise.all([axios.get(`${apiURL}products`), axios.get(`${apiURL}companies`)])
    .then(data => {
        const products = data[0];
        const companies = data[1];
        console.log(products);
        console.log(companies);
        console.log(getProductsContents(products.data))
        if(tabState === "companies"){
            document.querySelector('#output').innerHTML = `<table>${getCompanyContents(companies.data)}</table>`;
        } else if( tabState === "products") {
            document.querySelector('#output').innerHTML = `<table>${getProductsContents(products.data)}</table>`;    
        }

    })
    .catch((ex) => console.log(ex.message));
}



getData(tabState);

window.addEventListener('hashchange', ()=> {
    let currentSearch = location.hash.split("#")[1];
}

)