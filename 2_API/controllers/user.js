const connect = require('../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.searchUser = (req, res, next) => {
    const search = req.body;

    connect.query(`SELECT * FROM users
                    WHERE card_id LIKE "%${search.card_id}%"
                    AND firstname LIKE "%${search.firstname}%"
                    AND lastname LIKE "%${search.lastname}%"
                    AND birthday LIKE "%${search.birthday}%"
                    AND sexe LIKE "%${search.sexe}%"
                    AND email LIKE "%${search.email}%"
                    AND isAdmin LIKE "%${search.isAdmin}%"
                    ${search.orderby} ${search.col} ${search.order}`
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

exports.getUsers = (req, res, next) => {
    connect.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            if (result.length > 0) {
                const { password, ...user} = result[0];
                const users= [];
                result.forEach( r => {
                    const { password, ...user} = r;
                    users.push(user);
                });
                return res.status(200).json({
                    users
                });
            } else {
                return res.status(404).json({
                    result
                });
            }
        }
    });
}

exports.getUser = (req, res, next) => {
    let id = req.params.id;

    connect.query(`SELECT * FROM users WHERE card_id = "${id}"`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            if (result.length > 0) {
                const { password, ...user} = result[0];
                return res.status(200).json({
                    user
                });
            } else {
                return res.status(404).json({
                    result
                });
            }
        }
    });
}

