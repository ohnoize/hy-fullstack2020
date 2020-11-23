const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0.soglv.mongodb.net/luettelo?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false})

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length > 3) {
person.save().then(response => {
  console.log(`${person.name} ${person.number} added to the phonebook`)
  mongoose.connection.close()
})
} else {
  console.log("Phonebook")
  Person.find({}).then(response => {
    response.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
