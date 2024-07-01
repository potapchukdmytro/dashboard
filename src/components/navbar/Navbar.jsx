import React from "react";
import { AppBar, Box, Button } from "@mui/material";
import logo from "./images/logo.png";
import { btnPageStyle } from "./style";

const Navbar = () => {
    // деструктизація
    const obj = { name: "John", surname: "Thomson", age: 20, height: 200 };
    const { name, surname } = obj;

    const clickHandler = (e) => {
        console.log(e.target.innerText);
    };

    return (
        // sx === style
        <AppBar position="static">
            <Box display="flex" sx={{ alignItems: "center", height: "100px" }}>
                <Box sx={{ flexGrow: 1, textAlign: "center" }}>
                    <img width={150} src={logo} alt="image" />
                </Box>
                <Box
                    display="flex"
                    sx={{ flexGrow: 7, justifyContent: "space-evenly" }}
                >
                    <Button sx={btnPageStyle} onClick={clickHandler}>
                        Головна сторінка
                    </Button>
                    <Button sx={btnPageStyle} onClick={clickHandler}>
                        Користувачі
                    </Button>
                    <Button sx={btnPageStyle} onClick={clickHandler}>
                        Сторінка 2
                    </Button>
                    <Button sx={btnPageStyle} onClick={clickHandler}>
                        Сторінка 3
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: "end", mr: 2 }}>
                    <Button sx={{color: "black"}}>Увійти</Button>
                    <Button sx={{color: "black"}}>Зареєструватися</Button>
                </Box>
            </Box>
        </AppBar>
    );
};

export default Navbar;
