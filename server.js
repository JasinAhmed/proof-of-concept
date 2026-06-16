import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const engine = new Liquid();

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');
let favorieten = [];

/* OVERZICHTSPAGINA */

app.get('/', async function (request, response) {
    const sort = request.query.sort;

    let url = 'https://fdnd-agency.directus.app/items/f_houses?fields=*.*';

    if (sort === 'laag-hoog') {
        url += '&sort=price';
    }

    if (sort === 'hoog-laag') {
        url += '&sort=-price';
    }

    const apiResponse = await fetch(url);
    const apiResponseJSON = await apiResponse.json();

    response.render('index.liquid', {
        title: 'Huizen',
        houses: apiResponseJSON.data,
        sort: sort
    });
});
/* DETAILPAGINA */

app.get('/huis-detail/:id', async function (request, response) {
    const id = request.params.id;

    const apiResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_houses/${id}?fields=*.*`
    );

    const apiResponseJSON = await apiResponse.json();

    response.render('huis-detail.liquid', {
        title: 'Huis detail',
        house: apiResponseJSON.data
    });
});

app.get('/favorieten', function (request, response) {
    response.render('favorieten.liquid', {
        title: 'Favoriete huizen',
        houses: favorieten
    });
});

app.post('/favorieten/:id', async function (request, response) {
    const id = request.params.id;

    const apiResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_houses/${id}?fields=*.*`
    );

    const apiResponseJSON = await apiResponse.json();

    const house = apiResponseJSON.data;

    const bestaatAl = favorieten.find(function (favoriet) {
        return favoriet.id == house.id;
    });

    if (!bestaatAl) {
        favorieten.push(house);
    }

    response.redirect('/favorieten');
});
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
    console.log(`Server draait op http://localhost:${app.get('port')}`);
});