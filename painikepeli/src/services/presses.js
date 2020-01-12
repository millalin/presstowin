import axios from 'axios'
//const baseUrl = 'https://press-to-win.herokuapp.com/api/presses'
const baseUrl = 'http://localhost:3001/api/presses'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const response = await axios.post(baseUrl, newObject) 
  return response.data
}

const update =  newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }