import React from "react";
import '../../assets/css/shift.less'
import { sunPath, moonPath } from "../../configs/svg.config";
interface ThemeButtonState {
    theme: 'light' | 'dark';
}

export default class ThemeButton extends React.Component<any, ThemeButtonState> {
    constructor(props: any) {
        super(props);
        this.state = {
            theme: "light"
        }
    }
    componentDidMount(): void {
        this.toogleTheme();
    }
    private toogleTheme = () => {
        const body = document.body;
        body.classList.toggle("dark-theme");
        const isDark:boolean = body.classList.contains("dark-theme");
        if(isDark) {
            localStorage.setItem("theme", isDark ? "dark" : "light");
            this.setState({ theme: "dark" });
        }else {
            localStorage.setItem("theme", isDark ? "dark" : "light");
            this.setState({ theme: "light" });
        }
    }
    render(): React.ReactNode {

        return (
            <div className={`theme-button theme-${this.state.theme}`} onClick={this.toogleTheme}>
                <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative sun-moon-svg"
                >
                    <g className="sun-rays">
                        <path d="M50 2V11" />
                        <path d="M85 15L78 22" />
                        <path d="M98 50H89" />
                        <path d="M85 85L78 78" />
                        <path d="M50 98V89" />
                        <path d="M23 78L16 84" />
                        <path d="M11 50H2" />
                        <path d="M23 23L16 16" />
                    </g>
                    <path
                        d={this.state.theme === "dark" ? moonPath : sunPath}
                        className="sun-moon"
                    />
                </svg>
            </div>
        )
    }
}