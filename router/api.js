const express = require('express');
const router = express.Router();
const axios = require('axios');
const googleKey = 'AIzaSyDHk9CW6O_0-aJzHzIp9vvK4YsjjG5WLQ0';

/**
 * Google places api
 */
router.get('/googleplace/:outputFormat/:input/:inputType', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/${req.params.outputFormat}?input=${encodeURIComponent(req.params.input)}&inputtype=${req.params.inputType}&key=${googleKey}`,
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Google places details api
 */
router.get('/googleplacedetails/:outputFormat/:placeId', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/${req.params.outputFormat}?place_id=${req.params.placeId}&fields=name%2Creview%2Cphotos%2Cformatted_address&key=${googleKey}`,
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Google places photos api
 */
router.get('/googleplacephotos/:maxWidth/:photoReference', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${req.params.maxWidth}&photo_reference=${encodeURIComponent(req.params.photoReference)}&key=${googleKey}`,
        responseType: 'arraybuffer',
        //responseType: 'blob',
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Google reverse geocoding
 */
router.get('/googleplacereversegeocode/:outputFormat/:latLng', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/${req.params.outputFormat}?latlng=${req.params.latLng}&key=${googleKey}`,
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Google geocoding
 */
router.get('/googleplacegeocode/:outputFormat/:address', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/${req.params.outputFormat}?address=${req.params.address}&key=${googleKey}`,
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Google autocomplete
 */
router.get('/googleplaceautocomplete/:outputFormat/:input', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/${req.params.outputFormat}?address=${req.params.input}&key=${googleKey}`,
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});

/**
 * Google nearby search
 */
router.get('/googleplacenearby/:outputFormat/:location/:radius/:keyword', (req, res, next) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/${req.params.outputFormat}?location=${req.params.location}&radius=${req.params.radius}&keyword=${encodeURIComponent(req.params.keyword)}&key=${googleKey}`,
        headers: { }
    };

    axios(config)
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.send(error);
        });
});


module.exports = router;
