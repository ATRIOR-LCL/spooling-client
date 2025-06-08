import React from "react";
import '../../assets/css/banner.less';


class Banner extends React.Component {
    render(): React.ReactNode {
        return (
            <header className="banner">
                <p className="banner-content">
                    ACM International Collegiate Programming Contest Typing System 🎈
                </p>
            </header>
        );
    }
}

export default Banner;