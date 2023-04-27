const express = require('express');
const axios = require('axios');
const router = express.Router()
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, async (req, res) => {

    const CHAR_END_POINT = "https://rickandmortyapi.com/api/character"

    axios.get(CHAR_END_POINT)
        .then(function (response) {
            console.log(response.data.results)
            res.render('index.hbs', {
                data: response.data.results, 
            })
        })
        .catch(function (error) {
            console.log(error);
            res.render('index.hbs', {
                error,
                data: [], 
            })
        });
})

router.get('/episodes', isLoggedIn, async (req, res) => {

    const EPI_END_POINT = "https://rickandmortyapi.com/api/episode"

    axios.get(EPI_END_POINT)
        .then(function (response) {
            console.log(response.data.results)
            res.render('episodes.hbs', {
                data: response.data.results, 
            })
        })
        .catch(function (error) {
            console.log(error);
            res.render('episodes.hbs', {
                error,
                data: [], 
            })
        });
})

router.get('/locations', isLoggedIn, async (req, res) => {

    const LOCATION_END_POINT = "https://rickandmortyapi.com/api/location"

    axios.get(LOCATION_END_POINT)
    .then(function (response) {
        console.log(response.data.results)
        res.render('location.hbs', {
            data: response.data.results, 
        })
    })
    .catch(function (error) {
        console.log(error);
        res.render('location.hbs', {
            error,
            data: [], 
        })
    });
})


module.exports = router
