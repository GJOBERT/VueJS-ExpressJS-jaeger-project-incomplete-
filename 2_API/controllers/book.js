const connect = require('../config/db.config');


exports.searchBook = (req, res, next) => {

    const search = req.body;

    connect.query(`SELECT id FROM books
                  WHERE (title LIKE "%${search.title}%"
                  OR summary LIKE "%${search.title}%")
                  AND author LIKE "%${search.author}%"
                  AND year LIKE "%${search.year}%"
                  AND isbn LIKE "%${search.isbn}%"
                  AND cote LIKE "%${search.cote}%"
                  AND is_borrowed LIKE "%${search.is_borrowed}%"
                  AND category_id LIKE "%${search.category_id}%"
                  ${search.orderby} ${search.col} ${search.order}
                    `
                    , (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error' : err
            });
        } else {
            return res.status(200).json({
                results
            });
        }
    });
}

exports.searchBookbis = (req, res, next) => {

    const search = req.body;

    connect.query(`SELECT id FROM books
                  WHERE (title LIKE "%${search.input}%"
                  OR summary LIKE "%${search.input}%"
                  OR author LIKE "%${search.input}%"
                  OR year LIKE "%${search.input}%"
                  OR isbn LIKE "%${search.input}%"
                  OR cote LIKE "%${search.input}%")
                  AND is_borrowed LIKE '%${search.is_borrowed}%'
                  AND category_id LIKE "%${search.category_id}%"
                  ${search.orderby} ${search.col} ${search.order}
                    `
                    , (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error' : err
            });
        } else {
            return res.status(200).json({
                results
            });
        }
    });
}

// books.id, title, summary, author, year, isbn, cote, image, borrowed_by, DATE_FORMAT(date_begin, "%Y-%m-%d") AS 'date_begin', DATE_FORMAT(date_end, "%Y-%m-%d") AS 'date_end', categories.name AS 'category'

exports.getBooks = (req, res, next) => {

    connect.query(`SELECT books.id FROM books
                    INNER JOIN categories ON books.category_id = categories.id`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            return res.status(200).json({
                result
            });
        }
    });
}

exports.getBook = (req, res, next) => {

    const id = req.params.id;

        connect.query(`SELECT books.id, title, summary, author, year, isbn, cote, image, borrowed_by, is_borrowed, DATE_FORMAT(date_begin, "%Y-%m-%d") AS 'date_begin', DATE_FORMAT(date_end, "%Y-%m-%d") AS 'date_end', category_id, categories.name AS 'category'
                        FROM books
                        INNER JOIN categories ON books.category_id = categories.id
                        WHERE books.id = ${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                result
            });
        }

    });
}

exports.getAvailableBooks = (req, res, next) => {

    connect.query(`SELECT books.id, title, summary, author, year, isbn, cote, image, borrowed_by, DATE_FORMAT(date_begin, "%Y-%m-%d") AS 'date_begin', DATE_FORMAT(date_end, "%Y-%m-%d") AS 'date_end', category_id, categories.name AS 'category'
                    FROM books
                    INNER JOIN categories ON books.category_id = categories.id
                    WHERE borrowed_by = 0`
                    , (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error' : err
            });
        } else {
            return res.status(200).json({
                results
            });
        }
    });
}

exports.getBooksId = (req, res, next) => {

    connect.query(`SELECT id FROM books`, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            return res.status(200).json({
                results
            });
        }
    });
}

exports.getBooksByCategory = (req, res, next) => {

    const id = req.params.id;

    connect.query(`SELECT books.id, title, summary, author, year, isbn, cote, image, borrowed_by, DATE_FORMAT(date_begin, "%Y-%m-%d") AS 'date_begin', DATE_FORMAT(date_end, "%Y-%m-%d") AS 'date_end', categories.name AS 'category'
                    FROM books
                    INNER JOIN categories ON books.category_id = categories.id
                    WHERE category_id = "${id}"`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            return res.status(200).json({
                result
            });
        }
    });
}

exports.getBooksRecommandationsByCategory = (req, res, next) => {

    const id = req.params.id;

    const query = `select books.id, is_borrowed, categories.name AS 'category' from books inner join categories on books.category_id = categories.id where category_id = ${id} and is_borrowed = 0 limit 12`

    connect.query(query, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            return res.status(200).json({
                result
            });
        }
    });
}


exports.addBook = (req, res, next) => {
    let book = req.body;

    connect.query(`INSERT INTO books (title, summary, author, year, isbn, cote, image, borrowed_by, date_begin, date_end, category_id, is_borrowed)
                    VALUES ("${book.title}", "${book.summary}", "${book.author}", "${book.year}", "${book.isbn}", "${book.cote}", "${book.image}", "${book.borrowed_by}", "${book.date_begin}", "${book.date_end}", "${book.category_id}", "${book.is_borrowed}")`, (err, result) => {

        if (err) {
            return res.status(500).json({
                'Error': err
            });
        } else {
            return res.status(201).json({
                'QueryOK': 'Book created successfully',
                result
            });
        }

    });
}

exports.editBook = (req, res, next) => {
    let id = req.params.id;
    let reqBody = req.body;

    connect.query(`SELECT *
                    FROM books
                    WHERE id = ${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            if (result.length > 0) {

                connect.query(`UPDATE books
                                SET title = "${reqBody.title}",
                                summary = "${reqBody.summary}",
                                author = "${reqBody.author}",
                                year =  "${reqBody.year}",
                                isbn = "${reqBody.isbn}",
                                cote = "${reqBody.cote}",
                                image = "${reqBody.image}",
                                borrowed_by = "${reqBody.borrowed_by}",
                                date_begin = "${reqBody.date_begin}",
                                date_end = "${reqBody.date_end}",
                                category_id = "${reqBody.category_id}"
                                WHERE id = ${id}`, (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            'Error': err
                        });
                    } else {

                        return res.status(201).json({
                            'QueryOK': 'Book edited successfully'
                        });
                    }

                });
            } else {
                return res.status(404).json({
                    'Error': 'Cannot find this book'
                });
            }
        }
    })
}

