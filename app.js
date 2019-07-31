const apiURL = 'https://acme-users-api-rev.herokuapp.com/api/'
const getTags = (type, str) => `<${type}>${str}</${type}>`;
const compHeaders = ['Id', 'Name', 'Phone', 'State', 'CatchPhrase', 'CreatedAt', 'UpdatedAt'];
const prodHeaders = ['Id', 'Name', 'Description', 'SuggestedPrice', 'CreatedAt', 'UpdatedAt'];
const compHeaderRow = compHeaders.map(header => getTags('th', header)).join('');
const prodHeaderRow = prodHeaders.map(header => getTags('th', header)).join('');

const getCompanyContents = (arr) => arr.map(company => {
    const vals = [company.id, company.name, company.phone, company.state, company.catchPhrase, company.createdAt, company.updatedAt];
    return getTags('tr', vals.map(attr => getTags('td', attr)).join(''));
}).join('');

const getProductsContents = (arr) => arr.map(product => {
    const vals = [product.id, product.name, product.description, product.suggestedPrice, product.createdAt, product.updatedAt];
    return getTags('tr', vals.map(attr => getTags('td', attr)).join(''));
}).join('');

const getData = (tabState) => {
    Promise.all([axios.get(`${apiURL}products`), axios.get(`${apiURL}companies`)])
    .then(data => {
        const products = data[0];
        const companies = data[1];
        console.log(products);
        console.log(companies);
        if (tabState === 'companies'){
            //document.querySelector('#output').innerHTML = `<table>${getCompanyContents(companies.data)}</table>`;
            document.querySelector('#output').innerHTML = getTags('table', `${getTags('thead', compHeaderRow)}${getTags('tbody', getCompanyContents(companies.data))}`);
        } else if ( tabState === 'products') {
            document.querySelector('#output').innerHTML = getTags('table', `${getTags('thead', prodHeaderRow)}${getTags('tbody', getProductsContents(products.data))}`);
        }
        document.querySelector('table').classList.add('table-striped')

    })
    .catch((ex) => console.log(ex.message));
}

window.addEventListener('hashchange', ()=> {
    let currentSearch = location.hash.split("#")[1];
    document.querySelector('h3').innerHTML = currentSearch;
    document.querySelector('#companies-link').classList.toggle('active');
    document.querySelector('#products-link').classList.toggle('active');
    getData(currentSearch);
});

getData('companies');
