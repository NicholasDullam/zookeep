import React, { useState, useEffect } from 'react';
import { ActionModal, Page, Button } from '../components'
import { TextField, Select, MenuItem, CircularProgress, TableContainer, TableHead, TableCell, TableRow, Table, InputLabel, FormControl } from '@mui/material'
import api from '../api';

const AnimalCreateModal = props => {
    const [name, setName] = useState('')
    const [enclosure_id, setEnclosureId] = useState('')
    const [species, setSpecies] = useState('')
    const [image_url, setImageUrl] = useState('')
    const [food_type, setFoodType] = useState('')
    const [enclosures, setEnclosures] = useState([])

    useEffect(() => {
        api.getEnclosures({}).then((response) => {
            console.log(response.data)
            setEnclosures(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const handleCreate = () => {
        api.createAnimal({ name, enclosure_id, species, image_url, food_type }).then((response) => {
            props.handleSuccess(response.data)
        }).catch((error) => {
            console.log(error)
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
                                enclosures.map((enclosure) => {
                                    return (
                                        <MenuItem value={enclosure._id}> {enclosure.name} </MenuItem>
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
                <Button label={'Create'} loading={false} onClick={handleCreate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const Animals = props => {
    const [createOpen, setCreateOpen] = useState(false)
    const [animals, setAnimals] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.getAnimals({}).then((response) => {
            setLoading(false)
            setAnimals(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [])

    const handleCreateSuccess = (animal) => {
        setCreateOpen(false)
        setAnimals([animal, ...animals])
    }
    
    return (
        <Page name={'Animals'}>
            <div style={{ display: 'flex' }}>
                <p style={{ textAlign: 'left', color: 'blue', marginTop: '10px', cursor: 'pointer' }} onClick={() => setCreateOpen(true)}> + Create </p>
            </div>

            <AnimalCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            
            { loading ? <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={30}/>
            </div> : <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> ID </TableCell>
                                <TableCell> Name </TableCell>
                                <TableCell> Species </TableCell>
                                <TableCell> Food Type </TableCell>
                                <TableCell> Enclosure ID </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            animals.map((animal) => {
                                return (
                                    <TableRow>
                                        <TableCell> {animal._id} </TableCell>
                                        <TableCell> {animal.name} </TableCell>
                                        <TableCell> {animal.species} </TableCell>
                                        <TableCell> {animal.food_type} </TableCell>
                                        <TableCell> {animal.enclosure_id} </TableCell>
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