exports.getUserEdit = (req, res, next) => {
    let id = req.params.id;

    connect.query(`SELECT * FROM users WHERE card_id = "${id}"`, (err, result) => {
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

exports.getUserBorrowRights = (req, res, next) => {
    let id = req.params.id;

    connect.query(`SELECT count(id) AS 'BookCounter' FROM books WHERE borrowed_by = "${id}"`, (err, result) => {
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


exports.getUsersId = (req, res, next) => {

    connect.query(`SELECT card_id FROM users`, (err, results) => {
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

exports.getBooks = (req, res, next) => {
    let id = req.params.id;

    connect.query(`SELECT books.id, borrowed_by, is_borrowed, category_id, DATE_FORMAT(date_begin, "%Y-%m-%d") AS 'date_begin', DATE_FORMAT(date_end, "%Y-%m-%d") AS 'date_end', categories.name AS 'category'
                    FROM books
                    INNER JOIN categories ON books.category_id = categories.id
                    WHERE borrowed_by = "${id}"`, (err, results) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            // var late_books = [];
            // var retard_counter = 0;
            // result.forEach(element => {
            //     let a = new Date(element.date_end);
            //     let b = new Date();
            //     let difference = Math.floor(a - b);
            //     let sign = Math.sign(difference);
            //     if (sign === -1) {
            //         retard_counter ++;
            //         late_books.push(element);
            //     }
            // });
            // var sliceBooks = [...result];

            // for (let l = 0; l < sliceBooks.length; l++) {
            //     sliceBooks[l] = sliceBooks[l].category_id;
            // }
            // for (let i = 0; i < sliceBooks.length; i++) {

            //     var min_index = i;

            //     for (let j = i + 1; j < sliceBooks.length; j++) {

            //         if (sliceBooks[j] < sliceBooks[min_index]) {
            //             min_index = j;
            //         }
            //     }
            //     if (sliceBooks[i] > sliceBooks[min_index]) {
            //         var c = sliceBooks[i];
            //         sliceBooks[i] = sliceBooks[min_index];
            //         sliceBooks[min_index] = c;
            //     }
            // }

            // var RecoArray = [];
            // for (let i = 1; i <= sliceBooks.length; i++) {
            //     if (sliceBooks[i] !== undefined) {
            //         if (sliceBooks[i] === sliceBooks[i-1]) {
            //            //
            //         } else {
            //             RecoArray.push(sliceBooks[i-1]);
            //         }
            //     } else {
            //         RecoArray.push(sliceBooks[i-1]);
            //     }
            // }
            return res.status(200).json({
                results
                //, RecoArray
                //,late_books, retard_counter
            });
        }
    });
}

exports.createUser = (req, res, next) => {
    let user = req.body;

    connect.query(`SELECT * FROM users WHERE email = "${user.email}"`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            if (result.length > 0) {
                return res.status(401).json({
                    'Unauthorized': 'This user already exists'
                })
            } else {

                bcrypt.hash(user.password, 10)
                .then(hash => {

                    user.password = hash

                    connect.query(`INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin)
                                    VALUES ('${user.card_id}', '${user.firstname}', '${user.lastname}', '${user.birthday}', '${user.sexe}', '${user.email}', '${user.password}', '${user.avatar}', '${user.isAdmin}')`, (err, result) => {

                        if (err) {
                            return res.status(500).json({
                                'Error': err
                            });
                        } else {
                            return res.status(201).json({
                                'QueryOK': 'User created successfully'
                            });
                        }

                    });
                })

            }

        }
    });

}

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    connect.query(`SELECT * FROM users WHERE email = "${email}"`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            if (result.length > 0) {
                let user = result[0];

                bcrypt.compare(password, user.password)
                .then( same => {
                    if (!same) {
                        return res.status(401).json({
                            'Unauthorized': "Passwords don't match"
                        });
                    }
                    return res.status(200).json({

                        userId: user.card_id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign({
                                userId: user.card_id,
                                isAdmin: user.isAdmin
                            },
                            process.env.SECRET_TOKEN,
                            {} // expiresIn: '1h'
                        ),
                    });
                })

            } else {
                return res.status(404).json({
                    'Error': 'Cannot find this user'
                });
            }
        }
    });


}

exports.updateUser = (req, res, next) => {
    let id = req.params.id;
    const reqBody = req.body;

    connect.query(`SELECT * FROM users WHERE card_id = "${id}"`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {

            if (result.length > 0) {

                let user = result[0];

                if (reqBody.password === user.password) {

                    if (user.email != reqBody.email) {
                        checkEmail(reqBody);
                    } else {
                        update(reqBody);
                    }

                } else {

                    bcrypt.hash(reqBody.password, 10)
                    .then(hash => {
                        reqBody.password = hash;
                        if (user.email != reqBody.email) {
                            checkEmail(reqBody);
                        } else {
                            update(reqBody);
                        }
                    })
                }

            } else {
                return res.status(404).json({
                    'Error': "This user doesn't exist"
                })
            }

        }
    });

    function checkEmail(reqBody) {
        connect.query(`SELECT * FROM users WHERE email = "${reqBody.email}"`, (err, result) => {
            if (err) {
                return res.status(404).json({
                    'Error': err
                });
            } else {

                if (result.length > 0) {
                    return res.status(401).json({
                        'Unauthorized': 'This user already exists'
                    });
                } else {
                    update(reqBody);
                }
            }

        });
    }

    function update(reqBody) {

        connect.query(`UPDATE users
                        SET card_id = '${reqBody.card_id}',
                        firstname = '${reqBody.firstname}',
                        lastname = '${reqBody.lastname}',
                        birthday =  '${reqBody.birthday}',
                        sexe = '${reqBody.sexe}',
                        email = '${reqBody.email}',
                        password = '${reqBody.password}',
                        avatar = '${reqBody.avatar}',
                        isAdmin = '${reqBody.isAdmin}'
                        WHERE card_id = "${id}"`, (err, result) => {

            if (err) {
                return res.status(500).json({
                    'Error': err
                });
            } else {
                return res.status(201).json({
                    'QueryOK': 'User updated successfully'
                });
            }

        });
    }

}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id;

    connect.query(`DELETE FROM users WHERE card_id = "${id}"`, (err, result) => {
        if (err) {
            return res.status(404).json({
                'Error': err
            });
        } else {
            return res.status(200).json({ 'QueryOK': `User deleted successfully`});
        }
    });

}

//R-Slane l'apprenti-sorcier
exports.getUsersCount = (req, res, next) => {
    connect.query(` SELECT
                    COUNT(id) AS nombre
                    FROM jag.users;`, (err, results) => {
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

exports.checkMail = (req, res, next) => {
    const search = req.body;

    connect.query(`SELECT * FROM users
                    WHERE email = "${search.email}"`
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

exports.getEmprunteursCountSimple = (req, res, next) => {
    connect.query(` SELECT
                    COUNT(id) AS nombre
                    FROM jag.users
                    WHERE isAdmin = '0';
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
