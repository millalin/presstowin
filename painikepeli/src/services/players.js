
import axios from 'axios'
const baseUrl = 'https://presstowin.herokuapp.com/api/players'
//const baseUrl = 'http://localhost:3001/api/players'

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