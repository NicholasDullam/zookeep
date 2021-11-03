import React, { PropTypes, useState, useEffect } from 'react';
import { Page, ActionModal } from '../components'
import { TextField, Select, MenuItem, Table, TableContainer, TableCell, TableHead, CircularProgress, TableRow } from '@mui/material'
import api from '../api'

const EnclosureCreateModal = props => {
    return (
        <ActionModal open={props.open} title={'Create an Animal'} handleClose={props.handleClose}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <Select sx={{ width: '100%' }} label="Enclosure">
                            <MenuItem>
                            </MenuItem>
                        </Select>
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField label="Name" variant="outlined" sx={{ width: '100%' }}/>
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '100%', marginRight: '10px' }}>
                        <TextField label="Species" variant="outlined" sx={{ width: '100%' }}/>
                    </div>
                    <div style={{ width: '100%' }}>
                        <TextField label="Image URL" variant="outlined" sx={{ width: '100%' }}/>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: 'black', width: '100%', borderRadius: '10px', height: '40px', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h4 style={{ color: 'white', textAlign: 'center' }}> Create </h4>
            </div>
        </ActionModal>
    )
}

const Enclosures = props => {
    const [loading, setLoading] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)
    const [enclosures, setEnclosures] = useState([])

    useEffect(() => {
        setLoading(true)
        api.getEnclosures({}).then((response) => {
            setLoading(false)
            setEnclosures(response.data.data)
        }).catch((error) => {
            setLoading(false)
        })
    }, [])

    return (
        <Page name={'Enclosures'}>
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
                            enclosures.map((enclosure) => {
                                return (
                                    <TableRow>
                                        <TableCell> {enclosure._id} </TableCell>
                                        <TableCell> {enclosure.name} </TableCell>
                                        <TableCell> {enclosure.perimeter.toString() || 'None'} </TableCell>
                                        <TableCell> {enclosure.zoo_id} </TableCell>
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