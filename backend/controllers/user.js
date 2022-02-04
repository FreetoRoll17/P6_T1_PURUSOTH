const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../models/user');


exports.signup = (req, res, next) => {
    console.log('methode signup ok')
    bcrypt.hash(req.body.password, 15)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({
                    message: 'utilisateur crée'
                }))
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }))
};

exports.login = (req, res, next) => {
    console.log("okokok")
    User.findOne({
            email: req.body.email
        })
        .then(user => {
            
            if (!user) {
                console.log('utilisateur non trouvé')
                res.status(401).json({
                    error: "utilisateur non trouvé"
                })
            }
            else {
                console.log('utilisateur trouvé')
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log('mdp invalide')
                        res.status(401).json({
                            error: "Mot de passe incorrect"
                        })
                    }
                    else {
                        console.log('mdp valide')
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                                userId: user._id
                            },
                            'RANDOM-TOKEN-SECRET', {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    error
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
}