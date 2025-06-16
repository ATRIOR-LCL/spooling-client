import React from "react";
import '../../assets/css/banner.less';
import ThemeButton from "./ThemeButton";
import icpcLogo from '../../assets/images/icpc-logo.webp'
import Info from "./Info";

interface BannerState {
    showInfo: boolean;
}
class Banner extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            showInfo: false
        }
    }
    private showInfo = () => {
        this.setState((prevState: BannerState) => ({
            showInfo: !prevState.showInfo
        }));
    }
    render(): React.ReactNode {
        return (
            <header className="banner">
                <div className="logo">
                    <img src={icpcLogo} alt="ICPC Logo" className="icpc-logo" />
                </div>
                <p className="banner-content">
                    ACM International Collegiate Programming Contest Typing System 🎈
                </p>
                <div className="banner-right">
                    <Info showInfo={this.showInfo} />
                    <ThemeButton />
                </div>
            </header>
        );
    }
}

export default Banner;