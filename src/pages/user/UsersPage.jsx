import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    DialogContentText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAction } from "../../hooks/useAction";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { APP_ENV } from "../../env";

const UsersPage = () => {
    const [open, setOpen] = React.useState(false);
    const [userId, setUserId] = useState("");

    const { userList } = useSelector((state) => state.userReducer);
    const { user } = useSelector((state) => state.authReducer);
    const { loadUsers, removeUser } = useAction();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const handleClickOpen = (id) => {
        setUserId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteUserHandler = async (id) => {
        handleClose();
        if (user.id === id) {
            toast.error("Ви не можете видалити себе");
            return;
        }
        await removeUser(id);
        loadUsers();
    };

    const { t } = useTranslation();

    const loadUsersHandler = async () => {
        const res = await loadUsers();

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    useEffect(() => {
        loadUsersHandler();
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
                            {t("id")}
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
                            <TableCell align="center">
                                <img
                                    src={`${APP_ENV.USER_IMAGE}${item.image}`}
                                    width="75px"
                                    height="75px"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Link to={`createuser?user=${item.id}`}>
                                    <EditIcon />
                                </Link>
                                <DeleteIcon
                                    onClick={() => handleClickOpen(item.id)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link to="/user/createuser">
                <Button variant="contained">Створити</Button>
            </Link>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Видалення
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Ви впевнені?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="success"
                        autoFocus
                        onClick={handleClose}
                    >
                        Ні
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteUserHandler(userId)}
                        autoFocus
                    >
                        Так
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
};

export default UsersPage;
