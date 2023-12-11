const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const user = require('../models/User.js');

let db = require("../database/models");

const controller = {
    register: (req, res) => {
        res.render('register');
    },
    postRegister: (req, res) => {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = db.Users.findOne({
            where: {
                email: req.body.email
            }
        }).then(() => {
            if (userInDB) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: '❌ Usuario ya registrado!'
                        }
                    },
                    oldData: req.body
                });
            }
        })

        delete req.body.passwordRepeat;
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            avatar: req.file.filename
        }
        let userCreated = db.Users.create(userToCreate)

        return res.redirect('/login')
    },
    login: (req, res) => {
        return res.render('login');
    },
    postLogin: (req, res) => {

        let userToLogin = db.Users.findOne({
            where: {
                email: req.body.email
            }
        }).then((data) => {
            if (data) {
                let uncryptedPass = bcryptjs.compare(req.body.password, data.password)

                if (uncryptedPass) {
                    delete data.password
                    req.session.userLogged = userToLogin;
                    if (req.body.remeber_user) {
                        res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 120 })
                    }
                    res.redirect('profile')
                }

                return res.render('login', {
                    errors: {
                        password: {
                            msg: 'Contraseña Incorrecta!'
                        }
                    }
                });
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Usuario no encontrado!'
                    }
                }
            });
        })


    },
    profile: (req, res) => {
        return res.render('profile', { user: req.session.userLogged })
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;