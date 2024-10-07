import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import { Container, Grid } from "@mui/material";
import Currency from "../../currency/Currency";

const DefaulLayout = () => {
    return (
        <>
            <Navbar />
            <Grid container>
                <Grid item xs={11}>
                <Container sx={{ my: 2, minHeight: "500px" }}>
                    <Outlet />
                </Container>
                </Grid>
                
                <Grid sx={{backgroundColor: "lightcoral", p: 2}} item xs={1}>
                    <Currency />
                </Grid>
            </Grid>
            <Footer />
        </>
    );
};

export default DefaulLayout;
