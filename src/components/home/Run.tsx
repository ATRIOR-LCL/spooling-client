import React from "react";
import '../../assets/css/run.less'
// import { taskContext } from "../../pages/HomePage";
import { taskContext } from "../../context/taskContext";
import axios from "axios";

interface TaskItemType {
    printerId: number;
    fileName: string;
    date: string;
}

interface TaskCardProps extends TaskItemType {
    index: number;
    className?: string;
    forwardedRef?: React.Ref<HTMLDivElement>;
    onTransitionEnd?: (e: React.TransitionEvent<HTMLDivElement>) => void;
    toClose: () => void;
}

interface TaskCardState {
    state: 'pending' | 'waiting' | 'finished';
    taskId?: number;
    lastKnownStatus: string; // 添加用于跟踪上一次状态的字段
}

export class TaskCard extends React.Component<TaskCardProps, TaskCardState> {
    static contextType = taskContext;
    declare context: React.ContextType<typeof taskContext>;

    constructor(props: TaskCardProps) {
        super(props);
        this.state = {
            state: 'pending',
            taskId: undefined,
            lastKnownStatus: 'pending' // 初始化为默认值，在 componentDidMount 中获取真实状态
        };
    }

    componentDidMount() {
        // 在组件挂载后，获取并设置初始状态
        const currentStatus = this.getTaskStatus(this.props.index);
        this.setState({ lastKnownStatus: currentStatus });
    }

    componentDidUpdate(_prevProps: TaskCardProps) {
        const currentStatus = this.getTaskStatus(this.props.index);
        const prevStatus = this.state.lastKnownStatus;

        // 如果状态发生了变化，更新存储的状态
        if (currentStatus !== prevStatus) {
            this.setState({ lastKnownStatus: currentStatus });

            // 检查是否从非success状态变为success状态
            if (currentStatus === 'success' && prevStatus !== 'success') {
                this.props.toClose();

            }
        }
    }

    getTaskStatus(index: number): string {
        const { tasks } = this.context;
        const task = tasks?.find(task => task.index === index);
        return task?.state || 'pending';
    }

    render(): React.ReactNode {
        const { fileName, date, printerId, forwardedRef, onTransitionEnd } = this.props;
        const task = this.context.tasks?.find(task => task.index === this.props.index);
        const status = task?.state || 'pending';
        const removing = task?.removing ?? false;

        return (
            <div onTransitionEnd={onTransitionEnd} className={`run-card ${removing ? 'removing' : ''}`} ref={forwardedRef}>
                <div className="run-card-content">
                    <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-logo" height="24px" viewBox="0 -960 960 960" width="24px">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
                    </svg>
                    <div className="run-card-content-text">
                        <header className="run-card-content-text-header">{fileName}</header>
                        <footer className="run-card-content-text-footer">{date}</footer>
                    </div>
                    <aside className="run-card-content-aside">
                        <p>Printer - {printerId}</p>
                        {status === 'pending' ? (
                            <button className="run-card-content-aside-close" onClick={() => this.props.toClose()}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-aside-close-logo" height="24px" viewBox="0 -960 960 960" width="24px">
                                    <path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                                </svg>
                            </button>
                        ) : status === 'waiting' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" className="run-card-content-aside-close-logo run-card-content-aside-close-logo-waiting " viewBox="0 -960 960 960" width="24px" fill="#ff1900">
                                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                            </svg>
                        ) : (
                            status === 'success' ? (null) : (
                                <svg className="run-card-content-aside-close-logo" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff1900">
                                    <path d="M240-80v-170q-39-17-68.5-45.5t-50-64.5q-20.5-36-31-77T80-520q0-158 112-259t288-101q176 0 288 101t112 259q0 42-10.5 83t-31 77q-20.5 36-50 64.5T720-250v170H240Zm80-80h40v-80h80v80h80v-80h80v80h40v-142q38-9 67.5-30t50-50q20.5-29 31.5-64t11-74q0-125-88.5-202.5T480-800q-143 0-231.5 77.5T160-520q0 39 11 74t31.5 64q20.5 29 50.5 50t67 30v142Zm100-200h120l-60-120-60 120Zm-80-80q33 0 56.5-23.5T420-520q0-33-23.5-56.5T340-600q-33 0-56.5 23.5T260-520q0 33 23.5 56.5T340-440Zm280 0q33 0 56.5-23.5T700-520q0-33-23.5-56.5T620-600q-33 0-56.5 23.5T540-520q0 33 23.5 56.5T620-440ZM480-160Z" />
                                </svg>
                            )
                        )}
                    </aside>
                </div>
            </div>
        );
    }
}


interface TasksItemsInterface {
    tasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string, index: number, removing: boolean, taskId?: number | null, state: string }> | null;
}

