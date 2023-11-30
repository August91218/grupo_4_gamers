const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const user = require('../models/User.js');

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

        let userInDB = user.findByField('email', req.body.email);

        if(userInDB) {
            return res.render('register', {
                errors: {
                    email:{
                        msg: '❌ Usuario ya registrado!'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            passwordRepeat: this.password,
            avatar: req.file.filename
        }
        let userCreated = user.create(userToCreate);

        return res.redirect('/login')
    },
    login: (req, res) => {
        return res.render('login');
    },
    postLogin: (req, res) => {
        let userToLogin = user.findByField('email', req.body.email);
        
        if(userToLogin) {
            let uncryptedPass = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if(uncryptedPass){
                delete userToLogin.password
                req.session.userLogged = userToLogin;
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
    },
    profile: (req, res) => {
        return res.render('profile', {user: req.session.userLogged})
    },
    logout: (req,res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;