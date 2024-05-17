//LIST URL menggunakan router dari express.js

const express = require("express");
const router = express.Router();
const pool = require("../config/config.js")

//List Seluruh Film
router.get("/film", (req, res) => {

    const sql ='SELECT * FROM film'
       
    pool.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {

            res.status(200).json(result.rows);
        }
    })
})

//List film berdasarkan id 
router.get("/film/:film_id", (req, res) => {
    const film_id = req.params.film_id

    const sql = 'SELECT * FROM film WHERE film_id = $1'
       
    pool.query(sql, [film_id], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error'});
        } else {
            if(result.rows.length > 0 ) {
                res.status(200).json(result.rows[0]);
            } else {
            res.status(404).json({ error: 'Film not Found'});}
        }
    })
})

//List berdasarkan kategori
router.get("/category", (req, res) => {

    const sql ='SELECT * FROM category'
       
    pool.query(sql, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            res.status(200).json(result.rows);
        }
    })
})

//List berdasarkan film dari kategori
router.get("/films-by-category/:category_id", (req, res) => {
    const category_id = req.params.category_id;

    console.log(`Fetching films for category_id: ${category_id}`);

    const sql = `
        SELECT 
            film.film_id,
            film.title,
            film.release_year,
            category.name AS category_name,
            category.last_update AS category_last_update,
            film_category.last_update AS film_category_last_update
        FROM
            film
        INNER JOIN film_category ON film.film_id = film_category.film_id
        INNER JOIN category ON film_category.category_id = category.category_id
        WHERE
            category.category_id = $1
        `;
    pool.query(sql, [category_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.rows.length > 0) {
                res.status(200).json(result.rows);
            } else {
                res.status(404).json({ error: 'No films found for this category' });
            }
        }
    });
});


module.exports = router;

