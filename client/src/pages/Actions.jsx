import React, { useState, useEffect, useContext } from 'react';
import { Page, ActionModal, Button } from '../components'
import { TextField, Select, Table, TableContainer, TableCell, TableHead, CircularProgress, TableRow, FormControl, InputLabel, DateAdapterfns } from '@mui/material'
import { MenuItem } from '@material-ui/core'
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import api from '../api'
import AuthContext from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionUpdateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [actionId, setActionId] = useState(null)
    const [recurring, setRecurring] = useState(false);
    const [time, setTime] = useState(new Date());
    const [user_id, setUserId] = useState('');
    const [enclosure_id, setEnclosureId] = useState('')
    const [enclosures, setEnclosures] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        let { action } = props
        if (!action) return
        setName(action.name)
        setEnclosureId(action.enclosure_id)
        setRecurring(action.recurring)
        setTime(action.time)
        setUserId(action.user_id)
    }, [props.action])

    useEffect(() => {
        setLoading(true)
        api.getEnclosures(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setLoading(false)
            setEnclosures(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])
    useEffect(() => {
        api.getUsers(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setUsers(response.data.data)
            console.log(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    const handleUpdate = () => {
        setLoading(true)
        api.updateActionById(props.action._id, { name, user_id, time, recurring, enclosure_id}).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={`Update the ${props.action ? props.action.name : 'name'}`} handleClose={props.handleClose}>
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
                        <InputLabel id="demo-simple-select-label">Recurring</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Recurring" value={recurring} onChange={(e) => setRecurring(e.target.value)}>
                                <MenuItem value={true}> True </MenuItem>
                                <MenuItem value={false}> False </MenuItem>
                        </Select>
                </FormControl>
                </div> 
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
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

const ActionCreateModal = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [actionId, setActionId] = useState(null)
    const [recurring, setRecurring] = useState(false);
    const [time, setTime] = useState(new Date())
    const [user_id, setUserId] = useState('');
    const [enclosure_id, setEnclosureId] = useState('')
    const [enclosures, setEnclosures] = useState([])
    const [users, setUsers] = useState([])


    useEffect(() => {
        api.getEnclosures(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setEnclosures(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])
    useEffect(() => {
        api.getUsers(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
            setUsers(response.data.data)
            console.log(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])



    const handleCreate = () => {
        setLoading(true)
        api.createAction({ name, user_id, time, recurring, enclosure_id }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={'Create an Action'} handleClose={props.handleClose}>
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
                        <InputLabel id="demo-simple-select-label">Recurring</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Recurring" value={recurring} onChange={(e) => setRecurring(e.target.value)}>
                                <MenuItem value={true}> True </MenuItem>
                                <MenuItem value={false}> False </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    label="DateTimePicker"
                    inputVariant="outlined"
                    value={time}
                    onChange={setTime}
                   
                />
                </MuiPickersUtilsProvider>
                </div>
                <Button label={'Create'} loading={false} onClick={handleCreate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const Actions = props => {
    const auth = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [createOpen, setCreateOpen] = useState(false)

    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateAction, setUpdateAction] = useState(null)

    const [actions, setActions] = useState([])

    useEffect(() => {
        setLoading(true)
        api.getActions(auth.zooId ? { params: { 'enclosure.zoo_id' : auth.zooId }} : {}).then((response) => {
            setLoading(false)
            setActions(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])

    const handleUpdateStart = (action) => {
        setUpdateOpen(true)
        setUpdateAction(action)
    }

    const handleDelete = (enclosure_id) => {
        api.deleteActionById(enclosure_id).then((response) => {
            setActions([...actions.filter((action) => action._id !== response.data._id)])
        }).catch((error) => {
            console.log(error)
        })
    }

    const handleUpdateSuccess = (action) => {
        setUpdateOpen(false)
        let newActions = [...actions], newAction = newActions.findIndex((oldAction) => oldAction._id === action._id)
        newActions[newAction] = action
        setActions(newActions)
    }

    const handleCreateSuccess = (action) => {
        setCreateOpen(false)
        setActions([action, ...actions])
    }

    return (
        <Page name={'Actions'}>
            <ActionCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            <ActionUpdateModal open={updateOpen} action={updateAction} handleClose={() => setUpdateOpen(false)} handleSuccess={handleUpdateSuccess}/>
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
                                <TableCell> User ID </TableCell>
                                <TableCell> Enclosure ID </TableCell>
                                <TableCell> Time </TableCell>
                                <TableCell> Recurring </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            actions.map((action, i) => {
                                return (
                                    <TableRow key={i} style={{ position: 'relative' }}>
                                        <TableCell> {action._id} </TableCell>
                                        <TableCell> {action.name} </TableCell>
                                        <TableCell> {action.user_id} </TableCell>
                                        <TableCell> {action.enclosure_id} </TableCell>
                                        <TableCell> {action.time} </TableCell>
                                        <TableCell> {action.recurring} </TableCell>
                                        <div style={{ display: 'flex', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)'}}>
                                            <EditIcon style={{ marginRight: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={() => handleUpdateStart(action)}/>
                                            <DeleteIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleDelete(action._id)}/>
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

Actions.propTypes = {
    
};

export default Actions;