import React, { useState, useEffect, useContext } from 'react';
import { ActionModal, Page, Button } from '../components'
import { TextField, Select, MenuItem, CircularProgress, TableContainer, TableHead, TableCell, TableRow, Table, InputLabel, FormControl } from '@mui/material'
import api from '../api';
import AuthContext from '../context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserUpdateModal = props => {
    const auth = useContext(AuthContext)
    const [zoos, setZoos] = useState([])
    const [managers, setManagers] = useState([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [zoo_id, setZooId] = useState(null)
    const [managed_by, setManagedBy] = useState(null)
    const [image_url, setImageUrl] = useState('')

    useEffect(() => {
        if (!props.user) return
        setName(props.user.name)
        setRole(props.user.role)
        setZooId(props.user.zoo_id)
        setManagedBy(props.user.managed_by)
        setImageUrl(props.user.image_url)
    }, [props.user])

    useEffect(() => {
        api.getZoos({}).then((response) => {
            setZoos(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    useEffect(() => {
        api.getUsers(auth.zoo_id || zoo_id ? { params: { zoo_id: auth.zooId || zoo_id, role: 'manager' }} : { params: { role: 'manager' }}).then((response) => {
            setManagers(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo, zoo_id])

    const handleUpdate = () => {
        setLoading(true)
        api.updateUserById(props.user._id, { name, zoo_id, role, image_url, managed_by }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={`Update ${props.user ? props.user.name : 'name'}`} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                { !auth.zooId ? <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Zoo</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Zoo" value={zoo_id} onChange={(e) => setZooId(e.target.value)}>
                            {
                                zoos.map((zoo, i) => {
                                    return (
                                        <MenuItem key={i} value={zoo._id}> {zoo.city} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div> : null }
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <MenuItem value={"manager"}> Manager </MenuItem>
                                <MenuItem value={"vet"}> Veternarian </MenuItem>
                                <MenuItem value={"employee"}> Employee </MenuItem>
                            </Select>
                        </FormControl>                    
                    </div>
                </div>
                <div style={{ width: '100%', marginBottom: '20px' }}>
                    <TextField label="Image URL" variant="outlined" sx={{ width: '100%' }} value={image_url} onChange={(e) => setImageUrl(e.target.value)}/>
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                    <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Manager" value={managed_by} onChange={(e) => setManagedBy(e.target.value)}>
                        {
                            managers.map((manager, i) => {
                                return (
                                    <MenuItem key={i} value={manager._id}> {manager.name} </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Button label={'Update'} loading={loading} onClick={handleUpdate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const UserCreateModal = props => {
    const auth = useContext(AuthContext)
    const [zoos, setZoos] = useState([])
    const [managers, setManagers] = useState([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    const [zoo_id, setZooId] = useState(null)
    const [managed_by, setManagedBy] = useState(null)
    const [image_url, setImageUrl] = useState('')

    useEffect(() => {
        api.getZoos({}).then((response) => {
            setZoos(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo])

    useEffect(() => {
        api.getUsers(auth.zoo_id || zoo_id ? { params: { zoo_id: auth.zooId || zoo_id, role: 'manager' }} : { params: { role: 'manager' }}).then((response) => {
            setManagers(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [auth.zoo, zoo_id])

    const handleCreate = () => {
        setLoading(true)
        api.createUser({ name, zoo_id: zoo_id || auth.zooId, role, image_url }).then((response) => {
            props.handleSuccess(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
        })
    }

    return (
        <ActionModal open={props.open} title={'Create a User'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                { !auth.zooId ? <div style={{ width: '100%', marginRight: '10px', marginBottom: '20px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Zoo</InputLabel>
                        <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Zoo" value={zoo_id} onChange={(e) => setZooId(e.target.value)}>
                            {
                                zoos.map((zoo, i) => {
                                    return (
                                        <MenuItem key={i} value={zoo._id}> {zoo.city} </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </div> : null }
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }} value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <MenuItem value={"manager"}> Manager </MenuItem>
                                <MenuItem value={"vet"}> Veternarian </MenuItem>
                                <MenuItem value={"employee"}> Employee </MenuItem>
                            </Select>
                        </FormControl>                    
                    </div>
                </div>
                <div style={{ width: '100%', marginBottom: '20px' }}>
                    <TextField label="Image URL" variant="outlined" sx={{ width: '100%' }} value={image_url} onChange={(e) => setImageUrl(e.target.value)}/>
                </div>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Manager</InputLabel>
                    <Select labelId="demo-simple-select-label" sx={{ width: '100%' }} label="Manager" value={managed_by} onChange={(e) => setManagedBy(e.target.value)}>
                        {
                            managers.map((manager, i) => {
                                return (
                                    <MenuItem key={i} value={manager._id}> {manager.name} </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <Button label={'Create'} loading={loading} onClick={handleCreate} style={{ marginTop: 'auto' }}/>
            </div>
        </ActionModal>
    )
}

const UserViewModal = (props) => {
    const [employees, setEmployees] = useState([])
    const [actions, setActions] = useState([])

    // get actions
    useEffect(() => {
        if (!props.user) return
        api.getActions({ params: { user_id: props.user._id }}).then((response) => {
            setActions(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [props.user])

    // get employees if they're managing
    useEffect(() => {
        if (!props.user || !props.user.role === 'manager') return
        api.getUsers({ params: { managed_by: props.user._id }}).then((response) => {
            setEmployees(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [props.user])

    return (
        <ActionModal open={props.open} title={props.user ? props.user.name : 'name'} handleClose={props.handleClose}>
            { props.user ? <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={props.user.image_url} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }}/>
                </div>
                <h3> Actions </h3>
                {
                    actions.length ? actions.map((action) => {
                        return <div> {action.name} </div>
                    }) : <div style={{ textAlign: 'center' }}> None </div>
                }
                { props.user.role === 'manager' ? <div>
                    <h3> Employees </h3>
                    {
                        employees.length ? employees.map((employee) => {
                            return <div> {employee.name} </div>
                        }) : <div style={{ textAlign: 'center' }}> None </div>
                    }
                </div> : null }
            </div> : null }
        </ActionModal>
    )
}

const Users = props => {
    const auth = useContext(AuthContext)

    const [createOpen, setCreateOpen] = useState(false)
   
    const [viewOpen, setViewOpen] = useState(false)
    const [viewUser, setViewUser] = useState(null)

    const [updateOpen, setUpdateOpen] = useState(false)
    const [updateUser, setUpdateUser] = useState(null)
    

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        api.getUsers(auth.zooId ? { params: { zoo_id : auth.zooId }} : {}).then((response) => {
            setLoading(false)
            setUsers(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [auth.zoo])

    const handleCreateSuccess = (user) => {
        setCreateOpen(false)
        setUsers([user, ...users])
    }

    const handleUpdateStart = (event, user) => {
        event.stopPropagation()
        setUpdateOpen(true)
        setUpdateUser(user)
    }

    const handleViewStart = (user) => {
        setViewOpen(true)
        setViewUser(user)
    }

    const handleUpdateSuccess = (user) => {
        setUpdateOpen(false)
        let newUsers = [...users], newUser = newUsers.findIndex((oldUser) => oldUser._id === user._id)
        newUsers[newUser] = user
        setUsers(newUsers)
    }

    const handleDelete = (user_id) => {
        api.deleteUserById(user_id).then((response) => {
            setUsers([...users.filter((user) => user._id !== response.data._id)])
        }).catch((error) => {
            console.log(error)
        })
    }
    
    return (
        <Page name={'Users'}>
            <div style={{ display: 'flex' }}>
                <p style={{ textAlign: 'left', color: 'blue', marginTop: '10px', cursor: 'pointer' }} onClick={() => setCreateOpen(true)}> + Create </p>
            </div>

            <UserCreateModal open={createOpen} handleClose={() => setCreateOpen(false)} handleSuccess={handleCreateSuccess}/>
            <UserUpdateModal open={updateOpen} user={updateUser} handleClose={() => setUpdateOpen(false)} handleSuccess={handleUpdateSuccess}/>
            <UserViewModal open={viewOpen} user={viewUser} handleClose={() => setViewOpen(false)}/>
            { loading ? <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={30}/>
            </div> : <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell> Image URL </TableCell>
                                <TableCell> ID </TableCell>
                                <TableCell> Zoo_ID </TableCell>
                                <TableCell> Name </TableCell>
                                <TableCell> Role </TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            users.map((user, i) => {
                                return (
                                    <TableRow key={i} sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => handleViewStart(user)}>
                                        <TableCell> <img src={user.image_url} style={{ height: '30px', width: '30px', borderRadius: '50%', cursor: 'pointer'}}/> </TableCell>
                                        <TableCell> {user._id} </TableCell>
                                        <TableCell> {user.zoo_id} </TableCell>
                                        <TableCell> {user.name} </TableCell>
                                        <TableCell> {user.role} </TableCell>
                                        <div style={{ display: 'flex', position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)'}}>
                                            <EditIcon style={{ marginRight: '10px', fontSize: '20px', cursor: 'pointer' }} onClick={(e) => handleUpdateStart(e, user)}/>
                                            <DeleteIcon style={{ fontSize: '20px', cursor: 'pointer' }} onClick={() => handleDelete(user._id)}/>
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

export default Users;