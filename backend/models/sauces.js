const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const saucesSchema = mongoose.Schema({
 
  userId : {type: String, required: true},
  name : {type: String, required: true},
  manufacturer : {type: String, required: true},
  description : {type: String, required: true},
  mainPepper : {type: String, required: true},
  imageUrl : {type: String, required: true},
  heat : {type: Number, required: true},
  likes : {type: Number, required: true},
  dislikes : {type: Number, required: true},
  usersLiked : {type: Array, required: true},
  usersDisliked : {type: Array, required: true},



/*userId : String — l'identifiant MongoDB unique de l'utilisateur qui a cr   la
sauce
● name : String — nom de la sauce
● manufacturer : String — fabricant de la sauce
● description : String — description de la sauce
● mainPepper : String — le principal ingr dient  pic  de la sauce
● imageUrl : String — l'URL de l'image de la sauce t l charg e par l'utilisateur
● heat : Number — nombre entre 1 et 10 d crivant la sauce
● likes : Number — nombre d'utilisateurs qui aiment (= likent) la sauce
● dislikes : Number — nombre d'utilisateurs qui n'aiment pas (= dislike) la
sauce
● usersLiked : [ "String <userId>" ] — tableau des identifiants des utilisateurs
qui ont aim  (= liked) la sauce
● usersDisliked : [ "String <userId>" ] — tableau des identifiants des
utilisateurs qui n'ont pas aim  (= disliked) la sauce*/
});


module.exports = mongoose.model('Sauce', saucesSchema);