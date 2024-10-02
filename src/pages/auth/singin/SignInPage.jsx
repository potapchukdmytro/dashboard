import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { useAction } from "../../../hooks/useAction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const SignInPage = () => {
    // const [textShow, setTextShow] = useState(true);

    const { isAuth } = useSelector(store => store.authReducer); 
    const { signIn } = useAction();

    const navigate = useNavigate();

    // submit method
    const handleSubmit = async (values) => {
        const res = await signIn(values);
        if (res.success) {
            navigate("/");
        } else {
            toast.error(res.message);
        };
    };

    // google
    const googleSuccesHandler = (credentials) => {
        const token = credentials.credential;

        signIn(token);

        localStorage.setItem("auth", token);
        navigate("/");
    };

    const gooleErrorHandler = () => {
        console.log("Google auth error");
    };

    // yup validation Schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("Пошта обов'я зкова")
            .matches(
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Не вірний формат пошти"
            ),
        password: Yup.string()
            .required("Вкажіть пароль")
            .min(6, "Мінімальна довжина паролю 6 символів"),
    });

    // create formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <Container component="main" maxWidth="xs" sx={{ mb: 10 }}>
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
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={formik.handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{ color: "red" }}>
                            {formik.errors.email}
                        </div>
                    ) : null}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>
                            {formik.errors.password}
                        </div>
                    ) : null}
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={formik.initialValues.rememberMe}
                                name="rememberMe"
                                onChange={formik.handleChange}
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Box sx={{ mb: 2 }}>
                        <GoogleLogin
                            size="large"
                            width="400px"
                            onSuccess={googleSuccesHandler}
                            onError={gooleErrorHandler}
                        />
                    </Box>
                    <Grid container>
                        <Grid item xs>
                            Forgot password?
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default SignInPage;
