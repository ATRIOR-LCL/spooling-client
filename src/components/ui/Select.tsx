import React from "react";
import '../../assets/css/select.less'
import { taskContext } from "../../context/taskContext";

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
                        requestAnimationFrame(() => {
                            const select = document.querySelector('.select') as HTMLDivElement;
                            document.addEventListener('click', (e) => {
                                const target = e.target as HTMLElement;
                                const selectButton = document.querySelector('.pt-operation-handle-form') as HTMLDivElement;
                                const selectPrinter = document.querySelector('.pt-operation-handle-select') as HTMLDivElement;
                                const PrinterCard = document.querySelector('.pt-operation-items') as HTMLDivElement;
                                if (!selectButton.contains(target) && !selectPrinter.contains(target) && !select.contains(target) && !PrinterCard.contains(target)) {
                                    select.style.transform = "translateX(-100%)";
                                    select.addEventListener('transitionend', () => {
                                        value.closeSelect();
                                    })
                                }
                            })
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
                                    Please paste or upload your code 📑
                                </header>
                                <div className="select-paste">
                                    <div className="select-paste-input">
                                        <header className="select-paste-input-header">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-color)"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm280-560q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/></svg>
                                            <p>File Name:</p>
                                        </header>
                                        <input type="text" className="select-paste-input-content" />
                                    </div>
                                    <textarea onBlur={this.handlePaste} name="" id="" className="select-paste-content" style={{ resize: 'none' }}></textarea>
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
                                        <p>Select a File</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-color)"><path d="M330-240q-104 0-177-73T80-490q0-104 73-177t177-73h370q75 0 127.5 52.5T880-560q0 75-52.5 127.5T700-380H350q-46 0-78-32t-32-78q0-46 32-78t78-32h370v80H350q-13 0-21.5 8.5T320-490q0 13 8.5 21.5T350-460h350q42-1 71-29.5t29-70.5q0-42-29-71t-71-29H330q-71-1-120.5 49T160-490q0 70 49.5 119T330-320h390v80H330Z"/></svg>
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