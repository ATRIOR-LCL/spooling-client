import React from "react";
import '../../assets/css/tip.less';

interface TipProps {
    printerId: number;
}

export default class PrinterTip extends React.Component<TipProps> {
    private TipRef = React.createRef<HTMLDivElement>();
    constructor(props: TipProps) {
        super(props);
    }
    componentDidUpdate(prevProps: Readonly<TipProps>): void {
        if (prevProps.printerId !== this.props.printerId) {

            if (this.TipRef.current) {
                this.TipRef.current.style.opacity = "1";
                setTimeout(() => {
                    this.TipRef.current!.style.opacity = "0";
                }, 1000);
            }
        }
    }
    render(): React.ReactNode {
        return (
            <div className="tip" ref={this.TipRef}>
                成功切换打印机！当前打印机号为 {this.props.printerId} 🎉
            </div>
        )
    }
}