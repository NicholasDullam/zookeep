import axios from 'axios'

const connection = axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? `${process.env.PUBLIC_URL}/api` : 'http://localhost:8000/api',
	withCredentials: true 
})

// animal routes
const createAnimal = (payload) => connection.post('/animals', payload)
const getAnimals = (req) => connection.get('/animals', req)
const updateAnimalById = (animal_id, payload) => connection.put(`/animals/${animal_id}`, payload)
const deleteAnimalById = (animal_id) => connection.delete(`/animals/${animal_id}`)

// enclosure routes
const createEnclosure = (payload) => connection.post('/enclosures', payload)
const getEnclosures = (req) => connection.get('/enclosures', req)
const updateEnclosureById = (enclosure_id, payload) => connection.put(`/enclosures/${enclosure_id}`, payload)
const deleteEnclosureById = (enclosure_id) => connection.delete(`/enclosures/${enclosure_id}`)

// zoo routes
const createZoo = (payload) => connection.post('/zoos', payload)
const getZoos = (req) => connection.get('/zoos', req)
const updateZooById = (zoo_id, payload) => connection.put(`/zoos/${zoo_id}`, payload)
const deleteZooById = (zoo_id) => connection.delete(`/zoos/${zoo_id}`)

// user routes
const createUser = (payload) => connection.post('/users', payload)
const getUsers = (req) => connection.get('/users', req)
const updateUserById = (user_id, payload) => connection.put(`/users/${user_id}`, payload)
const deleteUserById = (user_id) => connection.delete(`/users/${user_id}`)

// health routes
const createHealth = (payload) => connection.post('/health', payload)
const getHealth = (req) => connection.get('/health', req)

// appointment routes
const createAppointment = (payload) => connection.post('/appointments', payload)
const getAppointments = (req) => connection.get('/appointments', req)
const updateAppointmentById = (appointment_id, payload) => connection.put(`/appointments/${appointment_id}`, payload)
const deleteAppointmentById = (appointment_id) => connection.delete(`/appointments/${appointment_id}`)

// action routes
const getActions = (req) => connection.get('/actions', req)
const createAction = (payload) => connection.post('/actions', payload)
const updateActionById = (action_id, payload) => connection.put(`/actions/${action_id}`, payload)
const deleteActionById = (action_id) => connection.delete(`/actions/${action_id}`)

let api = {
    createAnimal,
    getAnimals,
    updateAnimalById,
    deleteAnimalById,
    createEnclosure,
    getEnclosures,
    updateEnclosureById,
    deleteEnclosureById,
    createZoo,
    getZoos,
    updateZooById,
    deleteZooById,
    createUser,
    getUsers,
    updateUserById,
    deleteUserById,
    getAppointments,
    createAppointment,
    updateAppointmentById,
    deleteAppointmentById,
    getActions,
    createAction,
    updateActionById,
    deleteActionById,
    createHealth,
    getHealth
}

export default api