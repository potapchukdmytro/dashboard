import React from "react";
import { LigthRedButton } from "../../components/buttons/buttons";

export default function MainPage() {
    const h1Style = {
        textAlign: "center",
    };

    const title = "Перший проект на React";
    const imgUrl =
        "https://thumbs.dreamstime.com/b/smiling-sun-illustration-character-34434947.jpg";

    return (
        <div>
            <h1 style={h1Style}>Main page</h1>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <div style={{ textAlign: "center" }}>
                <img width={200} src={imgUrl} alt="" />
                <br />
                <input type="text" />
            </div>
            <div style={{textAlign: "center"}}>
                <LigthRedButton text="red button" />
            </div>
        </div>
    );
}
