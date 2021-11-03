import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, ActionModal, Button } from './components' 
import { Animals, Enclosures, Home } from './pages'
import { List, ListItemButton } from '@mui/material'
import api from './api'
import './App.css';

const SelectZooModal = props => {
  const [zoos, setZoos] = useState([])
  const [selectedZooId, setSelectedZooId] = useState(null)

  useEffect(() => {
    api.getZoos({}).then((response) => {
      setZoos(response.data.data)
    }).catch((error) => {
      console.log(error)
    })
  })

  return (
      <ActionModal open={props.open} title={'Select Your Zoo'}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List>
            {
              zoos.map((zoo) => {
                return (
                  <ListItemButton sx={{ borderRadius: '10px', marginBottom: '5px', backgroundColor: 'rgba(0,0,0,.02)', padding: '10px 15px 10px 15px', boxShadow: zoo._id === selectedZooId ? '0px 0px 0px 1px rgba(0,0,0,.5)' : '', transition: 'box-shadow 300ms ease'  }} onClick={() => setSelectedZooId(zoo._id)}>
                    {zoo.city}, {zoo.state} Zoo
                  </ListItemButton>
                )
              })
            }
            <ListItemButton sx={{ borderRadius: '10px', backgroundColor: 'rgba(0,0,0,.02)', padding: '10px 15px 10px 15px', boxShadow: selectedZooId === null ? '0px 0px 0px 1px rgba(0,0,0,.5)' : '', transition: 'box-shadow 300ms ease'  }} onClick={() => setSelectedZooId(null)}>
              None
            </ListItemButton>
          </List>
          <Button label={'Continue'} style={{ marginTop: 'auto' }} onClick={() => props.handleContinue(selectedZooId)}/>
        </div>
      </ActionModal>
  )
}

const App = (props) => {
  const [zoo, setZoo] = useState(null)

  return (
    <div className="App">
        <SelectZooModal open={false}/>
        { !zoo ? <div style={{ marginTop: '150px', height: '100%' }}>
          <Router>
            <Navbar/>
            <div style={{ padding: '0px 60px 0px 60px' }}>
              <Switch>
                <Route path='/enclosures' exact component={Enclosures}/>
                <Route path='/animals' exact component={Animals}/>
                <Route path='/' component={Home}/>
              </Switch>
            </div>
          </Router>
        </div> : null }
    </div>
  );
}

export default App;
