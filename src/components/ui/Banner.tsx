import React from "react";
import '../../assets/css/banner.less';
import ThemeButton from "./ThemeButton";
import icpcLogo from '../../assets/images/icpc-logo.webp'
class Banner extends React.Component {
    render(): React.ReactNode {
        return (
            <header className="banner">
                <div className="logo">
                    <img src={icpcLogo} alt="ICPC Logo" className="icpc-logo"/>
                </div>
                <p className="banner-content">
                    ACM International Collegiate Programming Contest Typing System 🎈
                </p>
                <ThemeButton/>
            </header>
        );
    }
}

export default Banner;