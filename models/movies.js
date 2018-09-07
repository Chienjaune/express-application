const Mongoose = require('mongoose');
let Schema=Mongoose.Schema;


let schema = new Schema({
    fields:{
        directors:[String],
        release_date:String,
        // min et max = 2 options de validation possibles pour un number
        rating:{
            type:Number,
            min:0,
            max:10
        },
        genres:[String],
        image_url:{
            type:String,
            match:/.jpg|.png|.gif$/i //Validation par expression régulière (Regex)
        },
        plot:{
            type:String,
            minLength:0,
            maxLength:64,
        },
        title:{
            type:String,
           // required:true // Validation avec erreur 
              required:'Le champ title est obligatoire' //Mongoose comprend qu'il faut valider et récupérer un titre
        },
        // validation uniquement sur save et create
        //pour une validation sue update, ajouter une option {runValidators:true}
        //Déclencher une validation sur un objet Mongoose déclenche aussi une validation sur les sous-documents
        rank:{
            type:Number,
            // validateur custom
            validate:{
                validator:function(value){
                    return value<20;
                }
            },
            message:'le champ n/a pas été complété correctement'
        },
        running_time_secs:Number,
        actors:[String],
        year:Number,
        production:{ // création d'un sous-document
            company:String,
            director:String,
        },
        /*production:Mongoose.SchemaType.objectId, //Type spécifique à Mongoose
        ref:'productions'*/
    },
    id:String,
    type:String,

});
module.exports=Mongoose.model('Movie',schema);
