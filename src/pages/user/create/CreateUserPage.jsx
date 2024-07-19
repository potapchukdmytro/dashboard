import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAction } from "../../../hooks/useAction";
import axios from "axios";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const defaultUser = {
    id: 0,
    userName: "",
    email: "",
    role: "user",
    name: "",
    surname: "",
};

const CreateUserPage = () => {
    const { userList, usersLoaded } = useSelector((state) => state.userReducer);
    const [user, setUser] = useState(defaultUser);

    const { loadUsers } = useAction();

    const query = useQuery();
    const id = query.get("user");

    const rowStyle = {
        mt: 1,
    };

    const onSubmitHandler = (values) => {
        console.log(values);
    };

    const formik = useFormik({
        initialValues: {
            userName: user.userName,
            email: user.email,
            role: "user",
            name: user.name,
            surname: user.surname,
        },
        onSubmit: onSubmitHandler,
    });

    useEffect(() => {
        if (!usersLoaded) {
            loadUsers();
        }

        const data = userList.find((element) => element.id == id);
        if (data) {
            setUser(data);
            formik.setFieldValue("name", data.name);
            formik.setFieldValue("surname", data.surname);
            formik.setFieldValue("email", data.email);
            formik.setFieldValue("userName", data.userName);
        }
    }, [usersLoaded]);

    return (
        <form style={{ textAlign: "center" }} onSubmit={formik.handleSubmit}>
            <Box sx={rowStyle}>
                <label htmlFor="userName">Username</label>
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                />
            </Box>

            <Box sx={rowStyle}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
            </Box>

            <Box sx={rowStyle}>
                <label htmlFor="role">Role</label>
                <input
                    id="role"
                    name="role"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.role}
                />
            </Box>
            <Box sx={rowStyle}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </Box>
            <Box sx={rowStyle}>
                <label htmlFor="surname">Surname</label>
                <input
                    id="surname"
                    name="surname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                />
            </Box>
            <Box sx={rowStyle}>
                <button type="submit">Submit</button>
            </Box>
        </form>
    );
};

export default CreateUserPage;
