import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const engine = new Liquid();

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

const listId = 27;

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

    const houses = apiResponseJSON.data.map(function (house) {
        return {
            ...house,
            priceFormatted: Number(house.price).toLocaleString('nl-NL')
        };
    });

    response.render('index.liquid', {
        title: 'Huizen',
        houses: houses,
        sort: sort
    });
});

app.get('/huis-detail/:id', async function (request, response) {
    const id = request.params.id;

    const apiResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_houses/${id}?fields=*.*`
    );

    const apiResponseJSON = await apiResponse.json();

    const house = {
        ...apiResponseJSON.data,
        priceFormatted: Number(apiResponseJSON.data.price).toLocaleString('nl-NL')
    };

    response.render('huis-detail.liquid', {
        title: 'Huis detail',
        house: house
    });
});

app.get('/favorieten', async function (request, response) {
    const listResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_list/${listId}`
    );

    const listJSON = await listResponse.json();

    const houseIds = listJSON.data.houses || [];

    let houses = [];

    if (houseIds.length > 0) {
        const housesResponse = await fetch(
            `https://fdnd-agency.directus.app/items/f_houses?filter[id][_in]=${houseIds.join(',')}&fields=*.*`
        );

        const housesJSON = await housesResponse.json();

        houses = housesJSON.data.map(function (house) {
            return {
                ...house,
                priceFormatted: Number(house.price).toLocaleString('nl-NL')
            };
        });
    }

    response.render('favorieten.liquid', {
        title: 'Favoriete huizen',
        houses: houses
    });
});

app.post('/favorieten/:id', async function (request, response) {
    const houseId = Number(request.params.id);

    const listResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_list/${listId}`
    );

    const listJSON = await listResponse.json();

    const houses = listJSON.data.houses || [];

    if (!houses.includes(houseId)) {
        houses.push(houseId);
    }

    await fetch(`https://fdnd-agency.directus.app/items/f_list/${listId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            houses: houses
        })
    });

    response.redirect('/favorieten');
});

app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
    console.log(`Server draait op http://localhost:${app.get('port')}`);
});