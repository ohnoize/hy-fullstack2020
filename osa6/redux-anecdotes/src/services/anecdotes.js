import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {

  const blogToUpdate = await axios.get(`${baseUrl}/${id}`)
  const toObject = blogToUpdate.data
  const newObject = {
    ...toObject,
    votes: toObject.votes + 1
  }
  console.log(newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

export default { getAll, createNew, update }
