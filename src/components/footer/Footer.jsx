import React from "react";

class Footer extends React.Component {
    render() {
        return(
            <h2 style={{textAlign: "center"}}>{this.props.title}</h2>
        );
    };
};

export default Footer;