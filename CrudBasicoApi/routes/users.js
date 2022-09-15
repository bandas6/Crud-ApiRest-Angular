const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/',[
    validarCampos
],getUsers);

router.post('/',postUsers);

router.put('/:id',putUsers);

router.delete('/:id',deleteUsers);




module.exports = router;