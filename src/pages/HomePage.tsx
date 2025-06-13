import React from "react";
import '../assets/css/home.less';
import PrinterCard from "../components/home/PrinterCard";


class HomePage extends React.Component {
    render() {
        return (
            <div className="home">
                <main className="home-main">
                    <section className="home-main-section">
                        <PrinterCard />
                    </section>
                    <section className="home-main-section"></section>
                </main>
            </div>
        )
    }
}

export default HomePage;