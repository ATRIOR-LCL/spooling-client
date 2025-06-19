import React from "react";
import '../assets/css/home.less';
import PrinterCard from "../components/home/PrinterCard";
import Run from "../components/home/Run";
import Code from "../components/ui/Code";
import Select from "../components/ui/Select";
import { TaskCard } from "../components/home/Run";
import ReactDOM from 'react-dom';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h2>出错了，请刷新页面</h2>;
        }

        return this.props.children;
    }
}

interface HomePageState {
    tasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, index: number, teamName: string }> | null;
    workingPrinters: Array<number> | null;
    currentCode: {
        content: string | null;
        color: boolean;
    }
    isSelecting: boolean;
    currentPrinter: number;
    currentTeamName: string;
    successTasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string }> | null;
    faildTasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string }> | null;
}

interface SuccessTaskType {
    printerId: number;
    fileName: string;
    date: string;
    fileContent: string;
    teamName: string;
}

interface TaskContextType {
    tasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string, index: number }> | null;
    successTasks: Array<SuccessTaskType> | null;
    workingPrinters: Array<number> | null;
    currentPrinter: number;
    currentTeamName: string;
    increaseTasks: (printerId: number, fileName: string, date: string, fileContent: string, teamName: string) => void;
    decreaseTasks: (printerId: number) => void;
    showCode: (fileContent: string, color: boolean) => void;
    setPerndingTask: (taskId: number | null) => number;
    setSuccessTasks: (obj: SuccessTaskType) => void;
    setFaildTasks: (printerId: number, fileName: string, date: string, fileContent: string, teamName: string) => void;
    getSuccessTasksNumber: (printerId: number) => number;
    getFaildTasksNumber: (printerId: number) => number;
    setWorkingPrinters: (workingPrinters: Array<number>) => void;
    clearWorkingPrinters: () => void;
    clearOverallTasks: () => void;
    setCurrentPrinter: (printerId: number) => void;
    toSelect: () => void;
    closeSelect: () => void;
    setTeamName: (teamName: string) => void;
    clearPendingTask: () => void; // 可选方法，用于清除待处理任务
}
export const taskContext = React.createContext<TaskContextType>({
    tasks: null,
    successTasks: null,
    workingPrinters: null,
    currentPrinter: 1,
    currentTeamName: '未命名队伍',
    increaseTasks: () => { },
    decreaseTasks: () => { },
    showCode: () => { },
    setPerndingTask: () => 0,
    setSuccessTasks: () => { },
    setFaildTasks: () => { },
    getSuccessTasksNumber: () => 0,
    getFaildTasksNumber: () => 0,
    setWorkingPrinters: () => { },
    clearWorkingPrinters: () => { },
    clearOverallTasks: () => { },
    setCurrentPrinter: () => { },
    toSelect: () => { },
    closeSelect: () => { },
    setTeamName: () => { },
    clearPendingTask: () => { }
});

/**
 * HomePage组件，主页的主要内容
 * 包含打印机卡片、运行组件和代码预览
 * @extends React.Component
 * @class HomePage
 * @classdesc 主页组件，包含打印机卡片、运行组件和代码预览
 * @property {any} props - 组件的属性
 * @property {HomePageState} state - 组件的状态
 * @property {Array<{ printerId: number; fileName: string; date: string; fileContent: string, index: number, teamName: string }> | null} state.tasks - 当前待处理的任务列表
 * @property {Array<number> | null} state.workingPrinters - 当前正在工作的打印机列表
 * @property {string | null} state.currentCode - 当前显示的代码内容
 * @property {string} state.currentTeamName - 当前显示代码的队伍名称
 * @property {Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string }> | null} state.successTasks - 成功处理的任务列表
 * @property {Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string }> | null} state.faildTasks - 失败处理的任务列表
 * @description 主页组件，包含打印机卡片、运行组件和代码预览
 * @example
 * <HomePage />
 * @returns {React.ReactNode} 返回一个包含打印机卡片、运行组件和代码预览的JSX元素
 * @see {@link PrinterCard} 打印机卡片组件
 * @see {@link Run} 运行组件
 * @see {@link Code} 代码预览组件
 * @see {@link taskContext} 任务上下文，用于在组件树中共享任务状态
 * @see {@link ErrorBoundary} 错误边界组件，用于捕获子组件中的错误并显示错误信息
 * @see {@link HomePageState} 主页组件的状态类型
 * @see {@link SuccessTaskType} 成功任务类型，用于表示成功处理的任务
 * @see {@link TaskContextType} 任务上下文类型，用于定义任务上下文的结构和方法
 * @see {@link Banner} 横幅组件，包含ICPC Logo、标题、信息按钮和主题切换按钮
 * @see {@link Footer} 页脚组件，包含版权信息和其他链接
 * @see {@link Info} 信息按钮组件，用于显示比赛注意信息
 * @see {@link ThemeButton} 主题切换按钮组件，用于切换页面主题
 * @see {@link Code} 代码预览组件，用于显示代码内容和队伍名称
 * @see {@link ErrorBoundary} 错误边界组件，用于捕获子组件中的错误并显示错误信息
 * @see {@link Run} 运行组件，用于处理打印机任务和显示任务状态
 * @see {@link PrinterCard} 打印机卡片组件，用于显示打印机状态和任务信息
 * @see {@link taskContext} 任务上下文，用于在组件树中共享任务状态
 * @see {@link HomePageState} 主页组件的状态类型
 * @see {@link SuccessTaskType} 成功任务类型，用于表示成功处理的任务
 * @see {@link TaskContextType} 任务上下文类型，用于定义任务上下文的结构和方法
 * @see {@link ErrorBoundary} 错误边界组件，用于捕获子组件中的错误并显示错误信息 
 */
