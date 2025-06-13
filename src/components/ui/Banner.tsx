import React from "react";
import '../../assets/css/banner.less';
import ThemeButton from "./ThemeButton";

class Banner extends React.Component {
    render(): React.ReactNode {
        return (
            <header className="banner">
                <div className="logo"></div>
                <p className="banner-content">
                    ACM International Collegiate Programming Contest Typing System 🎈
                </p>
                <ThemeButton/>
            </header>
        );
    }
}

export default Banner;