import React from "react";
import '../../assets/css/select.less'
import { taskContext } from "../../pages/HomePage";

interface SelectState {
    isPaste: boolean;
}

export default class Select extends React.Component<any, SelectState> {
    private fileInputRef = React.createRef<HTMLInputElement>();
    constructor(props: any) {
        super(props);
        this.state = {
            isPaste: false
        }
    }
    private handlePaste = () => {
        const value = (document.querySelector('.select-paste-content') as HTMLTextAreaElement).value;
        if (value.trim() === "") {
            this.setState({
                isPaste: false
            })
        } else {
            this.setState({
                isPaste: true
            })
        }
    }

    componentDidMount() {
        const select = document.querySelector('.select') as HTMLDivElement;
        setTimeout(() => {
            select.style.transform = "translateX(0)";
        }, 0);

    }

    componentWillUnmount(): void {
        const select = document.querySelector('.select') as HTMLDivElement;
        select.removeEventListener("transitionend", () => { });
        document.removeEventListener('click', () => { })
    }

    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        const select = document.querySelector('.select') as HTMLDivElement;
                        document.addEventListener('click', (e) => {
                            const target = e.target as HTMLElement;
                            const selectButton = document.querySelector('.pt-operation-handle-form') as HTMLDivElement;
                            const selectPrinter = document.querySelector('.pt-operation-handle-select') as HTMLDivElement;
                            if (!selectButton.contains(target) && !selectPrinter.contains(target) && !select.contains(target)) {
                                select.style.transform = "translateX(-100%)";
                                select.addEventListener('transitionend', () => {
                                    value.closeSelect();
                                })
                            }
                        })
                        const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, increase: Function) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                const _fileName = file.name;
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const content = e.target?.result;
                                    if (content) {
                                        const date = new Date().toLocaleString();

                                        increase(
                                            this.props.printerId,
                                            _fileName,
                                            date,
                                            content as string, // Ensure content is treated as a string

                                        );
                                        console.log(`Team name: ${this.props.teamName}`);
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
                        return (
                            <div className="select">
                                <header className="select-header">
                                    Please paste or upload your code
                                </header>
                                <div className="select-paste">
                                    <div className="select-paste-input">
                                        <header className="select-paste-input-header">
                                            File Name:
                                        </header>
                                        <input type="text" className="select-paste-input-content" />
                                    </div>
                                    <textarea onBlur={this.handlePaste} name="" id="" className="select-paste-content" style={{resize: 'none'}}></textarea>
                                    <button className="select-paste-button" disabled={this.state.isPaste ? false : true} onClick={() => {
                                        const nowTime = new Date();
                                        value.increaseTasks(
                                            value.currentPrinter,
                                            (document.querySelector('.select-paste-input-content') as HTMLInputElement).value.trim() || "Untitled", // file name
                                            nowTime.toLocaleDateString() + " " + nowTime.toLocaleTimeString(), // file time
                                            (document.querySelector('.select-paste-content') as HTMLTextAreaElement).value,  // file content
                                            value.currentTeamName
                                        )
                                    }}>OK</button>
                                </div>
                                <form className="select-form">
                                    <label className="select-form-lable" htmlFor="select">
                                        select a file
                                    </label>
                                    <input type="file" name="" id="select" ref={this.fileInputRef} style={{ display: "none" }} onChange={
                                        (event) => handleFileChange(event, value.increaseTasks)
                                    } />
                                </form>
                            </div>
                        )
                    }
                }
            </taskContext.Consumer>
        )
    }
}