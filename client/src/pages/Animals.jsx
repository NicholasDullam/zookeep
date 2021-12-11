import React, { useState, useEffect, useContext } from 'react';
import { ActionModal, Page, Button } from '../components'
import { TextField, Select, MenuItem, CircularProgress, TableContainer, TableHead, TableCell, TableRow, Table, InputLabel, FormControl } from '@mui/material'
import api from '../api';
import AuthContext from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AnimalViewModal = props => {
    const [enclosure, setEnclosure] = useState(null)
    
    useEffect(() => {
        if (!props.animal) return
        api.getEnclosures({ params: { _id: props.animal.enclosure_id } }).then((response) => {
            if (response.data.data.length) setEnclosure(response.data.data[0])
        }).catch((error) => {
            console.log(error)
        })
    }, [props.animal])

    return (
        <ActionModal open={props.open} title={` ${props.animal ? props.animal.name : 'name'}`} handleClose={props.handleClose}>
            { props.animal ? <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={props.animal.image_url} style={{ height: '80px', width: '80px',borderRadius: '50%', objectFit: 'cover' }}/>
                </div>
                <h3> Attributes </h3>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        Enclosure: { enclosure ? enclosure.name : null }
                    </div>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        Name: {props.animal.name}
                    </div>
                    <div style={{ width: '100%' }}>
                        Species: {props.animal.species}
                    </div>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        Food Type: {props.animal.food_type}
                    </div>
                    <h3>Health Data</h3>
                </div>
            </div> : null }
        </ActionModal>
    )
}

const AnimalUpdateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [enclosure_id, setEnclosureId] = useState('')
    const [species, setSpecies] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [food_type, setFoodType] = useState('')
    const [enclosures, setEnclosures] = useState([])

    useEffect(() => {
        let { animal } = props
        if (!animal) return
        setName(animal.name)
        setSpecies(animal.species)
        setImageUrl(animal.image_url)
        setFoodType(animal.food_type)
        setEnclosureId(animal.enclosure_id)
    }, [props.animal])

    useEffect(() => {
        api.getEnclosures(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setEnclosures(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleUpdate = () => {
        setLoading(true)
        api.updateAnimalById(props.animal._id, { name, enclosure_id, species, image_url, food_type }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={`Update ${props.animal ? props.animal.name : 'name'}`} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Enclosure</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Enclosure" value={enclosure_id} onChange={(e) => setEnclosureId(e.target.value)}>
                            {
                                enclosures.map((enclosure, i) => {
                                    return (
                                        <MenuItem key={i} value={enclosure._id}> {enclosure.name} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField label="Species" variant="outlined" sx={{ width: '100%' }} value={species} onChange={(e) => setSpecies(e.target.value)}/>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Food Type" variant="outlined" sx={{ width: '100%' }} value={food_type} onChange={(e) => setFoodType(e.target.value)}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField label="Image URL" variant="outlined" sx={{ width: '100%' }} value={image_url} onChange={(e) => setImageUrl(e.target.value)}/>
                    </div>
                </div>
                <Button label={'Update'} loading={loading} onClick={handleUpdate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const AnimalCreateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [enclosure_id, setEnclosureId] = useState('')
    const [species, setSpecies] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [food_type, setFoodType] = useState('')
    const [enclosures, setEnclosures] = useState([])

    useEffect(() => {
        api.getEnclosures(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setEnclosures(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleCreate = () => {
        setLoading(true)
        api.createAnimal({ name, enclosure_id, species, image_url, food_type }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={'Create an Animal'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Enclosure</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Enclosure" value={enclosure_id} onChange={(e) => setEnclosureId(e.target.value)}>
                            {
                                enclosures.map((enclosure, i) => {
                                    return (
                                        <MenuItem key={i} value={enclosure._id}> {enclosure.name} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField label="Species" variant="outlined" sx={{ width: '100%' }} value={species} onChange={(e) => setSpecies(e.target.value)}/>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Food Type" variant="outlined" sx={{ width: '100%' }} value={food_type} onChange={(e) => setFoodType(e.target.value)}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField label="Image URL" variant="outlined" sx={{ width: '100%' }} value={image_url} onChange={(e) => setImageUrl(e.target.value)}/>
                    </div>
                </div>
                <Button label={'Create'} loading={loading} onClick={handleCreate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const Animals = props => {
    const auth = useContext(AuthContext)

    const [createOpen, setCreateOpen] = useState(false)

    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateAnimal, setUpdateAnimal] = useState(null)

    const [animals, setAnimals] = useState([])
    const [loading, setLoading] = useState(false)

    const [viewOpen, setViewOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.getAnimals(auth.zooId ? { params: { 'enclosure.zoo_id' : auth.zooId }} : {}).then((response) => {
            setLoading(false)
            setAnimals(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])

    const handleCreateSuccess = (animal) => {
        setCreateOpen(false)
        setAnimals([animal, ...animals])
    }

    const handleUpdateStart = (event, animal) => {
        event.stopPropagation()
        setUpdateOpen(true)
        setUpdateAnimal(animal)
    }
    const handleViewOpen = (animal) => {
        setViewOpen(true)
        setUpdateAnimal(animal)
    }

    const handleUpdateSuccess = (animal) => {
        setUpdateOpen(false)
        let newAnimals = [...animals], newAnimal = newAnimals.findIndex((oldAnimal) => oldAnimal._id === animal._id)
        newAnimals[newAnimal] = animal
        setAnimals(newAnimals)
    }

    const handleDelete = (event, animal_id) => {
        event.stopPropagation()
        api.deleteAnimalById(animal_id).then((response) => {
            setAnimals([...animals.filter((animal) => animal._id !== response.data._id)])
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <Page name={'Animals'}>
            <div style={{ display: 'flex' }}>
                <p style={{ textAlign: 'left', color: 'blue', marginTop: '10px', cursor: 'pointer' }} onClick={() => setCreateOpen(true)}> + Create </p>
            </div>

            <AnimalCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            <AnimalUpdateModal open={updateOpen} animal={updateAnimal} handleClose={() => setUpdateOpen(false)} handleSuccess={handleUpdateSuccess}/>
            <AnimalViewModal open={viewOpen} animal={updateAnimal} handleClose={()=>setViewOpen(false)} />
            { loading ? <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={30}/>
            </div> : <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Image URL </TableCell>
                                <TableCell> ID </TableCell>
                                <TableCell> Enclosure_ID </TableCell>
                                <TableCell> Name </TableCell>
                                <TableCell> Species </TableCell>
                                <TableCell> Food Type </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            animals.map((animal, i) => {
                                return (
                                    <TableRow key={i} sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleViewOpen(animal)}>
                                        <TableCell> <img src={animal.image_url} style={{ height: '30px', width: '30px', borderRadius: '50%', cursor: 'pointer'}}/> </TableCell>
                                        <TableCell> {animal._id} </TableCell>
                                        <TableCell> {animal.enclosure_id} </TableCell>
                                        <TableCell> {animal.name} </TableCell>
                                        <TableCell> {animal.species} </TableCell>
                                        <TableCell> {animal.food_type} </TableCell>
                                        <div style={{ display: 'flex', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)'}}>
                                            <EditIcon style={{ marginRight: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={(event) => handleUpdateStart(event, animal)}/>
                                            <DeleteIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={(event) => handleDelete(event, animal._id)}/>
                                        </div>
                                    </TableRow>                                
                                )
                            })
                        }
                    </Table>
                </TableContainer>
            </div> }
        </Page>
    )
}

export default Animals;