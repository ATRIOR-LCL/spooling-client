import React from "react";
import '../../assets/css/banner.less';
import ThemeButton from "./ThemeButton";
import icpcLogo from '../../assets/images/icpc-logo.webp'
import Info from "./Info";

interface BannerState {
    showInfo: boolean;
}
/**
 * Banner组件，页面顶部的横幅包含ICPC Logo、标题、信息按钮和主题切换按钮
 * @param props - 组件的属性
 * @param props.showInfo - 显示比赛注意信息的函数
 * @returns {React.ReactNode} 返回一个包含横幅内容的JSX元素
 */
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