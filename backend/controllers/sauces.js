
//const jwt = require('jsonwebtoken')

const Sauce = require('../models/sauces');

// voir les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error: error }))
}

// créer sauce
exports.createSauces = (req, res, next) => {
    //console.log('ajouter une sauce')
    const sauceObject = JSON.parse(req.body.sauce)
    //delete sauceObject._id
    var body = req.body
    delete body._id
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error, message : "impossible d'enregistré sauce" }));
};

//Modifier sauce
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body }
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
        .catch(error => res.status(400).json({ error }))
}

// Afficher sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }))
}


// supprimer sauce
exports.deleteSauce = (req, res, next) => {
    //console.log('sauce supp')
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

// Like dislike
/*exports.like = (req, res, next) => {
  
    let like = req.body.like;
    console.log(like);
    if (like == 1) {
        console.log('utilisateur aime la sauce')
        
        //récupérer tous les utilisaters qui aiment la sauce
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                // ajouter l'Id de l'utilisateur en cours au tableau usersliked de la sauce en édition
                let usersLiked = sauce.usersLiked
                usersLiked.push(req.body.userId)
                
                // ajouter 1 à la propriété likes de la sauce


                // mettre à jour la sauce dans la BD avec les nouvelles informations 
                Sauce.updateOne({ _id: req.params.id }, {likes: 10, usersLiked: usersLiked, _id: req.params.id}) 
                    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
                    .catch(error => res.status(400).json({ error }))
           
    
    })
            .catch(error => res.status(404).json({ error: error }))

        
        
    

    } else if (like == -1) {
        console.log('utilisateur aime pasla sauce')
    } else if (like == 0) {
        console.log('utilisateur annule son like ou son dislike')
    } else {
        console.log('error 404')
    }

}
*/
