/* DATABASE INIT */
DROP DATABASE IF EXISTS `jag`;

CREATE DATABASE `jag`;
USE `jag`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `card_id` varchar(255) NOT NULL,                      
    `firstname` varchar(255) NOT NULL,
    `lastname` varchar(255) NOT NULL,
    `birthday` date NOT NULL,
    `sexe` varchar(1) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `avatar` MEDIUMBLOB,
    `isAdmin` tinyint(1) NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `books` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `summary` varchar(255) NOT NULL,
    `author` varchar(255) NOT NULL,
    `year` int(11) DEFAULT '0',
    `isbn` varchar(255) NOT NULL,
    `cote` varchar(255) NOT NULL,
    `image` MEDIUMBLOB,
    `is_borrowed` tinyint(1) NOT NULL DEFAULT '0', 
    `borrowed_by` varchar(255) NOT NULL DEFAULT '0',
    `date_begin` date DEFAULT '1000-01-01',
    `date_end` date DEFAULT '1000-01-01',
    `category_id` int(11) NOT NULL,


    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `categories` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,

    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



/* --- TABLES --- */


/* Users */

INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin) 
VALUES ('80238594', 'Jean', 'Peuplu', '1995-03-30', 'm', 'jean@mail.com', '$2b$10$xS7zy4j4m0tQqbrbRbnDFOr1LJuPV4lbRiKhYOgEx6sBSXvjlwiIa', null, 1);

INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin) 
VALUES ('45084378', 'John', 'Atan', '1989-01-31', 'm', 'john@mail.com', '$2b$10$UO32x.8HIb74wqiTHJcYLOVzINqEaJKB3LbEGTXC8hPfwjye5t1Vu', null, 0);

INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin) 
VALUES ('34328934', 'Vincent', 'Tim', '1993-06-05', 'm', 'vincent@mail.com', '$2b$10$5sRuRK6OKywQnHDUVosK2OZbHP8yRn8BwggS1moWoGfsB/5IkKs/2', null, 0);

INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin) 
VALUES ('57934203', 'Canard', 'Tissho', '1996-07-17', 'f', 'canard@mail.com', '$2b$10$.pHAV4jbGeY4oDgEcbbr7O6ohWTEPELyY.QP9jWqHMxN1oyaLwNom', null, 0);

INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin) 
VALUES ('75402383', 'Pierre', 'Caillou', '2000-09-11', 'm', 'pierre@mail.com', '$2b$10$qAf8zTEhvBlC5xz0O4tATuAOseP360O/1nsorH19i3E0qKJw0Y5Je', null, 0);

INSERT INTO users (card_id, firstname, lastname, birthday, sexe, email, password, avatar, isAdmin) 
VALUES ('65438294', 'Paula', 'Roïde', '1999-04-12', 'f', 'paula@mail.com', '$2b$10$EmJG7ZL.5MyBhW/ko5pei.XdJ4t7gT26B9wqTBpTIFyVTogSeNIRe', null, 0);


/* Books */

INSERT INTO books (title, summary, author, year, isbn, cote, image, is_borrowed, borrowed_by, date_begin, date_end, category_id) 
VALUES ('Babar au pays des kangourous', "C'est l'histoire d'un éléphant qui voyage en Australie quand tout à coup...", 'R-S Lane', 1970, '3945-0493-30', '1-332-BA', null, 0, '0', '1000-01-01', '1000-01-01', 1);

INSERT INTO books (title, summary, author, year, isbn, cote, image, is_borrowed, borrowed_by, date_begin, date_end, category_id) 
VALUES ("Popi et l'ardoise magique", "Popi aime dessiner sur son ardoise, quand tout à coup...", 'Gaby Jobersky', 1999, '5445-293-430', '3-948-PO', null, 1, '57934203', '2020/12/08', '2020/12/01', 3);

INSERT INTO books (title, summary, author, year, isbn, cote, image, is_borrowed, borrowed_by, date_begin, date_end, category_id) 
VALUES ("L'homme et le canard", "Une enquête palpitante au sein de DuckCity afin de retrouver l'assassin du grand duc du Trou", 'JaDona', 2017, '545-794-095', '2-048-CA', null, 1, '57934203', '2020/12/08', '2020/12/01', 3);

INSERT INTO books (title, summary, author, year, isbn, cote, image, is_borrowed, borrowed_by, date_begin, date_end, category_id) 
VALUES ("Test 2", "Une enquête palpitante au sein de DuckCity afin de retrouver l'assassin du grand duc du Trou", 'JaDona', 2017, '545-794-095', '2-048-CA', null, 0, '0', '1000-01-01', '1000-01-01', 3);

INSERT INTO books (title, summary, author, year, isbn, cote, image, is_borrowed, borrowed_by, date_begin, date_end, category_id) 
VALUES ("Test 3", "Une enquête palpitante au sein de DuckCity afin de retrouver l'assassin du grand duc du Trou", 'JaDona', 2017, '545-794-095', '2-048-CA', null, 0, '0', '1000-01-01', '1000-01-01', 3);


/* Categories */

INSERT INTO categories (name)
VALUES ('Aventure');

INSERT INTO categories (name)
VALUES ('Romance');

INSERT INTO categories (name)
VALUES ('Thriller');

INSERT INTO categories (name)
VALUES ('Polar');

INSERT INTO categories (name)
VALUES ('Jeunesse');