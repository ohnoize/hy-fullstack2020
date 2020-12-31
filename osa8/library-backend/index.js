const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const mongoose = require('mongoose')
const { v1: uuid } = require('uuid')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/User')
const jwt = require('jsonwebtoken')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack1234@cluster0.soglv.mongodb.net/kirjasto?retryWrites=true&w=majority'
const SECRET_KEY = 'SECRET KEY INDEED'

console.log('Connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allUsers: [User!]!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation{
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books =  await Book.find({}).populate('author', { name: 1, born: 1, bookCount: 1 })
      
      if (args.author && args.genre) {
        return books.filter(b => b.author === args.author)
                    .filter(b => b.genres.includes(args.genre))
      } if (args.author) {
        return books.filter(b => b.author === args.author)
      } if (args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      } else 
      
      return books
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      console.log(authors)
      return authors
    },
    allUsers: (root, args) => {
      return User.find({})
    },
    me: (root, args, context) => {
      console.log(context.currentUser)
      return context.currentUser
    }
    
  },


  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author })
      
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated')
      }

      if (author === null) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      console.log(author)
      const book = await new Book({ ...args, author })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      author.bookCount = author.bookCount + 1
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }


      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        user: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, SECRET_KEY) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }

}



const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), SECRET_KEY
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})