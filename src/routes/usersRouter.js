const express = require('express');
const router = express.Router();
const path = require('path');
const controller = require('../controllers/users');

const validation = require('../middlewares/guestMiddleware');
const authValidation = require('../middlewares/authMiddleware');
const { check } = require('express-validator');

const multer = require('multer');

const validaciones = [
    check('fullName').notEmpty().withMessage('❌ Tienes que escribir tu nombre!'),
    check('email').notEmpty().withMessage('❌ Tienes que escribir un email válido!'),
    check('password').notEmpty().withMessage('❌ Tienes que escribir una contraseña!'),
    check('passwordRepeat').notEmpty().withMessage('❌ Tienes que repetir la contraseña!'),
    check('passwordRepeat').custom(async (confirmPassword, { req }) => {
        const password = req.body.password

        // Si las contraseñas no coinciden:
        if (password !== confirmPassword) {
            throw new Error('❌ Las contraseñas no coinciden!')
        }
    }),
    check('avatar').custom((valuae, { req }) => {
        let file = req.file;
        let extensions = ['.jpg', '.png', '.gif'];
        

        if (!file) {
            throw new Error("Tienes que subir una imagen!")
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!extensions.includes(fileExtension)) {
                throw new Error("Extensión de archivo inválida.");
            }
        }
        return true;
    })
]

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/users/avatars')
    },
    filename: (req, file, cb) => {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, filename);
    }
});

const uploadFile = multer({ storage })

/*---------------LOGIN-----------------*/
router.get('/login',validation, controller.login);
router.post('/login', controller.postLogin);
/*----------------REGISTER----------------*/
router.post('/register', uploadFile.single('avatar'), validaciones, controller.postRegister);
router.get('/register',validation, controller.register);
/*------------------PROFILE--------------------*/
router.get('/profile',authValidation, controller.profile);
/*------------------LOGOUT--------------------*/
router.get('/logout', controller.logout);

module.exports = router;