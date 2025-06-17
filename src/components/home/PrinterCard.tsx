import React, { type MouseEventHandler } from "react";
import '../../assets/css/printer.less'
import { taskContext } from "../../pages/HomePage";

interface PrinterCardState {
    printerName: string;
    printerId: number;
    printerSerialNumber: number;
    printerStatus: string;
    color: boolean;
}
interface PrinterItemsProps {
    name: string;
    seriesalNumber: number;
}

interface PrinterHandleProps {
    printerId: number;
    changeNumber: (id: number) => void;
}

interface PrinterHandleState {
    fileName: string;
    fileContent: string;
    date: string;
}

interface PrinterDetalsProps {
    id: number;
    color: boolean;
}



class OperationItems extends React.Component<PrinterItemsProps> {
    constructor(props: PrinterItemsProps) {
        super(props);
        this.state = {};
    }
    render(): React.ReactNode {
        return (
            <div className="pt-operation-items">
                <div className="pt-operation-item item-primary" >
                    <div className="pt-operation-item-content">
                        <header className="pt-operation-item-content-head">
                            <small className="pt-operation-item-content-head-small">{this.props.name}</small>
                            预祝各位选手比赛顺利 🤗
                        </header>
                        <main className="pt-operation-item-content-body">
                            <p>Serial Number：**** **** {this.props.seriesalNumber}</p>
                            <aside className="pt-operation-item-content-body-aside">
                                <p>East A Zone</p>
                                <p><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fefefe"><path d="M360-266h230q14 0 23.5-6t16.5-18l78-182q2-5 3.5-15t1.5-15v-24q0-14-6.5-20.5T686-553H472l29-138q2-8 0-15t-7-12l-21-22-161 174-8 16q-4 8-4 17v207q0 23 18 41.5t42 18.5ZM480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-156t86-127Q252-817 325-848.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Zm0-60q142 0 241-99.5T820-480q0-142-99-241t-241-99q-141 0-240.5 99T140-480q0 141 99.5 240.5T480-140Zm0-340Z" /></svg></p>
                            </aside>
                        </main>
                        <footer className="pt-operation-item-content-foot">
                            NO EFFORT GOES IN VAIN
                        </footer>
                    </div>
                    <div className="pt-operation-item-bac">
                        <div className="pt-operation-item-bac-textture">
                            <div className="pt-operation-item-bac-textture-one"></div>
                            <div className="pt-operation-item-bac-textture-two"></div>
                            <div className="pt-operation-item-bac-textture-three"></div>
                        </div>
                    </div>
                </div>
                <div className="pt-operation-item item-second"></div>
                <div className="pt-operation-item item-third"></div>
            </div>
        )
    }
}

class OperationHandle extends React.Component<PrinterHandleProps, PrinterHandleState> {
    fileInputRef = React.createRef<HTMLInputElement>();
    constructor(props: PrinterHandleProps) {
        super(props);
        this.state = {
            fileName: "",
            fileContent: "",
            date: ""
        };
    }

    handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, increase: Function) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileName = file.name;
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result;
                if (content) {
                    const date = new Date().toLocaleString();
                    this.setState({
                        fileName,
                        fileContent: content as string,
                        date
                    });

                    increase(
                        this.props.printerId,
                        fileName,
                        date,
                        content,
                    );
                    console.log(`File content: ${content}`);

                    if (this.fileInputRef.current) {
                        this.fileInputRef.current.value = "";
                    }
                }
            };
            reader.onerror = (error) => {
                console.error("Error reading file:", error);
            };
            reader.readAsText(file);
        } else {
            console.log("No file selected.");
        }
    };

    startPrinting = (e: MouseEvent) => {
        e.preventDefault();
        const tasksItems = document.querySelectorAll('.pending') as NodeListOf<HTMLElement>;
        if (tasksItems.length > 0) {
            tasksItems.forEach((item) => {
                item.style.transform = 'translateX(150%)'
                item.style.opacity = '0';
            })
        }
    }

    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        return (
                            <div className="pt-operation-handle">
                                <div className="pt-operation-handle-select" tabIndex={1}>
                                    <p className="pt-operation-handle-select-btn">Select Printer</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="pt-operation-handle-select-logo" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" /></svg>
                                    <div className="pt-operation-handle-select-box">
                                        <p className="pt-operation-handle-select-box-item" onClick={() => this.props.changeNumber(1)}>1</p>
                                        <p className="pt-operation-handle-select-box-item" onClick={() => this.props.changeNumber(2)}>2</p>
                                        <p className="pt-operation-handle-select-box-item" onClick={() => this.props.changeNumber(3)}>3</p>
                                    </div>
                                </div>
                                <form className="pt-operation-handle-form">
                                    <label className="pt-operation-handle-form-select" htmlFor="select">
                                        <p className="pt-operation-handle-form-select-group">
                                            <span className="pt-operation-handle-form-select-p">Select File</span>
                                            <span className="pt-operation-handle-form-select-p"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" /></svg></span>
                                        </p>
                                    </label>
                                    <input type="file" name="" id="select" style={{ display: "none" }} ref={this.fileInputRef} onChange={(e) => this.handleFileChange(e, value.increaseTasks)} />
                                </form>
                                <form className="pt-operation-handle-form">
                                    <button className="pt-operation-handle-form-submit" disabled={
                                        value.tasks && value.tasks.length > 0 ? false : true
                                    } onClick={(e)=>this.startPrinting(e.nativeEvent)}>
                                        <p className="pt-operation-handle-form-submit-group">
                                            <span className="pt-operation-handle-form-submit-p">Start Printing !</span>
                                            <span className="pt-operation-handle-form-submit-p"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="m187-551 106 45q18-36 38.5-71t43.5-67l-79-16-109 109Zm154 81 133 133q57-26 107-59t81-64q81-81 119-166t41-192q-107 3-192 41T464-658q-31 31-64 81t-59 107Zm229-96q-20-20-20-49.5t20-49.5q20-20 49.5-20t49.5 20q20 20 20 49.5T669-566q-20 20-49.5 20T570-566Zm-15 383 109-109-16-79q-32 23-67 43.5T510-289l45 106Zm326-694q9 136-34 248T705-418l-2 2-2 2 22 110q3 15-1.5 29T706-250L535-78l-85-198-170-170-198-85 172-171q11-11 25-15.5t29-1.5l110 22q1-1 2-1.5t2-1.5q99-99 211-142.5T881-877ZM149-325q35-35 85.5-35.5T320-326q35 35 34.5 85.5T319-155q-26 26-80.5 43T75-80q15-109 31.5-164t42.5-81Zm42 43q-14 15-25 47t-19 82q50-8 82-19t47-25q19-17 19.5-42.5T278-284q-19-18-44.5-17.5T191-282Z" /></svg></span>
                                        </p>
                                    </button>
                                </form>
                            </div>
                        )
                    }
                }

            </taskContext.Consumer>
        )
    }
}

