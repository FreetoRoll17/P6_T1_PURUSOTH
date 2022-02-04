
//const jwt = require('jsonwebtoken')

const Sauce = require('../models/sauces');


exports.addSauces = (req, res, next) => {
    //console.log('ajouter une saute')
    //delete req.body._id;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error, message : "impossible d'enregistré sauce" }));
};
   