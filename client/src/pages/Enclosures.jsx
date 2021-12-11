import React, { useState, useEffect, useContext } from 'react';
import { Page, ActionModal, Button } from '../components'
import { TextField, Select, MenuItem, Table, TableContainer, TableCell, TableHead, CircularProgress, TableRow, FormControl, InputLabel } from '@mui/material'
import api from '../api'
import AuthContext from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EnclosureViewModal = props => {
    const [animals, setAnimals] = useState([])
    const [zoo, setZoo] = useState(null)
    
    useEffect(() => {
        if (!props.enclosure) return
        api.getAnimals({ params: { enclosure_id: props.enclosure._id } }).then((response) => {
            setAnimals(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [props.enclosure])

    useEffect(() => {
        if (!props.enclosure) return
        api.getZoos({ params: { zoo_id: props.enclosure.zoo_id } }).then((response) => {
            if (!response.data.data.length) setZoo(response.data.data[0])
        }).catch((error) => {
            console.log(error)
        })
    }, [props.enclosure])

    return (
        <ActionModal open={props.open} title={` ${props.enclosure ? props.enclosure.name : 'name'}`} handleClose={props.handleClose}>
            { props.enclosure ? <div>
                <h3> Attributes </h3>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        Zoo: {zoo ? `${zoo.city}, ${zoo.state}` : null}
                    </div>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        Name: {props.enclosure.name}
                    </div>
                    <div style={{ width: '100%' }}>
                        Perimeter: {props.enclosure.perimeter}
                    </div>
                    <h3>Animals</h3>
                    {
                        animals.map((animal) => {
                            return <div>
                                {animal.name}
                            </div>
                        })
                    }
                </div>
            </div> : null }
        </ActionModal>
    )
}


const EnclosureUpdateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [zooId, setZooId] = useState(null)
    const [zoos, setZoos] = useState([])

    useEffect(() => {
        let { enclosure } = props
        if (!enclosure) return
        setName(enclosure.name)
        setZooId(enclosure.zoo_id)
    }, [props.enclosure])

    useEffect(() => {
        if (auth.zoo) return
        api.getZoos(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setZoos(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleUpdate = () => {
        setLoading(true)
        api.updateEnclosureById(props.enclosure._id, { name, zoo_id: auth.zoo ? auth.zoo_id : zooId }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={`Update the ${props.enclosure ? props.enclosure.name : 'name'}`} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                { !auth.zoo ? <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Zoo</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Enclosure" value={zooId} onChange={(e) => setZooId(e.target.value)}>
                            {
                                zoos.map((zoo, i) => {
                                    return (
                                        <MenuItem key={i} value={zoo._id}> {zoo.city}, {zoo.state} Zoo </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div> : null }
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <Button label={'Update'} loading={false} onClick={handleUpdate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const EnclosureCreateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [zooId, setZooId] = useState(null)
    const [zoos, setZoos] = useState([])

    useEffect(() => {
        if (auth.zoo) return
        api.getZoos(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setZoos(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleCreate = () => {
        setLoading(true)
        api.createEnclosure({ name, zoo_id: auth.zoo ? auth.zoo._id : zooId }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={'Create an Enclosure'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                { !auth.zoo ? <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Zoo</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Enclosure" value={zooId} onChange={(e) => setZooId(e.target.value)}>
                            {
                                zoos.map((zoo, i) => {
                                    return (
                                        <MenuItem key={i} value={zoo._id}> {zoo.city}, {zoo.state} Zoo </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div> : null }
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <Button label={'Create'} loading={loading} onClick={handleCreate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const Enclosures = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [createOpen, setCreateOpen] = useState(false)

    const [viewOpen, setViewOpen] = useState(false)
    const [viewEnclosure, setViewEnclosure] = useState(null)

    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateEnclosure, setUpdateEnclosure] = useState(null)

    const [enclosures, setEnclosures] = useState([])

    useEffect(() => {
        setLoading(true)
        api.getEnclosures(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setLoading(false)
            setEnclosures(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])

    const handleViewStart = (enclosure) => {
        setViewOpen(true)
        setViewEnclosure(enclosure)
    }

    const handleUpdateStart = (event, enclosure) => {
        event.stopPropagation()
        setUpdateOpen(true)
        setUpdateEnclosure(enclosure)
    }

    const handleDelete = (event, enclosure_id) => {
        event.stopPropagation()
        api.deleteEnclosureById(enclosure_id).then((response) => {
            setEnclosures([...enclosures.filter((enclosure) => enclosure._id !== response.data._id)])
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleUpdateSuccess = (enclosure) => {
        setUpdateOpen(false)
        let newEnclosures = [...enclosures], newEnclosure = newEnclosures.findIndex((oldEnclosure) => oldEnclosure._id === enclosure._id)
        newEnclosures[newEnclosure] = enclosure
        setEnclosures(newEnclosures)
    }

    const handleCreateSuccess = (enclosure) => {
        setCreateOpen(false)
        setEnclosures([enclosure, ...enclosures])
    }

    return (
        <Page name={'Enclosures'}>
            <EnclosureCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            <EnclosureUpdateModal open={updateOpen} enclosure={updateEnclosure} handleClose={() => setUpdateOpen(false)} handleSuccess={handleUpdateSuccess}/>
            <EnclosureViewModal open={viewOpen} enclosure={viewEnclosure} handleClose={() => setViewOpen(false)}/>
            <p style={{ textAlign: 'left', color: 'blue', marginTop: '10px', cursor: 'pointer' }} onClick={() => setCreateOpen(true)}> + Create </p>
            { loading ? <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={30}/>
            </div> : <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> ID </TableCell>
                                <TableCell> Name </TableCell>
                                <TableCell> Perimeter </TableCell>
                                <TableCell> Zoo ID </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            enclosures.map((enclosure, i) => {
                                return (
                                    <TableRow key={i} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleViewStart(enclosure)}>
                                        <TableCell> {enclosure._id} </TableCell>
                                        <TableCell> {enclosure.name} </TableCell>
                                        <TableCell> {enclosure.perimeter.toString() || 'None'} </TableCell>
                                        <TableCell> {enclosure.zoo_id} </TableCell>
                                        <div style={{ display: 'flex', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)'}}>
                                            <EditIcon style={{ marginRight: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={(event) => handleUpdateStart(event, enclosure)}/>
                                            <DeleteIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={(event) => handleDelete(event, enclosure._id)}/>
                                        </div>
                                    </TableRow>                                
                                )
                            })
                        }
                    </Table>
                </TableContainer>
            </div> }
        </Page>
    );
};

Enclosures.propTypes = {
    
};

export default Enclosures;