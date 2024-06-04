'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tooltip } from '@mui/material';

import DetailsDialog from './details-dialog/details-dialog';

import { User } from './utils/user';
import { HttpService } from './utils/service';

export default function Home() {
  const [rows, setRows] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleClose = () => {
    setOpen(false);
  };

  const showDetails = (id: number) => {
    setSelectedUser(rows.find((v) => v.id === id));
    setOpen(true);
  }
  useEffect(() => {
    const apiService = new HttpService();
    const { request, cancel } = apiService.get('/rtassessment')

    request.then((response: { data: User[] }) => {
      console.log(response.data)
      setRows(response.data);
    })
    .catch(error => {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        // Handle other errors
      }
    });
    return () => {
      // Cleanup logic: if the component unmounts before the request completes, cancel the request
      cancel("Component unmounted, aborting request");
    };
  }, []);

  return (
    <div className="flex flex-col w-full p-2.5">
      <h1 className="text-lg py-2">User List</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell># Logs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Tooltip key={row.id} title="Open detail">
                <TableRow
                  key={row.id}
                  onClick={() => showDetails(row.id)}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.age}
                  </TableCell>
                  <TableCell>{row.details.length}</TableCell>
                </TableRow>
              </Tooltip>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DetailsDialog
        user={selectedUser}
        open={open}
        onClose={handleClose}
      ></DetailsDialog>
    </div>
  );
}
