import React from "react";
import '../../assets/css/run.less'
import { taskContext } from "../../pages/HomePage";

interface TaskItemType {
    printerId: number;
    fileName: string;
    date: string;
    index: number;
}

interface TaskItemsState {
}

interface TaskCardProps extends TaskItemType {
    toClose: (printerId: number) => void;
}

/**
 * TaskCard组件，显示单个任务卡片
 * @param {TaskCardProps} props - 组件的属性
 * @param {number} props.printerId - 打印机ID
 * @param {string} props.fileName - 文件名
 * @param {string} props.date - 任务日期
 * @param {number} props.index - 任务索引
 * @param {function} props.toClose - 关闭任务的函数
 * @returns {React.ReactNode} 返回一个包含任务卡片的JSX元素
 */
export class TaskCard extends React.Component<TaskCardProps, {}> {
    private cardRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props: TaskCardProps) {
        super(props);
    }

    componentDidMount(): void {
        if (this.cardRef.current) {
            this.cardRef.current.style.transitionDelay = `${this.props.index * 0.1}s`;
        }
    }

    render(): React.ReactNode {
        return (
            <div className="run-card pending" ref={this.cardRef}>
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
                                this.props.toClose(this.props.index);
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


/**
 * TaskItems组件，显示所有当前打印任务
 * * @returns {React.ReactNode} 返回一个包含当前打印任务列表的JSX元素
 */
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
                                            value.tasks === null || value.tasks.length === 0 ? (
                                                <div className="run-task-items-content-empty">
                                                    <p>There are currently no print tasks 😶</p>
                                                </div>
                                            ) : null
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
    transitionDelay: number;
    animate: boolean;
    showCode: (fileContent: string) => void;
}

/**
 * OverCard组件，显示已完成的任务卡片
 * * @param {OverCardProps} props - 组件的属性
 * @param {string} props.fileName - 文件名
 * @param {string} props.date - 任务完成日期
 * @param {string} props.fileContent - 文件内容
 * @param {number} props.transitionDelay - 动画延迟时间
 * @param {boolean} props.animate - 是否启用动画
 * @param {function} props.showCode - 点击卡片时显示代码的函数
 * @returns {React.ReactNode} 返回一个包含已完成任务卡片的JSX元素
 */
class OverCard extends React.Component<OverCardProps> {
    private overCardRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props: OverCardProps) {
        super(props);
    }
    componentDidMount() {
        if (this.props.animate && this.overCardRef.current) {
            setTimeout(() => {
                this.overCardRef.current?.classList.add('over-animate');
            }, 20);
        }
    }
    render(): React.ReactNode {
        return (
            <div className="run-card over" ref={this.overCardRef}>
                <div className="run-card-content" onClick={() => this.props.showCode(this.props.fileContent)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-logo" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" /></svg>
                    <div className="run-card-content-text">
                        <header className="run-card-content-text-header">{this.props.fileName}</header>
                        <footer className="run-card-content-text-footer">{this.props.date}</footer>
                    </div>
                    <aside className="run-card-content-aside">
                        <p>Preview Code</p>
                    </aside>
                </div>
            </div>
        )
    }
}

/**
 * OverItemds组件，显示所有已完成的任务
 * @returns {React.ReactNode} 返回一个包含已完成任务列表的JSX元素
 * 
 */
class OverItemds extends React.Component<any, { animate: boolean }> {
    constructor(params: any) {
        super(params);
        this.state = {
            animate: false
        };

    }

    componentDidMount(): void {
        setTimeout(() => {
            this.setState({
                animate: true
            })
        }, 0);
    }

    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        let disabled = true;
                        if (value.successTasks && value.successTasks.length > 0) {
                            disabled = false;
                        }
                        return (
                            <div className="run-task">
                                <header className="run-task-header">All completed tasks</header>
                                <div className="run-task-items">
                                    <div className="run-task-buttons">
                                        <button onClick={value.clearOverallTasks} disabled={disabled} className="run-task-buttons-clear">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-color)"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" /></svg>
                                        </button>
                                        <button className="run-task-buttons-download" disabled={disabled}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-color)"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
                                        </button>
                                    </div>
                                    <div className="run-task-items-content">
                                        {
                                            value.successTasks && value.successTasks.length > 0 ? (
                                                value.successTasks.map((item, index) => {
                                                    return <OverCard animate={this.state.animate} transitionDelay={index} showCode={() => value.showCode(item.fileContent, item.printerId === 3 ? true : false)} key={index} fileName={item.fileName} date={item.date} fileContent={item.fileContent} />
                                                })
                                            ) : (
                                                <div className="run-task-items-content-empty">
                                                    <p>Please select code files and start printing ☺️</p>
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

/**
 * Run组件，显示当前打印任务和已完成任务
 * @returns {React.ReactNode} 返回一个包含任务列表和已完成任务列表的JSX元素
 * @see {@link TaskItems} 任务列表组件
 * @see {@link OverItemds} 已完成任务列表组件
 * @see {@link taskContext} 任务上下文，用于在组件树中共享任务状态
 * @see {@link TaskItemType} 任务项类型，用于定义任务项的结构
 * @see {@link TaskCard} 任务卡片组件，用于显示单个任务项
 * @see {@link OverCard} 已完成任务卡片组件，用于显示已完成的任务项
 * @see {@link OverItemds} 已完成任务列表组件，用于显示所有已完成的任务
 * * @see {@link TaskItemsState} 任务列表组件的状态类型
 * * @see {@link TaskCardProps} 任务卡片组件的属性类型
 * * @see {@link OverCardProps} 已完成任务卡片组件的属性类型
 * * @see {@link Run} 运行组件，用于处理打印机任务和显示任务状态
 * * @see {@link taskContext} 任务上下文，用于在组件树中共享任务状态
 * * @see {@link TaskItemType} 任务项类型，用于定义任务项的结构
 * * * @see {@link TaskCard} 任务卡片组件，用于显示单个任务项
 * * @see {@link OverCard} 已完成任务卡片组件，用于显示已完成的任务项
 * * @see {@link OverItemds} 已完成任务列表组件，用于显示所有已完成的任务
 * * @see {@link TaskItemsState} 任务列表组件的状态类型
 * * @see {@link TaskCardProps} 任务卡片组件的属性类型
 * * @see {@link OverCardProps} 已完成任务卡片组件的属性类型
 */
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