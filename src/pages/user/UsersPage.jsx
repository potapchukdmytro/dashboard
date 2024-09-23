import React, { useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAction } from "../../hooks/useAction";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

const UsersPage = () => {
    const { userList, usersLoaded } = useSelector((state) => state.userReducer);
    const { loadUsers, removeUser, editUser } = useAction();

    const newUser = {
        id: 3,
        userName: "NewUserTest",
        email: "user2@dash.com",
        role: "user",
        name: "userName2",
        surname: "userSurname2"
    };

    const deleteUserHandler = (id) => {
        removeUser(id, userList);
    };

    const { t } = useTranslation();

    useEffect(() => {
        if (!usersLoaded) {
            loadUsers();
            editUser(newUser);
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
                            {t('id')}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            {t("username")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            {t("email")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            {t("role")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            {t("fullname")}
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            {t("table_buttons")}
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
                            <TableCell align="center">{`${item.firstName} ${item.lastName}`}</TableCell>
                            <TableCell align="center"><img src={`https://localhost:5000/wwwroot/images/users/${item.image}`} width="75px" height="75px"/></TableCell>
                            <TableCell align="center">
                                <Link to={`createuser?user=${item.id}`}>
                                    <EditIcon />
                                </Link>
                                <DeleteIcon
                                    onClick={() => deleteUserHandler(item.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersPage;
