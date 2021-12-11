import React, { useState, useEffect, useContext } from 'react';
import { Page, ActionModal, Button } from '../components'
import { TextField, Select, Table, TableContainer, TableCell, TableHead, CircularProgress, TableRow, FormControl, InputLabel } from '@mui/material'
import { MenuItem } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import api from '../api'
import AuthContext from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const AppointmentUpdateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [user_id, setUserId] = useState([])
    const [animal_id, setAnimalId] = useState([])
    const [time, setTime] = useState(new Date())
    const [status, setStatus] = useState('')
    const [enclosure_id, setEnclosureId] = useState('')
    const [enclosures, setEnclosures] = useState([])
    const [animals, setAnimals] = useState([])

    const [users, setUsers] = useState([])
    const [name, setName] = useState('')


    useEffect(() => {
        let { appointment } = props
        if (!appointment) return
        setUserId(appointment.user_id)
        setAnimalId(appointment.animal_id)
        setTime(appointment.time)
        setStatus(appointment.status)
    }, [props.appointment])

    useEffect(() => {
        api.getUsers(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setUsers(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])
    useEffect(() => {
        api.getAnimals(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setAnimals(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleUpdate = () => {
        setLoading(true)
        api.updateAppointmentById(props.appointment._id, { user_id: auth.user ? auth.user_id : user_id }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return ( //IDK NAME PART OR MAP PART
<ActionModal open={props.open} title={'Update an Appointment'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="User" value={user_id} onChange={(e) => setUserId(e.target.value)}>
                            {
                                users.map((user, i) => {
                                    return (
                                        <MenuItem key={i} value={user._id}> {user.name} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Animal</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Animal" value={animal_id} onChange={(e) => setAnimalId(e.target.value)}>
                            {
                                animals.map((animal, i) => {
                                    return (
                                        <MenuItem key={i} value={animal._id}> {animal.name} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value={"Completed"}> Completed </MenuItem>
                                <MenuItem value={"Uncompleted"}> Uncompleted </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Time" variant="outlined" sx={{ width: '100%' }} value={time} onChange={(e) => setTime(e.target.value)}/>
                    </div>
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="DateTimePicker"
                        inputVariant="outlined"
                        value={time}
                        onChange={setTime}
                    
                    />
                </MuiPickersUtilsProvider>
                <Button label={'Update'} loading={false} onClick={handleUpdate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}
const AppointmentCompleteModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [user_id, setUserId] = useState([])
    const [animal_id, setAnimalId] = useState([])
    const [time, setTime] = useState(new Date())
    const [status, setStatus] = useState('')
    const [enclosure_id, setEnclosureId] = useState('')
    const [enclosures, setEnclosures] = useState([])
    const [animals, setAnimals] = useState([])
    const [heart_rate, setHeartRate] = useState([])
    const [weight, setWeight] = useState([])
    const [notes, setNotes] = useState([])


    const [users, setUsers] = useState([])
    const [name, setName] = useState('')


    useEffect(() => {
        let { appointment } = props
        if (!appointment) return
        setUserId(appointment.user_id)
        setAnimalId(appointment.animal_id)
        setTime(appointment.time)
        setStatus(appointment.status)
    }, [props.appointment])

    useEffect(() => {
        api.getUsers(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setUsers(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])
    useEffect(() => {
        api.getAnimals(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setAnimals(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleCreateHealth = () => {
        setLoading(true)
        api.createHealth({ heart_rate, weight, notes, animal_id }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return ( //IDK NAME PART OR MAP PART
<ActionModal open={props.open} title={'Complete an Appointment'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">User</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="User" value={user_id} onChange={(e) => setUserId(e.target.value)}>
                            {
                                users.map((user, i) => {
                                    return (
                                        <MenuItem key={i} value={user._id}> {user.name} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Animal</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Animal" value={animal_id} onChange={(e) => setAnimalId(e.target.value)}>
                            {
                                animals.map((animal, i) => {
                                    return (
                                        <MenuItem key={i} value={animal._id}> {animal.name} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </div>
                    <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem value={"Completed"}> Completed </MenuItem>
                                <MenuItem value={"Uncompleted"}> Uncompleted </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Time" variant="outlined" sx={{ width: '100%' }} value={time} onChange={(e) => setTime(e.target.value)}/>
                    </div>
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="DateTimePicker"
                        inputVariant="outlined"
                        value={time}
                        onChange={setTime}
                    
                    />
                </MuiPickersUtilsProvider>
                <Button label={'Update'} loading={false} onClick={handleUpdate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const AppointmentCreateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [user_id, setUserId] = useState([])
    const [animal_id, setAnimalId] = useState([])
    const [time, setTime] = useState(new Date())
    const [status, setStatus] = useState('')
    const [enclosure_id, setEnclosureId] = useState('')
    const [animals, setAnimals] = useState([])
    const [users, setUsers] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        api.getUsers(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setUsers(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])
    useEffect(() => {
        api.getAnimals(auth.userId ? { params: { user_id: auth.userId }} : {}).then((response) => {
            setAnimals(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleCreate = () => {
        setLoading(true)
        api.createAppointment({ user_id, animal_id, time}).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={'Create an Appointment'} handleClose={props.handleClose}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                        <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">User</InputLabel>
                                <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="User" value={user_id} onChange={(e) => setUserId(e.target.value)}>
                                    {
                                        users.map((user, i) => {
                                            return (
                                                <MenuItem key={i} value={user._id}> {user.name} </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            </div>
                            <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Animal</InputLabel>
                                <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Animal" value={animal_id} onChange={(e) => setAnimalId(e.target.value)}>
                                    {
                                        animals.map((animal, i) => {
                                            return (
                                                <MenuItem key={i} value={animal._id}> {animal.name} </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            </div>
                            <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <MenuItem value={"Completed"}> Completed </MenuItem>
                                        <MenuItem value={"Uncompleted"}> Uncompleted </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ width: '100%', marginRight: '10px' }}>
                                <TextField label="Time" variant="outlined" sx={{ width: '100%' }} value={time} onChange={(e) => setTime(e.target.value)}/>
                            </div>
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                label="DateTimePicker"
                                inputVariant="outlined"
                                value={time}
                                onChange={setTime}
                            
                            />
                        </MuiPickersUtilsProvider>
                       <Button label={'Create'} loading={false} onClick={handleCreate} style={{ marginTop: 'auto' }}/>
                    </div>
                </ActionModal>
    )
}

const Appointments = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [createOpen, setCreateOpen] = useState(false)

    const [updateOpen, setUpdateOpen] = useState(false)
    const [completeOpen, setCompleteOpen] = useState(false)
    const [completeAppointment, setCompleteAppointment] = useState(null)

    const [updateAppointment, setUpdateAppointment] = useState(null)

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        setLoading(true)
        api.getAppointments(auth.zooId ? { params: { 'enclosure.zoo_id' : auth.zooId }} : {}).then((response) => {
            setLoading(false)
            setAppointments(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])

    const handleUpdateStart = (appointment) => {
        setUpdateOpen(true)
        setUpdateAppointment(appointment)
    }
    const handleCompleteStart = (appointment) => {
        setCompleteOpen(true)
        setCompleteAppointment(appointment)
    }

    const handleDelete = (appointment_id) => {
        api.deleteAppointmentById(appointment_id).then((response) => {
            setAppointments([...appointments.filter((appointment) => appointment_id._id !== response.data._id)])
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
    
    const handleCompleteSuccess = (appointment) => {
        setCompleteOpen(false)

    }

    const handleCreateSuccess = (appointment) => {
        setCreateOpen(false)
        setAppointments([appointment, ...appointments])
    }

    return (
        <Page name={'Appointments'}>
            <AppointmentCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            <AppointmentUpdateModal open={updateOpen} appointment={updateAppointment} handleClose={() => setUpdateOpen(false)} handleSuccess={handleUpdateSuccess}/>
            <AppointmentCompleteModal open={completeOpen} appointment={completeAppointment} handleClose={() => setCompleteOpen(false)} handleSuccess={handleCompleteSuccess}/>

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
                                            <CheckCircleOutlineIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleCompleteStart(appointment._id)}/>
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