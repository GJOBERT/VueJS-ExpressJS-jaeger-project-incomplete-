const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require('../middleware/auth');

router.get('/', auth, userCtrl.getUsers);
router.get('/all', userCtrl.getUsersId);
router.get('/:id', auth, userCtrl.getUser);
router.get('/edit/:id', auth, userCtrl.getUserEdit);
router.get('/borrow/:id', auth, userCtrl.getUserBorrowRights);
router.get('/getbooks/:id', auth, userCtrl.getBooks);
router.post('/', auth, userCtrl.createUser);
router.post('/login', userCtrl.login);
router.post('/search', auth, userCtrl.searchUser);
router.put('/:id', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);

//R-Slane l'apprenti sorcier
router.post('/check/mail', auth, userCtrl.checkMail);
router.get('/stats/count', auth, userCtrl.getUsersCount);
router.get('/stats/emprunteurs/countSimple', auth, userCtrl.getEmprunteursCountSimple);

module.exports = router;
