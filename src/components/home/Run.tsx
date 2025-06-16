import React from "react";
import '../../assets/css/run.less'
import { taskContext } from "../../pages/HomePage";


interface TaskItemType {
    printerId: number;
    fileName: string;
    date: string;
}

interface TaskItemsState {
}

interface TaskCardProps extends TaskItemType {
    toClose: (printerId: number) => void;
}

class TaskCard extends React.Component<TaskCardProps, {}> {
    constructor(props: TaskCardProps) {
        super(props);
        this.state = {};
    }

    render(): React.ReactNode {
        return (
            <div className="run-card">
                <div className="run-card-content">
                    <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-logo" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" /></svg>
                    <div className="run-card-content-text">
                        <header className="run-card-content-text-header">{this.props.fileName}</header>
                        <footer className="run-card-content-text-footer">{this.props.date}</footer>
                    </div>
                    <aside className="run-card-content-aside">
                        <p>Printer - {this.props.printerId}</p>
                        <button className="run-card-content-aside-close" onClick={
                            () => {
                                this.props.toClose(this.props.printerId);
                            }
                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-aside-close-logo" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
                        </button>
                    </aside>
                </div>
            </div>
        )
    }
}



class TaskItems extends React.Component<any, TaskItemsState> {
    constructor(props: any) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        console.log('taskContext value: ', value)
                        return (
                            <div className="run-task">
                                <header className="run-task-header">All current tasks</header>
                                <div className="run-task-items">
                                    <div className="run-task-items-content">
                                        {
                                            value.tasks && value.tasks.length > 0 ? (
                                                value.tasks.map((item, index) => {
                                                    return <TaskCard toClose={value.decreaseTasks} key={index} printerId={item.printerId} fileName={item.fileName} date={item.date} />
                                                })
                                            ) : (
                                                <div className="run-task-items-content-empty">
                                                    <p>There are currently no print tasks 😶</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </taskContext.Consumer>
        )
    }
}

interface OverCardProps {
    fileName: string;
    date: string;
    fileContent: string;
    showCode: (fileContent: string) => void;
}

class OverCard extends React.Component<OverCardProps> {
    constructor(props: OverCardProps) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <div className="run-card">
                <div className="run-card-content" onClick={() => this.props.showCode(this.props.fileContent)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-logo" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" /></svg>
                    <div className="run-card-content-text">
                        <header className="run-card-content-text-header">{this.props.fileName}</header>
                        <footer className="run-card-content-text-footer">{this.props.date}</footer>
                    </div>
                    {/* <aside className="run-card-content-aside">
                        <p>Printer - {this.props.printerId}</p>
                    </aside> */}
                </div>
            </div>
        )
    }
}

class OverItemds extends React.Component {
    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        return (
                            <div className="run-task">
                                <header className="run-task-header">All completed tasks</header>
                                <div className="run-task-items">
                                    <div className="run-task-items-content">
                                        {
                                            value.tasks && value.tasks.length > 0 ? (
                                                value.tasks.map((item, index) => {
                                                    return <OverCard showCode={value.showCode} key={index} fileName={item.fileName} date={item.date} fileContent={item.fileContent} />
                                                })
                                            ) : (
                                                <div className="run-task-items-content-empty">
                                                    <p>There are currently no completed print tasks 😶</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }
            </taskContext.Consumer>
        )
    }
}


export default class Run extends React.Component {
    render(): React.ReactNode {
        return (
            <div className="run">
                <TaskItems />
                <OverItemds />
            </div>
        )
    }
}