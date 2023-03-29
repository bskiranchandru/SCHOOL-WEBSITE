const fs = require('fs');
const http = require('http');
const url = require('url');

const replaceTemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output = output.replace(/{%IMAGE%}/g,product.image);
    output = output.replace(/{%SUB-4%}/g,product.b);
    output = output.replace(/{%SUB-1%}/g,product.p);
    output = output.replace(/{%SUB-2%}/g,product.c);
    output = output.replace(/{%SUB-3%}/g,product.m);
    output = output.replace(/{%DESCRIPTION%}/g,product.description);
    output = output.replace(/{%ID%}/g,product.id);
    return output;
}

const temprev = fs.readFileSync(`${__dirname}/templates/template-review.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

//SERVER 
const server = http.createServer((req,res) => {
    const {query,pathname} = url.parse(req.url,true);
    //OVERVIEW PAGE
    if  (pathname === '/' || pathname ==='/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = temprev.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    //PRODUCT PAGE
    } else if (pathname ==='/product') {
        res.writeHead(200, { 'Content-Type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    //api
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(data);
    //NOT FOUND
    } else {
        res.writeHead(404,{
            'Content-Type': 'text/html',
            'my-own-header': 'hello world',
        });
        res.end('<h1>Page not found!</h1>');
    }
});

server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to the request on port 8000');
});




