import React from "react";
import '../../assets/css/interface.less';
import eye from '../../assets/images/eye.png';
import eyes from '../../assets/images/eye-s.png';

interface CardProps {
    enterKey: () => void;
}

interface InputVisible {
    isVisible: boolean;
}

class InterfaceCard extends React.Component<CardProps, InputVisible> {
    constructor(props: CardProps) {
        super(props);
        this.state = {
            isVisible: false
        }
    }
    private inputRef = React.createRef<HTMLInputElement>();
    private toVisible = () => {
        this.setState({ isVisible: true });
        if (this.inputRef.current) {
            this.inputRef.current.type = 'text';
        }
    }

    private toHidden = () => {
        this.setState({ isVisible: false });
        if (this.inputRef.current) {
            this.inputRef.current.type = 'password';
        }
    }
    private handleSubmit = () => {
        this.props.enterKey();
    }
    render() {
        return (
            <div className="interface-card">
                <img src="/images/avatar.png" className="interface-avatar" alt="" />
                <h2 className="interface-admin">Administrator</h2>
                <form className="interface-form" action="submit" onSubmit={() => this.handleSubmit()}>
                    <input ref={this.inputRef} type="password" className="interface-form-input" name="" id="" />
                    {
                        this.state.isVisible ? (
                            <img src={eye} className="interface-form-visible" onClick={this.toHidden} alt="" />
                        ) :
                            (
                                <img src={eyes} className="interface-form-visible" onClick={this.toVisible} alt="" />
                            )
                    }
                </form>
            </div>
        );
    }
}

export default InterfaceCard;