import React from "react";
import '../../assets/css/footer.less'
import atrior from '/images/avatar.png'
import coolarec from '/images/cld.png'
export default class Footer extends React.Component {
    render(): React.ReactNode {
        return (
            <footer className="app-footer">
                <p>© 2025 atrior</p><img src={atrior} alt="" className="app-footer-img" /><p>X coolerac</p><img src={coolarec} className="app-footer-img" alt="" /><p>All Rights Reserved.</p>
            </footer>
        )
    }
}