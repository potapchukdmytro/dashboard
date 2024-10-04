import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box, TextField, Typography, Checkbox, Button } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAction } from "../../../hooks/useAction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const defaultUser = {
    id: 0,
    userName: "",
    email: "",
    role: "user",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    emailConfirmed: true,
    phoneNumberConfirmed: false,
};

const CreateUserPage = () => {
    const [user, setUser] = useState(defaultUser);
    const { roles } = useSelector((state) => state.userReducer);
    const { getUser, loadRoles, updateUser, createUser } = useAction();
    const navigate = useNavigate();

    const query = useQuery();
    const id = query.get("user");

    let title = "Створення нового користувача";
    let sumbitButtonText = "Створити";

    if (id != null) {
        title = "Редагування користувача";
        sumbitButtonText = "Зберегти";
    }

    const onSubmitHandler = async (values) => {
        const model = { ...values, role: user.role, id: user.id };
        
        if(id != null) {
            const result = await updateUser(model);
            if(!result.success) {
                toast.error(result.message);
                return;
            }
        } else {
            const result = await createUser(model);
            if(!result.success) {
                toast.error(result.message);
                return;
            }
        }
        navigate("/user");
    };

    const roleChangeHandler = (roleName) => {
        setUser({ ...user, role: roleName });
    };

    const formik = useFormik({
        initialValues: user,
        onSubmit: onSubmitHandler,
    });

    const readUser = async (userId) => {
        const result = await getUser(userId);

        if (result.success) {
            setUser(result.user);
            return result.user;
        } else {
            toast.error(result.message);
        }
    };

    useEffect(() => {
        loadRoles();

        if (id != null) {
            readUser(id).then((data) => {
                formik.setFieldValue("firstName", data.firstName);
                formik.setFieldValue("lastName", data.lastName);
                formik.setFieldValue("email", data.email);
                formik.setFieldValue("userName", data.userName);
                formik.setFieldValue("phoneNumber", data.phoneNumber);
                formik.setFieldValue("emailConfirmed", data.emailConfirmed);
                formik.setFieldValue(
                    "phoneNumberConfirmed",
                    data.phoneNumberConfirmed
                );
            });
        }
    }, []);

    return (
        <Box sx={{ margin: "auto", width: "50%" }}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
                {title}
            </Typography>
            <form
                style={{ textAlign: "center" }}
                onSubmit={formik.handleSubmit}
            >
                <Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Ім'я користувача"
                        name="userName"
                        autoComplete="username"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.userName}
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Пошта"
                        name="email"
                        autoComplete="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box sx={{ textAlign: "start" }}>
                    <label>Підвтердити пошту</label>
                    <Checkbox
                        {...label}
                        id="emailConfirmed"
                        name="emailConfirmed"
                        checked={formik.values.emailConfirmed}
                        onChange={formik.handleChange}
                    />
                </Box>
                <Box>
                    <TextField
                        type="password"
                        margin="normal"
                        fullWidth
                        id="password"
                        label="Пароль"
                        name="password"
                        autoComplete="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="Ім'я"
                        name="firstName"
                        autoComplete="given-name"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Прізвище"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="phoneNumber"
                        label="Телефон"
                        name="phoneNumber"
                        autoComplete="tel"
                        onChange={formik.handleChange}
                        value={
                            formik.values.phoneNumber === null
                                ? ""
                                : formik.values.phoneNumber
                        }
                        onBlur={formik.handleBlur}
                    />
                </Box>
                <Box sx={{ textAlign: "start" }}>
                    <label>Підвтердити телефон</label>
                    <Checkbox
                        {...label}
                        id="phoneNumberConfirmed"
                        name="phoneNumberConfirmed"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumberConfirmed}
                    />
                </Box>
                <Box>
                    <div
                        style={{
                            textAlign: "left",
                            fontSize: "1.2em",
                            fontWeight: "bold",
                        }}
                    >
                        Ролі
                    </div>
                    {roles.map((role) => (
                        <Box key={role.id} sx={{ textAlign: "start" }}>
                            <label>{role.name}</label>
                            <Checkbox
                                {...label}
                                id={role.name}
                                name={role.name}
                                checked={role.name === user.role}
                                onChange={() => roleChangeHandler(role.name)}
                            />
                        </Box>
                    ))}
                </Box>
                <Box>
                    <Button type="sumbit" variant="contained">
                        {sumbitButtonText}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default CreateUserPage;
