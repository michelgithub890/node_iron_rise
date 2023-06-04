import assert from 'assert'
import Book from '../models/books.js'

describe('Création de livre', () => {
    it("Sauvegarde d'un livre", () => {
        const book1 = new Book({ title: "Harry Potter" })
        book1.save()
    })
})