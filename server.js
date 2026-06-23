// Ik importeer Express zodat ik een webserver kan maken
import express from 'express';

// Ik importeer Liquid zodat ik dynamische pagina's kan renderen
import { Liquid } from 'liquidjs';

// Ik maak een Express-app aan
const app = express();

// Ik zorg ervoor dat formulierdata gelezen kan worden
app.use(express.urlencoded({ extended: true }));

// Ik maak bestanden uit de public-map beschikbaar (CSS, afbeeldingen, etc.)
app.use(express.static('public'));

// Ik maak een nieuwe Liquid-engine aan
const engine = new Liquid();

// Ik stel Liquid in als view engine
app.engine('liquid', engine.express());

// Ik geef aan waar mijn Liquid-bestanden staan
app.set('views', './views');

// Ik stel Liquid in als standaard view engine
app.set('view engine', 'liquid');

// Dit is het ID van mijn favorietenlijst in Directus
const listId = 27;

// OVERZICHTSPAGINA

app.get('/', async function (request, response) {

    // Ik haal de gekozen sortering uit de URL
    // Bijvoorbeeld: ?sort=laag-hoog
    const sort = request.query.sort;

    // Dit is mijn basis API URL voor alle huizen
    let url = 'https://fdnd-agency.directus.app/items/f_houses?fields=*.*';

    // Als de gebruiker laag naar hoog kiest voeg ik sortering toe
    if (sort === 'laag-hoog') {
        url += '&sort=price';
    }

    // Als de gebruiker hoog naar laag kiest voeg ik sortering toe
    if (sort === 'hoog-laag') {
        url += '&sort=-price';
    }

    // Ik stuur een request naar Directus
    const apiResponse = await fetch(url);

    // Ik zet de response om naar JSON zodat ik ermee kan werken
    const apiResponseJSON = await apiResponse.json();

    // Ik loop door alle huizen heen
    const houses = apiResponseJSON.data.map(function (house) {

        // Ik voeg een geformatteerde prijs toe voor de weergave
        return {
            ...house,
            priceFormatted: Number(house.price).toLocaleString('nl-NL')
        };
    });

    // Ik stuur alle huizen naar index.liquid
    response.render('index.liquid', {
        title: 'Huizen',
        houses: houses,
        sort: sort
    });
});

// DETAILPAGINA

app.get('/huis-detail/:id', async function (request, response) {

    // Ik haal het huis-ID uit de URL
    const id = request.params.id;

    // Ik vraag dit specifieke huis op uit Directus
    const apiResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_houses/${id}?fields=*.*`
    );

    // Ik zet de response om naar JSON
    const apiResponseJSON = await apiResponse.json();

    // Ik maak een nieuw huisobject met een geformatteerde prijs
    const house = {
        ...apiResponseJSON.data,
        priceFormatted: Number(apiResponseJSON.data.price).toLocaleString('nl-NL')
    };

    // Ik stuur het huis naar de detailpagina
    response.render('huis-detail.liquid', {
        title: 'Huis detail',
        house: house
    });
});

// FAVORIETEN PAGINA

app.get('/favorieten', async function (request, response) {

    // Ik haal mijn favorietenlijst op uit Directus
    const listResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_list/${listId}`
    );

    // Ik zet de response om naar JSON
    const listJSON = await listResponse.json();

    // Ik haal alle opgeslagen huis-ID's op uit de lijst
    const houseIds = listJSON.data.houses || [];

    // Ik maak een lege array voor de huizen
    let houses = [];

    // Alleen als er favorieten zijn haal ik de huizen op
    if (houseIds.length > 0) {

        // Ik haal alle huizen op waarvan het ID in mijn favorietenlijst staat
        const housesResponse = await fetch(
            `https://fdnd-agency.directus.app/items/f_houses?filter[id][_in]=${houseIds.join(',')}&fields=*.*`
        );

        // Ik zet de response om naar JSON
        const housesJSON = await housesResponse.json();

        // Ik loop door alle huizen heen en formatteer de prijs
        houses = housesJSON.data.map(function (house) {
            return {
                ...house,
                priceFormatted: Number(house.price).toLocaleString('nl-NL')
            };
        });
    }

    // Ik stuur alle favoriete huizen naar favorieten.liquid
    response.render('favorieten.liquid', {
        title: 'Favoriete huizen',
        houses: houses
    });
});

// HUIS TOEVOEGEN AAN FAVORIETEN

app.post('/favorieten/:id', async function (request, response) {

    // Ik haal het huis-ID uit de URL
    const houseId = Number(request.params.id);

    // Ik haal eerst mijn huidige favorietenlijst op uit Directus
    const listResponse = await fetch(
        `https://fdnd-agency.directus.app/items/f_list/${listId}`
    );

    // Ik zet de response om naar JSON
    const listJSON = await listResponse.json();

    // Ik haal alle huidige favoriete huizen op
    const houses = listJSON.data.houses || [];

    // Ik controleer of dit huis nog niet bestaat in mijn lijst
    if (!houses.includes(houseId)) {

        // Ik voeg het huis-ID toe aan de lijst
        houses.push(houseId);
    }

    // Ik update mijn favorietenlijst in Directus
    await fetch(`https://fdnd-agency.directus.app/items/f_list/${listId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },

        // Ik stuur de bijgewerkte lijst naar Directus
        body: JSON.stringify({
            houses: houses
        })
    });

    // Ik stuur de gebruiker door naar de favorietenpagina
    response.redirect('/favorieten');
});


// Ik gebruik poort 8000 of de poort van de hostingomgeving
app.set('port', process.env.PORT || 8000);

// Ik start de server
app.listen(app.get('port'), function () {

    // Ik laat in de terminal zien dat de server draait
    console.log(`Server draait op http://localhost:${app.get('port')}`);
});