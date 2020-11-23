require ('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('build'))
app.use(cors())
app.use(express.json())




morgan.token('body', function (req, res) { return JSON.stringify(req.body) })



app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



/*
let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323523"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Mary Poppendieck",
      number: "39-23-6423122"
    },
    {
      id: 5,
      name: "Gary Poppendieck",
      number: "39-23-6423122"
    }
  ]
*/

let persons = []

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

console.log(persons)

app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id).then(person => {

		res.json(person)
	})
		.catch(error => next(error))
})




app.post('/api/persons', (req, res, next) => {
	const body = req.body

	const person = new Person({
		id: Math.floor(Math.random() * 10000),
		name: body.name,
		number: body.number
	})

	person
		.save()
		.then(savedPerson => {
			res.json(savedPerson)
		})
		.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const body = request.body
	const person = {
		name: body.name,
		number: body.number
	}

	Person.findByIdAndUpdate(request.params.id, person, { new: true })
		.then(updatedPerson => {
			response.json(updatedPerson)
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})


app.get('/info', (req, res) => {
	Person.countDocuments({})
		.then((count) => {
			const message =
          `<p>This phonebook has the information of ${count} people.</p>` +
                    `<p>${new Date()}</p>`
			res.send(message)
		})
})

const errorHandler = (error, req, res, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted id' })
	}
	next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
