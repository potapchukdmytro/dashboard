import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAction } from "../../hooks/useAction"; 
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

const UsersPage = () => {
    const { userList, usersLoaded } = useSelector(state => state.userReducer);
    const { loadUsers, removeUser } = useAction();

    const deleteUserHandler = (id) => {
        removeUser(id, userList);
    };

    useEffect(() => {
        if(!usersLoaded) {
            loadUsers();
        }
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Id
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            User name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Email
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Role
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Full name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Edit
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell align="center">{item.id}</TableCell>
                            <TableCell align="center">
                                {item.userName}
                            </TableCell>
                            <TableCell align="center">{item.email}</TableCell>
                            <TableCell align="center">{item.role}</TableCell>
                            <TableCell align="center">{`${item.name} ${item.surname}`}</TableCell>
                            <TableCell align="center">
                                <Link
                                    to={`createuser?user=${item.id}`}
                                >
                                    <EditIcon />
                                </Link>
                                <DeleteIcon onClick={() => deleteUserHandler(item.id)}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersPage;
