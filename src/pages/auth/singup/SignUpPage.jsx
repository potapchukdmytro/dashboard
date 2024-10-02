import React from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAction } from "../../../hooks/useAction";
import { toast } from "react-toastify";

const SignUpPage = () => {
    const { signUp } = useAction();

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Пошта обов'язкова")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Не вірний формат пошти"
            ),
        userName: Yup.string()
            .required("Ім'я користувача обов'язкове"),
        password: Yup.string()
            .required("Вкажіть пароль")
            .min(6, "Мінімальна довжина паролю 6 символів"),
        confirmedPassword: Yup.string()
            .required("Підтвердіть пароль")
            .oneOf([Yup.ref('password')], 'Паролі повинні збігатися.'),
        firstName: Yup.string().required("Вкажіть своє ім'я"),
        lastName: Yup.string().required("Вкажіть своє прізвище"),
    });

    const navigate = useNavigate();

    const submitHadler = async (values) => {
        const result = await signUp(values);
        if(result.success) {
            toast.info("На пошту відправлено лист з підтвердженням")
            navigate("/signin")
        } else {
            toast.error(result.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: "",
            userName: "",
            password: "",
            confirmedPassword: "",
            firstName: "",
            lastName: "",
        },
        onSubmit: submitHadler,
        validationSchema: validationSchema,
        isValid: false
    });

    return (
        <Container component="main" maxWidth="xs" sx={{mb: 4}}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={formik.handleSubmit}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName &&
                            formik.errors.firstName ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.firstName}
                                </div>
                            ) : null}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName &&
                            formik.errors.lastName ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.lastName}
                                </div>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userName"
                                label="User name"
                                name="userName"
                                autoComplete="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.userName && formik.errors.userName ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.userName}
                                </div>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmedPassword"
                                label="Confirmed password"
                                type="password"
                                id="confirmedPassword"
                                value={formik.values.confirmedPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.confirmedPassword &&
                            formik.errors.confirmedPassword ? (
                                <div style={{ color: "red" }}>
                                    {formik.errors.confirmedPassword}
                                </div>
                            ) : null}
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="allowExtraEmails"
                                        color="primary"
                                    />
                                }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!formik.isValid}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpPage;
