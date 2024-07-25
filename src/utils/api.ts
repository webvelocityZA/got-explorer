import axios from 'axios'
import { Character, House } from '../models/models'

const API_BASE_URL = 'https://anapioficeandfire.com/api'

export const fetchCharacter = async (id: string): Promise<Character> => {
  const response = await axios.get(`${API_BASE_URL}/characters/${id}`)
  return response.data
}

export const fetchHouse = async (id: string): Promise<House> => {
  const response = await axios.get(`${API_BASE_URL}/houses/${id}`)
  return response.data
}