class PrinterDetails extends React.Component<PrinterDetalsProps> {
    constructor(props: PrinterDetalsProps) {
        super(props);
        this.state = {};
    }
    render(): React.ReactNode {
        return (
            <div className="pt-detail">
                <div className="pt-detail-device">
                    <header className="pt-detail-device-name">
                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" className="pt-detail-device-name-svg"><path d="M658-648v-132H302v132h-60v-192h476v192h-60Zm-518 60h680-680Zm599 95q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm-81 313v-192H302v192h356Zm60 60H242v-176H80v-246q0-45.05 30.5-75.53Q141-648 186-648h588q45.05 0 75.53 30.47Q880-587.05 880-542v246H718v176Zm102-236v-186.21Q820-562 806.78-575q-13.23-13-32.78-13H186q-19.55 0-32.77 13.22Q140-561.55 140-542v186h102v-76h476v76h102Z" /></svg>
                        <p>{this.props.id} 号打印机</p>
                        <div className="pt-detail-device-name-state"></div>
                    </header>
                    <main className="pt-detail-device-body">
                        <ul className="pt-detail-device-body-items">
                            <li className="pt-detail-device-body-items-i">❓ 设备类型：</li>
                            <li className="pt-detail-device-body-items-i">{this.props.color ? '彩色打印机' : '黑白打印机'}</li>
                        </ul>
                        <ul className="pt-detail-device-body-items">
                            <li className="pt-detail-device-body-items-i">💬 设备运行状态：</li>
                            <li className="pt-detail-device-body-items-i">Pending</li>
                        </ul>
                        <ul className="pt-detail-device-body-items">
                            <li className="pt-detail-device-body-items-i">📃 当前打印任务数：</li>
                            <li className="pt-detail-device-body-items-i">0</li>
                        </ul>
                        <ul className="pt-detail-device-body-items">
                            <li className="pt-detail-device-body-items-i">🎊 成功打印数：</li>
                            <li className="pt-detail-device-body-items-i">0</li>
                        </ul>
                        <ul className="pt-detail-device-body-items">
                            <li className="pt-detail-device-body-items-i">📌 失败打印数：</li>
                            <li className="pt-detail-device-body-items-i">0</li>
                        </ul>
                    </main>
                </div>
            </div>
        )
    }
}

export default class PrinterCard extends React.Component<any, PrinterCardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            printerName: "Printer - 1",
            printerId: 1,
            printerSerialNumber: 5500,
            printerStatus: "Pending",
            color: false,
            // tasks: null
        };
    }

    private setPrinter = (id: number) => {
        this.setState({
            printerId: id,
            printerName: `Printer - ${id}`,
            printerSerialNumber: 5500 + id,
            color: id === 3 ? true : false
        })
    }

    render(): React.ReactNode {
        return (
            <div className="pt">
                <div className="pt-operation">
                    <OperationItems name={this.state.printerName} seriesalNumber={this.state.printerSerialNumber} />
                    <OperationHandle changeNumber={this.setPrinter} printerId={this.state.printerId} />
                </div>
                <PrinterDetails id={this.state.printerId} color={this.state.color} />
            </div>
        )
    }
}