exports.updateBook = (req, res, next) => {
    let id = req.params.id;
    let reqBody = req.body;

    connect.query(`SELECT *
                    FROM books
                    WHERE id = ${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            if (result.length > 0) {

                connect.query(`UPDATE books
                                SET borrowed_by = "${reqBody.borrowed_by}",
                                date_begin = "${reqBody.date_begin}",
                                date_end = "${reqBody.date_end}",
                                is_borrowed = ${reqBody.is_borrowed}
                                WHERE id = ${id}`, (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            'Error': err
                        });
                    } else {
                        return res.status(201).json({
                            'QueryOK': 'Book updated successfully'
                        });
                    }

                });

            } else {
                return res.status(404).json({
                    'Error': 'Cannot find this book'
                });
            }

        }

    });


}

exports.deleteBook = (req, res, next) => {
    let id = req.params.id;

    connect.query(`DELETE FROM books WHERE id = ${id}`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            return res.status(200).json({ 'QueryOK': `Book deleted successfully`});
        }
    });
}

//R-Slane l'apprenti-sorcier

exports.getRetards = (req, res, next) => {

        connect.query(` SELECT
                          id,
                          DATEDIFF(CURDATE(), date_end) AS jours_de_retard,
                          borrowed_by
                        FROM jag.books
                        WHERE is_borrowed=1
                        AND date_end < CURDATE()
                        ORDER BY jours_de_retard DESC
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}

exports.getAverageRetards = (req, res, next) => {

        connect.query(` SELECT
                        avg(DATEDIFF(CURDATE(), date_end)) AS moyenne
                        FROM jag.books
                        WHERE is_borrowed=1
                        AND date_end < CURDATE()
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}

exports.getCountRetards = (req, res, next) => {

        connect.query(` SELECT
                        COUNT(id) AS nombre
                        FROM jag.books
                        WHERE is_borrowed=1
                        AND date_end < CURDATE()
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}

exports.getCountRetardsById = (req, res, next) => {
  let userid = req.params.userid;
        connect.query(`SELECT
                        *
                        FROM jag.books
                        WHERE is_borrowed=1
                        AND date_end < CURDATE()
                        AND borrowed_by = ${userid}
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}

exports.getLibraryCount = (req, res, next) => {

        connect.query(` SELECT
                        COUNT(id) AS nombre
                        FROM jag.books;
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}

exports.getBorrowCount = (req, res, next) => {

        connect.query(` SELECT
                        COUNT(id) AS nombre
                        FROM jag.books
                        WHERE is_borrowed = 1
                        ;
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}

exports.getAuthorCount = (req, res, next) => {

        connect.query(` SELECT
                        COUNT(DISTINCT(author)) AS nombre
                        FROM jag.books
                        ;
                          `, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            return res.status(200).json({
                results
            });
        }

    });
}
