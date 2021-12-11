import { useState, useEffect, useContext } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, ActionModal, Button } from './components' 
import { Animals, Enclosures, Home, Actions, Users, Appointments } from './pages'
import { List, ListItemButton, TextField } from '@mui/material'
import api from './api'
import './App.css';
import AuthContext from './context/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SelectZooModal = props => {
  const auth = useContext(AuthContext)
  const [zoos, setZoos] = useState([])

  // edit state
  const [updateLoading, setUpdateLoading] = useState(false)
  const [updateId, setUpdateId] = useState(null)
  const [updateState, setUpdateState] = useState('')
  const [updateCity, setUpdateCity] = useState('')
  const [updateCapacity, setUpdateCapacity] = useState('')
  const [updateMapUrl, setUpdateMapUrl] = useState('')

  // create state
  const [createLoading, setCreateLoading] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [createState, setCreateState] = useState('')
  const [createCity, setCreateCity] = useState('')
  const [createCapacity, setCreateCapacity] = useState('')
  const [createMapUrl, setCreateMapUrl] = useState('')

  useEffect(() => {
    api.getZoos(auth.zooId ? { params: { zoo_id: auth.zooId }} : {}).then((response) => {
      setZoos(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const handleCreateStart = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (createOpen) return setCreateOpen(false)
    setCreateOpen(true)
    setUpdateId(null)
  }

  const handleUpdateStart = (event, zoo) => {
    event.preventDefault()
    event.stopPropagation()
    if (zoo._id === updateId) return setUpdateId(null)
    setUpdateId(zoo._id)
    setUpdateCapacity(zoo.capacity)
    setUpdateState(zoo.state)
    setUpdateCity(zoo.city)
    setUpdateMapUrl(zoo.map_url)
  }

  const handleSubmitUpdate = () => {
    setUpdateLoading(true)
    api.updateZooById(updateId, { state: updateState, city: updateCity, capacity: updateCapacity, map_url: updateMapUrl }).then((response) => {
      if (response.data._id === auth.zooId) auth.handleZooChange(response.data)
      let newZoos = [...zoos], newZooIndex = newZoos.findIndex((zoo) => zoo._id === response.data._id)
      newZoos[newZooIndex] = response.data
      setZoos(newZoos)
      setUpdateId(null)
      setUpdateLoading(false)
    }).catch((error) => {
      setUpdateLoading(false)
    })
  }

  const handleSubmitCreate = () => {
    setCreateLoading(true)
    api.createZoo({ state: createState, city: createCity, capacity: createCapacity, map_url: createMapUrl }).then((response) => {
      setZoos([response.data, ...zoos])
      setCreateOpen(false)
      auth.handleZooChange(response.data)
      setCreateLoading(false)
    }).catch((error) => {
      setCreateLoading(false)
    })
  }

  const handleDelete = (zooId) => {
    api.deleteZooById(zooId).then((response) => {
      if (response.data._id === auth.zooId) auth.handleZooChange(null)
      setZoos([...zoos.filter((zoo) => zoo._id !== response.data._id)])
    }).catch((error) => {
      console.log(error)
    })
  }

  const handleSelectChange = (zoo) => {
    auth.handleZooChange(zoo)
    setUpdateId(null)
  }

  const renderUpdate = (zoo_id) => {
    return <div style={{ height: updateId === zoo_id ? '220px' : '0px', transition: 'height 300ms ease', overflow: 'hidden' }}>
        <div style={{ display: 'flex', marginBottom: '20px', marginTop: '10px' }}>
            <div style={{ width: '100%', marginRight: '10px' }}>
                <TextField label="State" variant="outlined" sx={{ width: '100%' }} value={updateState} onChange={(e) => setUpdateState(e.target.value)}/>
            </div>
            <div style={{ width: '100%' }}>
                <TextField label="City" variant="outlined" sx={{ width: '100%' }} value={updateCity} onChange={(e) => setUpdateCity(e.target.value)}/>
            </div>
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ width: '100%', marginRight: '10px' }}>
                <TextField label="Capacity" variant="outlined" type='number' sx={{ width: '100%' }} value={updateCapacity} onChange={(e) => setUpdateCapacity(e.target.value)}/>
            </div>
            <div style={{ width: '100%' }}>
                <TextField label="Map URL" variant="outlined" sx={{ width: '100%' }} value={updateMapUrl} onChange={(e) => setUpdateMapUrl(e.target.value)}/>
            </div>
        </div>
        <Button label={'Update'} loading={updateLoading} style={{ marginTop: '20px', marginBottom: '20px' }} onClick={handleSubmitUpdate}/>
    </div>
  }


  const renderCreate = () => {
    return <div style={{ height: createOpen ? '220px' : '0px', transition: 'height 300ms ease', overflow: 'hidden' }}>
        <div style={{ display: 'flex', marginBottom: '20px', marginTop: '10px' }}>
            <div style={{ width: '100%', marginRight: '10px' }}>
                <TextField label="State" variant="outlined" sx={{ width: '100%' }} value={createState} onChange={(e) => setCreateState(e.target.value)}/>
            </div>
            <div style={{ width: '100%' }}>
                <TextField label="City" variant="outlined" sx={{ width: '100%' }} value={createCity} onChange={(e) => setCreateCity(e.target.value)}/>
            </div>
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ width: '100%', marginRight: '10px' }}>
                <TextField label="Capacity" variant="outlined" type='number' sx={{ width: '100%' }} value={createCapacity} onChange={(e) => setCreateCapacity(e.target.value)}/>
            </div>
            <div style={{ width: '100%' }}>
                <TextField label="Map URL" variant="outlined" sx={{ width: '100%' }} value={createMapUrl} onChange={(e) => setCreateMapUrl(e.target.value)}/>
            </div>
        </div>
        <Button label={'Create'} style={{ marginTop: '20px', marginBottom: '20px' }} loading={createLoading} onClick={handleSubmitCreate}/>
    </div>
  }

  return (
      <ActionModal open={auth.zooOpen} title={'Select Your Zoo'} handleClose={auth.handleZooClose}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '-10px' }}>
            <p style={{ textAlign: 'left', color: 'blue', marginTop: '0px', cursor: 'pointer', fontSize: '14px', userSelect: 'none' }} onClick={handleCreateStart}> + Create </p>
          </div>
        <div style={{ position: 'relative', overflowY: 'scroll', height: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', padding: '10px', minHeight: '100%' }}>
            { renderCreate() }
            <List sx={{ marginBottom: '20px' }}>
              {
                zoos.map((zoo) => {
                  return (
                    <div>
                      <ListItemButton sx={{ borderRadius: '10px', marginBottom: '5px', backgroundColor: 'rgba(0,0,0,.02)', padding: '10px 15px 10px 15px', boxShadow: zoo._id === auth.zooId ? '0px 0px 0px 1px rgba(0,0,0,.5)' : '', transition: 'box-shadow 300ms ease'  }} onClick={() => handleSelectChange(zoo)}>
                        {zoo.city}, {zoo.state} Zoo
                        <div style={{ display: 'flex', position: 'absolute', right: '10px', alignItems: 'center' }}>
                          <EditIcon style={{ fontSize: '20px', marginRight: '10px' }} onClick={(e) => handleUpdateStart(e, zoo)}/>
                          <DeleteIcon style={{ fontSize: '20px' }} onClick={(e) => handleDelete(zoo._id)}/>
                        </div> 
                      </ListItemButton>
                      <div style={{ overflow: 'hidden' }}>
                        { renderUpdate(zoo._id) }
                      </div>
                    </div>
                  )
                })
              }
              <ListItemButton sx={{ borderRadius: '10px', backgroundColor: 'rgba(0,0,0,.02)', padding: '10px 15px 10px 15px', boxShadow: !auth.zoo ? '0px 0px 0px 1px rgba(0,0,0,.5)' : '', transition: 'box-shadow 300ms ease'  }} onClick={() => handleSelectChange(null)}>
                None
              </ListItemButton>
            </List>
            <Button label={'Continue'} style={{ marginTop: 'auto', position: 'sticky', bottom: '20px', marginTop: 'auto' }} onClick={auth.handleZooClose}/>
          </div>
        </div>
      </ActionModal>
  )
}

const App = (props) => {
  const [zoo, setZoo] = useState(null)
  const [zooId, setZooId] = useState(null)
  const [zooOpen, setZooOpen] = useState(false)

  const handleZooChange = (newZoo) => {
    setZooId(newZoo ? newZoo._id : null)
    setZoo(newZoo)
  }

  const handleZooOpen = () => {
    setZooOpen(true)
  }

  const handleZooClose = () => {
    setZooOpen(false)
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ zoo, zooId, zooOpen, handleZooChange, handleZooOpen, handleZooClose }}>
        <SelectZooModal/>
        <div style={{ height: '100%' }}>
          <Router>
            <Navbar/>
            <div style={{ padding: '0px 60px 0px 60px' }}>
              <Switch>
                <Route path='/actions' exact component={Actions}/>
                <Route path='/enclosures' exact component={Enclosures}/>
                <Route path='/animals' exact component={Animals}/>
                <Route path='/users' exact component={Users}/>
                <Route path='/appointments' exact component={Appointments}/>
                <Route path='/' component={Home}/>
              </Switch>
            </div>
          </Router>
        </div>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
