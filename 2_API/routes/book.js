const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/book");
const auth = require('../middleware/auth');


router.get('/', bookCtrl.getBooks);
router.get('/available', bookCtrl.getAvailableBooks);
router.get('/all', bookCtrl.getBooksId);
router.get('/category/:id', bookCtrl.getBooksByCategory);
router.get('/recommandations/:id', bookCtrl.getBooksRecommandationsByCategory);

router.get('/:id', bookCtrl.getBook);
router.post('/search', bookCtrl.searchBook);
router.post('/searchbis', bookCtrl.searchBookbis);

router.post('/', auth, bookCtrl.addBook);
router.put('/:id', auth, bookCtrl.editBook);
router.put('/update/:id', auth, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

//R-Slane l'apprenti-sorcier
router.get('/stats/library/count', auth, bookCtrl.getLibraryCount);
router.get('/stats/library/author/count', auth, bookCtrl.getAuthorCount);
router.get('/stats/library/emprunt/count', auth, bookCtrl.getBorrowCount);

router.get('/retard/all', auth, bookCtrl.getRetards);
router.get('/retard/nombre/:userid', auth, bookCtrl.getCountRetardsById);
router.get('/retard/moyenne', auth, bookCtrl.getAverageRetards);
router.get('/retard/nombre', auth, bookCtrl.getCountRetards);

module.exports = router;
