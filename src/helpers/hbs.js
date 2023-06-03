// We can call these functions within our .hbs views

const hbs = require('hbs');

const getHeaders = (request) => {
    return JSON.stringify(request.headers,null,10);
}

hbs.registerHelper('getHeaders', getHeaders);