class HomePage extends React.Component<any, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: null,
            currentCode: {
                content: null,
                color: false
            },
            workingPrinters: null,
            currentTeamName: '未命名队伍',
            successTasks: null,
            faildTasks: null,
            currentPrinter: 1,
            isSelecting: false
        };
    }
    /**
     * 在就绪窗口添加打印任务
     * @description 因为 setPendingTask 选择操作 DOM 而不是提供过状态来渲染 DOM  ，那么就不能通过 state 来生成任务卡片，state 仅仅作为标记
     * @see {@link setPendingTask}
     */
    private increaseTasks = (printerId: number, fileName: string, date: string, fileContent: string, teamName: string): void => {
        let _index = 0;
        this.setState((prevState) => {
            _index = prevState.tasks ? prevState.tasks.length : 0;
            return {
                tasks: prevState.tasks === null ?
                    ([{ printerId, fileName, date, fileContent, index: 0, teamName }]) :
                    ([...prevState.tasks, { printerId, fileName, date, fileContent, index: prevState.tasks.length, teamName }])
            }
        });
        const container = document.querySelector('.run-task-items-content') as HTMLDivElement;
        const taskCard = <TaskCard toClose={() => this.setPendingTask(_index)} index={_index} fileName={fileName} date={date} printerId={printerId} />
        const taskCardElement = document.createElement('div');
        ReactDOM.render(taskCard, taskCardElement);
        container.appendChild(taskCardElement);
    }

    private decreaseTasks = (index: number): void => {
        this.setState((prevState) => ({
            tasks: (prevState.tasks || []).filter(task => task.index !== index)
        }));
    }

    private showCode = (fileContent: string, color: boolean): void => {
        this.setState({
            currentCode: {
                content: fileContent,
                color: color
            },
        });
    }

    private closeCode = (): void => {
        this.setState({
            currentCode: {
                content: null,
                color: false
            }
        });
    }
    /**
     * 设置打印机的任务状态
     * @param taskId 任务ID，如果为null则清除待处理任务
     * @description 设置待处理任务，移除指定任务并重新计算剩余任务的位置, 采用 FLIP 动画的思想，操作真实 DOM
     * @returns {number} 返回1表示成功设置待处理任务，返回0表示没有待处理任务或任务ID为null
     */
    private setPendingTask = (taskId: number | null): number => {
        if (taskId === null) {
            console.log('任务ID为null，无法设置待处理任务');
            return 0;
        } else {
            const container = document.querySelector('.run-task-items-content') as HTMLDivElement;
            const items = Array.from(container.children) as HTMLDivElement[];
            if (items.length == 0 || items[taskId].classList.contains('run-task-items-content-empty')) {
                this.clearPendingTask();
                return 0;
            };
            const target = items[taskId];

            // 1. 记录每个元素的初始位置
            const firstRects = new Map();
            items.forEach((item) => {
                firstRects.set(item, item.getBoundingClientRect());
            })

            // 2. 让目标元素移出
            target.style.transition = "transform 0.5s ease, opacity 0.3s ease";
            target.style.transform = 'translateX(150%)';
            target.style.opacity = '0';

            // 3. 等待动画结束
            target.addEventListener('transitionend', () => {
                target.remove();

                const remainingItems = Array.from(container.children) as HTMLDivElement[];
                if (remainingItems.length === 0) {
                    this.clearPendingTask();
                    return 0;
                }
                // 4. 重新计算剩余元素的位置
                remainingItems.forEach((item) => {
                    const first = firstRects.get(item);
                    const last = item.getBoundingClientRect();
                    const deltaY = first.top - last.top;

                    // 5. 设置反向位移 + 回弹
                    item.style.transform = `translateY(${deltaY}px)`;
                    item.style.transition = "transform 0s";

                    // 6. 强制重绘
                    requestAnimationFrame(() => {
                        remainingItems.forEach((item) => {
                            item.style.transition = "transform 0.5s ease";
                            item.style.transform = '';
                        })
                    })
                })
            })
            return 1;
        }
    }

    private clearOverallTasks = (): void => {
        this.setState({
            tasks: null,
            successTasks: null,
            faildTasks: null,
            workingPrinters: null,
            currentCode: {
                content: null,
                color: false
            },
            currentTeamName: '未命名队伍'
        });
    }

    /**
     *  设置成功任务列表，将新的成功任务添加到现有的成功任务列表中 
     * @param successTask 成功任务对象，包含打印机ID、文件名、日期、文件内容和队伍名称
     * @description 采用虚拟 DOM 在成功数组后 push 不会影响之前的元素
     */
    private setSuccessTasks = (successTask: SuccessTaskType): void => {
        this.setState(prevState => ({
            successTasks: prevState.successTasks
                ? [...prevState.successTasks, successTask]
                : [successTask]
        }));
    }

    private setFaildTasks = (printerId: number, fileName: string, date: string, fileContent: string, teamName: string): void => {
        this.setState((prevState) => ({
            faildTasks: prevState.faildTasks === null ?
                ([{ printerId, fileName, date, fileContent, teamName }]) :
                ([...prevState.faildTasks, { printerId, fileName, date, fileContent, teamName }])
        }));
    }

    private getSuccessTasksNumber = (printerId: number): number => {
        return (this.state.successTasks || []).filter(task => task.printerId === printerId).length;
    }

    private getFaildTasksNumber = (printerId: number): number => {
        return (this.state.faildTasks || []).filter(task => task.printerId === printerId).length;
    }

    private setWorkingPrinters = (workingPrinters: Array<number>): void => {
        this.setState({
            workingPrinters: workingPrinters
        });
    }

    private clearWorkingPrinters = (): void => {
        this.setState({
            workingPrinters: null
        });
    }

    private setCurrentPrinter = (printerId: number): void => {
        this.setState({
            currentPrinter: printerId
        });
    }

    private toSelect = (): void => {
        this.setState({
            isSelecting: true
        });
    }

    private closeSelect = (): void => {
        this.setState({
            isSelecting: false
        });
    }

    private setTeamName = (teamName: string): void => {
        this.setState({
            currentTeamName: teamName
        });
    }

    private clearPendingTask = (): void => {
        this.setState({
            tasks: null
        });
    }


    render() {
        return (
            <taskContext.Provider
                value={
                    {
                        tasks: this.state.tasks,
                        successTasks: this.state.successTasks,
                        workingPrinters: this.state.workingPrinters,
                        currentPrinter: this.state.currentPrinter,
                        currentTeamName: this.state.currentTeamName,
                        increaseTasks: this.increaseTasks,
                        decreaseTasks: this.decreaseTasks,
                        showCode: this.showCode,
                        setPerndingTask: this.setPendingTask,
                        setSuccessTasks: this.setSuccessTasks,
                        setFaildTasks: this.setFaildTasks,
                        getSuccessTasksNumber: this.getSuccessTasksNumber,
                        getFaildTasksNumber: this.getFaildTasksNumber,
                        setWorkingPrinters: this.setWorkingPrinters,
                        clearWorkingPrinters: this.clearWorkingPrinters,
                        clearOverallTasks: this.clearOverallTasks,
                        setCurrentPrinter: this.setCurrentPrinter,
                        toSelect: this.toSelect,
                        closeSelect: this.closeSelect,
                        setTeamName: this.setTeamName,
                        clearPendingTask: this.clearPendingTask
                    }
                }>
                <div className="home">
                    {
                        this.state.isSelecting
                            ? <Select printerId={this.state.currentPrinter} teamName={this.state.currentTeamName} />
                            : null
                    }
                    {
                        this.state.currentCode.content
                            ? <Code code={this.state.currentCode.content} color={this.state.currentCode.color} teamName={this.state.currentTeamName} closeCode={this.closeCode} />
                            : null
                    }
                    <main className="home-main">
                        <section className="home-main-section">
                            <PrinterCard />
                        </section>
                        <section className="home-main-section">
                            <ErrorBoundary>
                                <Run />
                            </ErrorBoundary>
                        </section>
                    </main>
                </div>
            </taskContext.Provider>
        )
    }
}

export default HomePage;