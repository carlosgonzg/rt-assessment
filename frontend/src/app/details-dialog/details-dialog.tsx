import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';

import { User } from '../utils/user';


export default function DetailsDialog(props: { user: User | undefined, open: boolean, onClose: () => void }) {

    const [user, setUser] = useState<User>();

    const handleClose = () => {
        props.onClose();
    };

    useEffect(() => {
        setUser(props.user);
    }, [props.user])

    return (
        <Fragment>
            <Dialog
                open={props.open}
                onClose={handleClose}
                className="p-2.5"
            >
                <DialogTitle className="text-lg py-2">User #{user?.id}</DialogTitle>
                <DialogContent className="py-2">
                    <DialogContentText className="py-2">
                        Name: {user?.name}
                        <br/>
                        Age: {user?.age}
                    </DialogContentText>
                    <hr/>
                    <h1 className="text-lg py-2">
                        Logged information
                    </h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="font-bold">Log date</TableCell>
                                    <TableCell className="font-bold">Calories</TableCell>
                                    <TableCell className="font-bold">Carbs</TableCell>
                                    <TableCell className="font-bold">Fat</TableCell>
                                    <TableCell className="font-bold">Protein</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {user?.details.map((detail) => (
                                    <TableRow
                                        key={detail.id}
                                        hover
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {format(detail.created, 'MMMM do yyyy, h:mm:ss a')}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {detail.calories}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {detail.carbs}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {detail.fat}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {detail.protein}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}