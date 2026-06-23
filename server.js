// Importeer Express om een webserver te maken
import express from 'express';

// Importeer Liquid als template-engine voor de HTML-pagina's
import { Liquid } from 'liquidjs';

// Maak een Express-app aan
const app = express();

// Zorg ervoor dat formuliergegevens kunnen worden verwerkt
app.use(express.urlencoded({ extended: true }));

// Maak bestanden uit de map "public" beschikbaar (CSS, afbeeldingen, etc.)
app.use(express.static('public'));

// Maak een nieuwe Liquid-engine aan
const engine = new Liquid();

// Stel Liquid in als view-engine
app.engine('liquid', engine.express());

// Geef aan waar de views (pagina's) staan
app.set('views', './views');

// Stel Liquid in als standaard template-engine
app.set('view engine', 'liquid');

// ID van jouw favorietenlijst in Directus
// Pas dit nummer aan naar jouw eigen f_list ID
const listId = 27;

// OVERZICHTSPAGINA

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

// DETAILPAGINA

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

// FAVORIETEN PAGINA

app.get('/favorieten', async function (request, response) {
    // Haal jouw favorietenlijst op uit Directus
    const listResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_list/${listId}`
    );

    const listJSON = await listResponse.json();

    // Haal de opgeslagen huis-ID's op uit het veld houses
    const houseIds = listJSON.data.houses || [];

    let houses = [];

    // Alleen huizen ophalen als er favorieten zijn
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

// HUIS TOEVOEGEN AAN FAVORIETEN

app.post('/favorieten/:id', async function (request, response) {
    // Haal het huis-ID uit de URL
    const houseId = Number(request.params.id);

    // Haal eerst de huidige favorietenlijst op
    const listResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_list/${listId}`
    );

    const listJSON = await listResponse.json();

    // Pak de bestaande favoriete huizen uit Directus
    const houses = listJSON.data.houses || [];

    // Controleer of het huis nog niet in de lijst staat
    if (!houses.includes(houseId)) {
        houses.push(houseId);
    }

    // Update de lijst in Directus
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