console.log('Hier komt je server voor Sprint 12.')

import express from 'express'
import { Liquid } from 'liquidjs'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')
app.set('view engine', 'liquid')



app.get('/huis-detail', async function (request, response) {
    const apiResponse = await fetch(
        'https://fdnd-agency.directus.app/items/f_houses?fields=*.*'
    )

    const apiResponseJSON = await apiResponse.json()

    const houses = apiResponseJSON.data

    const house = houses[0]

    console.log(Object.keys(house))
    console.log(house)

    response.render('huis-detail.liquid', {
        title: 'Huis detail',
        house: house
    })
})


app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
    console.log(`Server draait op http://localhost:${app.get('port')}`)
})