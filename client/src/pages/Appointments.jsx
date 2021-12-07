import React, { useState, useEffect, useContext } from 'react';
import { Page, ActionModal, Button } from '../components'
import { TextField, Select, MenuItem, Table, TableContainer, TableCell, TableHead, CircularProgress, TableRow, FormControl, InputLabel } from '@mui/material'
import api from '../api'
import AuthContext from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AppointmentUpdateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState([])
    const [animalId, setAnimalId] = useState([])
    const [time, setTime] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        let { appointment } = props
        if (!appointment) return
        setUserId(appointment.user_id)
        setAnimalId(appointment.animal_id)
        setTime(appointment.time)
        setStatus(appointment.status)
    }, [props.enclosure])

    useEffect(() => {
        if (auth.user) return
        api.getUsers(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setUsers(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.user])

    const handleUpdate = () => {
        setLoading(true)
        api.updateAppointmentById(props.appointment._id, { user_id: auth.user ? auth.user_id : userId }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return ( //IDK NAME PART OR MAP PART
        <ActionModal open={props.open} title={`Update the ${props.appointment ? props.appointment.name : 'name'}`} handleClose={props.handleClose}>
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

const AppointmentCreateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState([])
    const [animalId, setAnimalId] = useState([])
    const [time, setTime] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        if (auth.zoo) return
        api.getUsers(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setZoos(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleCreate = () => {
        setLoading(true)

        //IDK
        api.createAppointment({ user_id: auth.user ? auth.user._id : userId }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={'Create an Appointment'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                { !auth.user ? <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Appointment" value={userId} onChange={(e) => setUserId(e.target.value)}>

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

const Appointments = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [createOpen, setCreateOpen] = useState(false)

    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateAppointment, setUpdateAppointment] = useState(null)

    const [appointments, setApointments] = useState([])

    useEffect(() => {
        setLoading(true)
        api.getEnclosures(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setLoading(false)
            setEnclosures(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])

    const handleUpdateStart = (enclosure) => {
        setUpdateOpen(true)
        setUpdateAppointment(appointment)
    }

    const handleDelete = (appointment_id) => {
        api.deleteAppointmentById(appointment_id).then((response) => {
            setAppointments([...appointments.filter((enclosure) => appointment_id._id !== response.data._id)])
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleUpdateSuccess = (appointment) => {
        setUpdateOpen(false)
        let newAppointments = [...appointments], newAppointment = newAppointments.findIndex((oldAppointment) => oldAppointment._id === appointment._id)
        newAppointments[newAppointment] = appointment
        setAppointments(newAppointments)
    }

    const handleCreateSuccess = (appointment) => {
        setCreateOpen(false)
        setEnclosures([appointment, ...appointments])
    }

    return (
        <Page name={'Appointments'}>
            <AppointmentCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            <AppointmentUpdateModal open={updateOpen} appointment={updateAppointment} handleClose={() => setUpdateOpen(false)} handleSuccess={handleUpdateSuccess}/>
            <p style={{ textAlign: 'left', color: 'blue', marginTop: '10px', cursor: 'pointer' }} onClick={() => setCreateOpen(true)}> + Create </p>
            { loading ? <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={30}/>
            </div> : <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> ID </TableCell>
                                <TableCell> User ID </TableCell>
                                <TableCell> Animal ID </TableCell>
                                <TableCell> Time </TableCell>
                                <TableCell> Status </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            appointments.map((appointment, i) => {
                                return (
                                    <TableRow key={i} style={{ position: 'relative' }}>
                                        <TableCell> {appointment._id} </TableCell>
                                        <TableCell> {appointment.user_id} </TableCell>
                                        <TableCell> {appointment.animal_id} </TableCell>
                                        <TableCell> {appointment.time} </TableCell>
                                        <TableCell> {appointment.status} </TableCell>
                                        <div style={{ display: 'flex', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)'}}>
                                            <EditIcon style={{ marginRight: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleUpdateStart(appointment)}/>
                                            <DeleteIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleDelete(appointment._id)}/>
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

Appointments.propTypes = {
    
};

export default Appointments;