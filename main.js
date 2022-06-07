const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    var artists = ['ariana', 'taylor', 'billie', 'ed', 'shawn', 'dua', 'selena', 'camila', 'bruno', 'justin'];
    var results = [];

    for(const artist of artists) {
        await axios.get(`https://itunes.apple.com/search?term=${artist}&limit=20`)
        .then(data => {
            results.push(data.data.results.filter(result => result.artistName.toUpperCase().includes(artist.toLocaleUpperCase()))[0])
        })
    }

    res.send({
        count: results.length,
        results: results.sort(sortByGenre).sort(sortByRelease)
    })
 })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const sortByGenre = (a, b) => {
    const nameA = a.primaryGenreName.toUpperCase();
    const nameB = b.primaryGenreName.toUpperCase();

    if (nameA < nameB) {
        return -1;
    }

    if (nameA > nameB) {
        return 1;
    }
    
    return 0;
}

const sortByRelease = (a, b) => {
    const nameA = a.primaryGenreName.toUpperCase();
    const nameB = b.primaryGenreName.toUpperCase();

    const first = new Date(a.releaseDate)
    const second = new Date(b.releaseDate)

    if(nameA == nameB) {
        return  first - second 
    }
}