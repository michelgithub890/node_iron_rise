import mongoose from "mongoose"

mongoose.connect('mongodb://localhost/books_test', {
    userMongoClient:true
})

mongoose.connection
    .once('open', () => 
    {
        console.log('Connexion est établie')
    })
    .on("error",(error) => {
        console.warn('Erreur durant la connexion', error)
    })