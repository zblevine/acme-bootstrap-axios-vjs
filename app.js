const apiURL = 'https://acme-users-api-rev.herokuapp.com/api/'
const getTD = (str) => `<td>${str}</td>`;
const getTR = (row) => `<tr>${row}</tr>`;
const getTableContents = (arr) => arr.map(company => {
    const vals = [company.id, company.name, company.phone, company.state, company.catchPhrase, company.createdAt, company.updatedAt];
    return getTR(vals.map(attr => getTD(attr)).join(''));
}).join('');

const getData = () => {
    Promise.all([axios.get(`${apiURL}products`), axios.get(`${apiURL}companies`)])
    .then(data => {
        const products = data[0];
        const companies = data[1];
        console.log(products);
        console.log(companies);
        document.querySelector('#output').innerHTML = `<table>${getTableContents(companies.data)}</table>`;
    })
    .catch((ex) => console.log(ex.message));
}

getData();
