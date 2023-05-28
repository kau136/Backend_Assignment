const Data = require('../connection').con


// GET /api/v1/longest-duration-movies

const getAllData = async (req, res, next) => {
    await Data.query('SELECT * FROM movies ORDER BY runtimeMinutes DESC LIMIT 10',
        (err, rows, fields) => {
            if (!err) {
                res.json({ data: rows,status: "Top 10 Record found successfully!!!!" });
            }
            else
                res.json({ status: "Record doed not found!!!!" });
        })
}

// POST /api/v1/new-movie

const postMovieData = async (req, res, next) => {
    let data = req.body;
    let sql = "insert into movies values(?,?,?,?,?)";
    Data.query(sql, [data.tconst, data.titleTe, data.primaryTitle, data.runtimeMinutes, data.genres], (err, rows, fields) => {
        if (!err)
            res.json({status:"New Movie Record inserted successfully!!!!"});
        else
            res.json({status:"New Movie Record does not insert !!!!"});
        console.log(err);
    })
};

// GET /api/v1/top-rated-movies

const getMovieData = async (req, res, next) => {
    await Data.query("SELECT m.tconst, m.primaryTitle, m.genres, r.averageRating FROM ratings as r inner join movies as m on r.tconst = m.tconst where r.averageRating > 6 and m.titleType= 'movie' order by r.averageRating",
        (err, rows, fields) => {
            if (!err) {
                console.log(rows);
                res.json({ data: rows, status: "Record found successfully!!!!" });
            }
            else
                res.json({ status: "Record doed not found!!!!" });
        })
};

// GET /api/v1/genre-movies-with-subtotals

const genresMovieData = async (req, res, next) => {
    let sql1 = "select m.genres, m.primaryTitle, r.numVotes FROM Movies as m inner join ratings as r on m.tconst = r.tconst  where titleType = 'movie' ORDER BY genres"
    let sql2 = "select m.genres, SUM(numVotes) AS subtotal_numVotes FROM Movies as m inner join ratings as r on m.tconst = r.tconst  where titleType = 'movie' GROUP BY genres ORDER BY genres "

    await Data.query(sql2, (err, row, fields) => {
        if (!err) {
            Data.query(sql1, (err, rows, fields) => {
                if (!err) {
                    var mylist = row.map(element => {
                        return {
                            moviesData: rows.filter(movie => movie.genres == element.genres),
                            subtotal_numVotes: element.subtotal_numVotes
                        }
                    })
                    res.json({ data: mylist, status: "Record found successfully!!!!" });
                }
            })
        }
    })

};

// POST /api/v1/update-runtime-minutes

const updateMovieData = async (req, res, next) => {
    await Data.query("UPDATE Movies SET runtimeMinutes = CASE WHEN genres = 'Documentary' THEN runtimeMinutes + 15 WHEN genres = 'Animation' THEN runtimeMinutes + 30 ELSE runtimeMinutes + 45 END",
        (err, rows, fields) => {
            if (!err) {
                console.log(rows);
                res.json({ data: rows, status: "Record update successfully!!!!" });
            }
            else
                res.json({ status: "Record not updated!!!" });
        })
};

module.exports = { postMovieData, getAllData, getMovieData, updateMovieData, genresMovieData };