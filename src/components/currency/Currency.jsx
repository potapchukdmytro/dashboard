import axios from "axios";
import { useEffect, useState } from "react";
import { APP_ENV } from "../../env";
import { use } from "i18next";

const initValue = {
    ccy: "EUR",
    base_ccy: "UAH",
    buy: "0",
    sale: "0",
};

const Currency = () => {
    const [USD, setUSD] = useState(initValue);
    const [EUR, setEUR] = useState(initValue);

    const getCurency = async () => {
        try {
            const response = await axios.get(
                `${APP_ENV.REMOTE_API_HOST_NAME}tools/currency`
            );
            const { data } = response;
            const currency = data.payload;
            const usd = currency.find(c => c.ccy === "USD");
            usd.buy = parseFloat(usd.buy).toFixed(2);
            usd.sale = parseFloat(usd.sale).toFixed(2);

            const eur = currency.find(c => c.ccy === "EUR");
            eur.buy = parseFloat(eur.buy).toFixed(2);
            eur.sale = parseFloat(eur.sale).toFixed(2);

            setUSD(usd);
            setEUR(eur);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCurency();
    }, []);

    return (
        <>
            <div style={{ textAlign: "center", border: "3px double black", margin: "1px" }}>
                <h3>USD</h3>
                <h4>Купівля: {USD.buy}</h4>
                <h4>Продаж: {USD.sale}</h4>
            </div>

            <div style={{ textAlign: "center", border: "3px double black", margin: "1px" }}>
                <h3>EUR</h3>
                <h4>Купівля: {EUR.buy}</h4>
                <h4>Продаж: {EUR.sale}</h4>
            </div>
        </>
    );
};

export default Currency;
