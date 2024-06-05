import { Fragment, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Alert, { AlertColor } from '@mui/material/Alert';
import { format } from 'date-fns';


import { User } from '../utils/user';
import { HttpService } from '../utils/service';
import axios from 'axios';


export default function DetailsSide(props: { user: User | undefined, open: boolean, onClose: () => void, updateRows: () => void }) {

    const [user, setUser] = useState<User>(new User());
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState<AlertColor>('success');
    const [alertMessage, setAlertMessage] = useState('');

    const handleClose = () => {
        props.onClose();
    };

    const updateUser = () => {
        return new Promise((resolve, reject) => {
            const apiService = new HttpService();
            const { request } = apiService.put(`/rtassessment/${user.id}`, user);
            request.then(() => {
                resolve(true);
            })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log("Request canceled:", error.message);
                    } else {
                        // Handle other errors
                    }
                    reject(error);
                });
        });
    }
    const toggleAlert = (type: AlertColor, message: string) => {
        setAlertType(type);
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    }
    const editData = () => {
        updateUser()
            .then(() => {
                toggleAlert('success', 'User saved successfully');
                props.updateRows();
            })
            .catch(() => {
                toggleAlert('error', 'There was an error saving the user, please try again');
            });
    };

    const renderAlert = (type: AlertColor, message: string) => {
        if (!showAlert) {
            return null;
        }
        return (<div className="flex flex-col py-2">
            <Alert severity={type}>{message}</Alert>
        </div>);
    }

    useEffect(() => {
        if (props.user)
            setUser(props.user);
    }, [props.user]);

    return (
        <Fragment>
            {renderAlert(alertType, alertMessage)}
            <div className="inline-flex justify-between">
                <h1 className="text-lg py-2">User #{user?.id}</h1>
                <div className="inline-flex justify-end space-x-2">
                    <Button onClick={editData} className="bg-main text-white hover:bg-blue-400">Save</Button>
                    <Button onClick={handleClose} className="bg-main text-white hover:bg-blue-400">Close</Button>
                </div>
            </div>
            <div className="py-2">
                <div className="py-2.5">
                    <TextField
                        required
                        id="name"
                        label="Name"
                        value={user?.name}
                        onChange={(event) => {
                            if (user) {
                                setUser({
                                    ...user,
                                    name: event.target.value
                                });
                            }
                        }}
                    />
                </div>
                <div className="py-2.5">
                    <TextField
                        required
                        id="age"
                        label="Age"
                        value={user?.age}
                        type="number"
                        onChange={(event) => {
                            if (user) {
                                setUser({
                                    ...user,
                                    age: Number(event.target.value)
                                });
                            }
                        }}
                    />
                </div>

                <hr />
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
            </div>
        </Fragment >
    );
}