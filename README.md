# Funda Proof of Concept

Dit project is ontwikkeld als proof of concept waarbij een deel van de functionaliteit van Funda is nagebouwd. Het doel van het project was om een woningdetailpagina te ontwikkelen met moderne webtechnieken, waarbij toegankelijkheid, responsive design, Progressive Enhancement en performance centraal staan.

Naast de woningdetailpagina is ook een woningoverzichtspagina en een favorietenpagina ontwikkeld. De website haalt woninggegevens op uit een externe databron en presenteert deze op een gebruiksvriendelijke manier voor zowel desktop- als mobiele gebruikers.

## Live demo

https://proof-of-concept-uuxw.onrender.com/

---

# Inhoudsopgave

* Opdracht
* Functionaliteiten
* Woningoverzicht
* Woningdetailpagina
* Favorieten
* Progressive Enhancement
* Browsercompatibiliteit
* Toegankelijkheid
* Technische kenmerken
* Tech Stack
* Code conventies
* Installatie
* Licentie

---

# Opdracht

De opdracht was om een woningdetailpagina van Funda zo nauwkeurig mogelijk na te bouwen met behulp van server-side rendering en moderne webtechnieken.

Tijdens de ontwikkeling zijn daarnaast extra functionaliteiten toegevoegd die niet binnen de oorspronkelijke opdracht vielen:

* Woningoverzichtspagina
* Favorietenpagina
* Favorietenfunctionaliteit
* Scroll Driven Animations
* View Transitions
* Responsive layout
* WCAG-verbeteringen

---

# Functionaliteiten

De website bestaat uit drie hoofdonderdelen:

1. Woningoverzicht
2. Woningdetailpagina
3. Favorietenpagina

Alle onderdelen zijn responsive opgebouwd en werken op desktop, tablet en mobiel.

---

# Woningoverzicht

De woningoverzichtspagina toont alle beschikbare woningen.

Gebruikers kunnen:

* Woningen bekijken
* Woningen sorteren op prijs
* Doorklikken naar een woningdetailpagina

## Functionaliteiten

* Dynamisch geladen woningdata
* Sorteerfunctie
* Responsive woningkaarten
* Toegankelijke navigatie
* Werkt zonder JavaScript

### Code

https://github.com/JasinAhmed/proof-of-concept/blob/44209ba5a3d0ab75d2cad49a96723f6e68dfef39/views/index.liquid#L1-L74
---

# Woningdetailpagina

De woningdetailpagina vormt het belangrijkste onderdeel van het project.

Hier wordt uitgebreide informatie over een woning weergegeven, waaronder:

* Adres
* Vraagprijs
* Beschrijving
* Kenmerken
* Populariteit
* Buurtinformatie
* Makelaarsinformatie

Daarnaast kunnen gebruikers woningen opslaan als favoriet.

## Functionaliteiten

* Dynamische woninginformatie
* Afbeeldingengalerij
* Favorietenfunctie
* Deelknop
* Contact opnemen met makelaar
* Bezichtiging aanvragen
* Responsive layout

### Code

* Detailpagina: https://github.com/JasinAhmed/proof-of-concept/blob/998a366f536c4635952575035fc845b0b173083e/views/huis-detail.liquid#L1-L422

---

# Favorieten

Gebruikers kunnen woningen opslaan als favoriet.

Wanneer een woning wordt opgeslagen wordt deze lokaal opgeslagen en ontvangt de gebruiker een visuele bevestiging via een toastmelding.

## Functionaliteiten

* Woningen opslaan
* Woningen verwijderen
* Favorietenoverzicht
* Leeg-state wanneer geen favorieten aanwezig zijn

### Code

* Favorietenpagina: https://github.com/JasinAhmed/proof-of-concept/blob/0569525012e087c28d784e38133e5002bac2764a/views/favorieten.liquid#L1-L120
* Favorietenfunctionaliteit: https://github.com/JasinAhmed/proof-of-concept/blob/0569525012e087c28d784e38133e5002bac2764a/public/style/scripts/client.js#L1-L128

---

# Progressive Enhancement

Tijdens dit project is gebruikgemaakt van Progressive Enhancement.

De basisfunctionaliteit van de website werkt zonder JavaScript. JavaScript wordt uitsluitend gebruikt om de gebruikerservaring verder te verbeteren.

Hierdoor blijft de website bruikbaar wanneer bepaalde browserfunctionaliteiten niet beschikbaar zijn.

---

## Scroll Driven Animations

Voor verschillende onderdelen van de woningdetailpagina zijn Scroll Driven Animations toegepast.

Elementen zoals:

* Omschrijving
* Kenmerken
* Populariteit
* Buurtinformatie

verschijnen geleidelijk in beeld wanneer de gebruiker scrollt.

Browsers die deze functionaliteit niet ondersteunen tonen dezelfde content zonder animaties.

### Demonstratie

**Video Scroll Driven Animations**

