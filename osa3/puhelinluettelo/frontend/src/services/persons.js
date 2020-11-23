import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data)
}

const addPerson = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}



const replaceNumber = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


const removePerson = id => axios.delete(baseUrl+`/${id}`)

export default { getPersons, addPerson, removePerson, replaceNumber }
