import "./App.css";

const App = () => {
    const h1Style = {
        textAlign: "center",
    };

    const title = "Перший проект на React";
    const imgUrl =
        "https://thumbs.dreamstime.com/b/smiling-sun-illustration-character-34434947.jpg";
    return (
        <>
            <div>
                <h1 style={h1Style}>Main page</h1>
                <h2 style={{ textAlign: "center" }}>{title}</h2>
                <div>
                    <img width={200} src={imgUrl} alt="" />
                    <input type="text" />
                </div>
            </div>
        </>
    );
};

export default App;
