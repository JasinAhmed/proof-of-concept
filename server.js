import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const engine = new Liquid();

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

/* OVERZICHTSPAGINA */

app.get('/', async function (request, response) {
    const apiResponse = await fetch(
        'https://fdnd-agency.directus.app/items/f_houses?fields=*.*'
    );

    const apiResponseJSON = await apiResponse.json();

    response.render('index.liquid', {
        title: 'Huizen',
        houses: apiResponseJSON.data
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

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
    console.log(`Server draait op http://localhost:${app.get('port')}`);
});