/**
 * TaskItems组件，显示所有当前打印任务
 * * @returns {React.ReactNode} 返回一个包含当前打印任务列表的JSX元素
 */
class TaskItems extends React.Component<TasksItemsInterface> {
    cardRefs: Map<number, React.RefObject<HTMLDivElement>> = new Map();
    prevRects: Map<number, DOMRect> = new Map();

    constructor(props: TasksItemsInterface) {
        super(props);
    }


    getCardRef = (index: number) => {
        if (!this.cardRefs.has(index)) {
            this.cardRefs.set(index, React.createRef<HTMLDivElement>());
        }
        return this.cardRefs.get(index)!;
    };

    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        return (
                            <div className="run-task">
                                <header className="run-task-header">All current tasks</header>
                                <div className="run-task-items">
                                    <div className="run-task-items-content">
                                        {
                                            value.tasks && value.tasks.length > 0 ? (
                                                value.tasks.map(task => (
                                                    <TaskCard
                                                        key={task.index}
                                                        fileName={task.fileName}
                                                        date={task.date}
                                                        printerId={task.printerId}
                                                        forwardedRef={this.getCardRef(task.index)}
                                                        toClose={() => value.setPerndingTask(task.index)}
                                                        className={value.tasks?.find(t => t.index === task.index)?.removing ? 'removing' : ''}
                                                        index={task.index} onTransitionEnd={(e: React.TransitionEvent<HTMLDivElement>) => {
                                                            // 只在 transform 动画结束时执行删除逻辑
                                                            if (task.removing && e.propertyName === 'transform') {
                                                                requestAnimationFrame(() => {
                                                                    value.decreaseTasks(task.index);
                                                                })
                                                            }
                                                        }}
                                                    />
                                                ))
                                            ) :
                                                (
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
    teamName: string;
    printerId: number;
    taskId?: number;
    transitionDelay: number;
    animate: boolean;
    showCode: (fileName: string, fileContent: string, color: boolean, teamName: string, taskId?: number) => void;
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
                <div className="run-card-content" onClick={() => this.props.showCode(this.props.fileName, this.props.fileContent, this.props.printerId === 3 ? true : false, this.props.teamName)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="run-card-content-logo" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" /></svg>
                    <div className="run-card-content-text">
                        <header className="run-card-content-text-header">{this.props.fileName}</header>
                        <footer className="run-card-content-text-footer">{this.props.date ? this.props.date.slice() : '无日期'}</footer>
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
            });
        }, 0);
    }

    private downLoadCodes = async () => {
        const res = await fetch('/api/download_all').then(res => res.arrayBuffer());
        const blob = new Blob([res]);
        const Url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = Url;
        a.download = "codes.zip";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(Url);
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
                        const clearOverTasks = async () => {
                            const successTaskIdList = value.successTasks?.map(task => task.taskId).filter(id => id !== undefined) as number[];
                            if (successTaskIdList.length > 0) {
                                try {
                                    const res = await axios.post('/api/clear', { job_ids: successTaskIdList });
                                    if (res.data.status === 'success') {
                                        value.clearOverallTasks();
                                    }
                                }
                                catch (err) {
                                    console.error("Failed to clear tasks:", err);
                                }
                            }
                        }
                        return (
                            <div className="run-task">
                                <header className="run-task-header">All completed tasks</header>
                                <div className="run-task-items">
                                    <div className="run-task-buttons">
                                        <button onClick={clearOverTasks} disabled={disabled} className="run-task-buttons-clear">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-color)"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" /></svg>
                                        </button>
                                        <button className="run-task-buttons-download" disabled={disabled} onClick={this.downLoadCodes}>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--text-color)"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" /></svg>
                                        </button>
                                    </div>
                                    <div className="run-task-items-content">
                                        {
                                            value.successTasks && value.successTasks.length > 0 ? (
                                                value.successTasks.map((item, index) => {
                                                    return <OverCard
                                                        animate={this.state.animate}
                                                        transitionDelay={index}
                                                        showCode={() => value.showCode(item.fileName, item.fileContent, item.printerId === 3 ? true : false, item.teamName, item.taskId)}
                                                        key={index}
                                                        fileName={item.fileName}
                                                        date={item.date}
                                                        fileContent={item.fileContent}
                                                        teamName={item.teamName}
                                                        printerId={item.printerId}
                                                        taskId={item.taskId}
                                                    />
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
            <taskContext.Consumer>
                {
                    value => {
                        return (
                            <div className="run">
                                <TaskItems tasks={value.tasks} />
                                <OverItemds />
                            </div>
                        )
                    }
                }
            </taskContext.Consumer>
        )
    }
}