*Voeg hier je video toe.*

### Code

* https://github.com/JasinAhmed/proof-of-concept/blob/main/public/style/style.css

---

## View Transitions

Voor vloeiende paginaovergangen wordt gebruikgemaakt van de View Transitions API.

Wanneer een browser deze functionaliteit ondersteunt worden paginaovergangen geanimeerd weergegeven.

Wanneer een browser geen ondersteuning biedt blijft de website volledig functioneren zonder overgangsanimaties.

Dit is een voorbeeld van Progressive Enhancement waarbij moderne browsers een rijkere gebruikerservaring krijgen zonder dat andere gebruikers worden uitgesloten.

### Demonstratie

**Video View Transitions**

*Voeg hier je video toe.*

### Code

* https://github.com/JasinAhmed/proof-of-concept/blob/main/public/style/style.css

---

# Browsercompatibiliteit

De website is getest in meerdere browsers.

## Geteste browsers

* Google Chrome
* Mozilla Firefox
* Microsoft Edge
* Brave Browser

### Chrome

* Scroll Driven Animations werken
* View Transitions werken
* Favorietenfunctionaliteit werkt

**Video Chrome**

*Voeg hier je video toe.*

---

### Firefox

* Scroll Driven Animations worden niet ondersteund
* View Transitions worden niet ondersteund
* Website blijft volledig bruikbaar

**Video Firefox**

*Voeg hier je video toe.*

---

### Edge

* Scroll Driven Animations werken
* View Transitions werken
* Favorietenfunctionaliteit werkt

**Video Edge**

*Voeg hier je video toe.*

---

### Brave

* Scroll Driven Animations werken
* View Transitions werken
* Favorietenfunctionaliteit werkt

**Video Brave**

*Voeg hier je video toe.*

---

## Resultaat

| Functionaliteit          | Chrome | Edge | Brave | Firefox |
| ------------------------ | ------ | ---- | ----- | ------- |
| Scroll Driven Animations | ✅      | ✅    | ✅     | ❌       |
| View Transitions         | ✅      | ✅    | ✅     | ❌       |
| Favorietenfunctie        | ✅      | ✅    | ✅     | ✅       |
| Responsive Layout        | ✅      | ✅    | ✅     | ✅       |

Firefox ondersteunt momenteel niet alle moderne CSS-functionaliteiten die gebruikt worden binnen dit project. Dankzij Progressive Enhancement blijft de website echter volledig bruikbaar.

---

# Toegankelijkheid

De website is getest met Lighthouse en handmatige toegankelijkheidscontroles.

Tijdens het project zijn verschillende verbeteringen doorgevoerd:

* Beschrijvende alt-teksten toegevoegd
* Focus states toegevoegd
* Toetsenbordnavigatie verbeterd
* Formulieren correct gelabeld
* Lege links verwijderd
* Contrast gecontroleerd

## Lighthouse

### Mobiel

*Voeg hier je Lighthouse screenshot toe.*

### Desktop

*Voeg hier je Lighthouse screenshot toe.*

Na het doorvoeren van de verbeteringen is de toegankelijkheidsscore verder gestegen.

De website behaalt nog geen perfecte score doordat het contrast van de header bewust is overgenomen uit de originele Funda-stijl.

---

# Technische kenmerken

## HTML

* Semantische HTML
* Server-side rendering
* Toegankelijke formulieren
* Toegankelijke navigatie

## CSS

* Mobile-first ontwikkeling
* CSS Nesting
* CSS Variables
* Responsive design
* Scroll Driven Animations
* View Transitions
* Focus-visible styling
* prefers-reduced-motion ondersteuning

## JavaScript

JavaScript wordt uitsluitend gebruikt als enhancement layer.

Functionaliteiten:

* Favorieten opslaan
* Toastmeldingen
* Fetch API
* Local Storage
* Dynamische interacties

---

# Tech Stack

* HTML
* CSS
* JavaScript
* Liquid
* Node.js
* Express.js

---

# Code conventies

Tijdens de ontwikkeling is gebruikgemaakt van consistente naamgeving binnen de gehele codebase.

### HTML & Liquid

* Semantische HTML-elementen
* Herbruikbare partials
* Logische templatestructuur

### CSS

* Mobile-first aanpak
* CSS Nesting
* CSS Variables
* Component gebaseerde structuur

### JavaScript

* Progressive Enhancement als uitgangspunt
* Duidelijke variabelenamen
* JavaScript alleen voor aanvullende functionaliteit

---

# Installatie

Installeer eerst de benodigde packages:

```bash
npm install
```

Start vervolgens de applicatie:

```bash
npm start
```

Open daarna:

```text
http://localhost:8000
```

---

# Licentie

Dit project is ontwikkeld voor educatieve doeleinden als onderdeel van de opleiding Frontend Design & Development en is gebaseerd op een proof of concept van de Funda woningdetailpagina.
