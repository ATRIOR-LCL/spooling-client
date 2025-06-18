import React from "react";
import '../assets/css/home.less';
import PrinterCard from "../components/home/PrinterCard";
import Run from "../components/home/Run";
import Code from "../components/ui/Code";


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
    currentCode: string | null;
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
    increaseTasks: (printerId: number, fileName: string, date: string, fileContent: string, teamName: string) => void;
    decreaseTasks: (printerId: number) => void;
    showCode: (fileContent: string, teamName: string) => void;
    clearPendingTasks: () => void;
    setSuccessTasks: (arr: Array<SuccessTaskType>) => void;
    setFaildTasks: (printerId: number, fileName: string, date: string, fileContent: string, teamName: string) => void;
    getSuccessTasksNumber: (printerId: number) => number;
    getFaildTasksNumber: (printerId: number) => number;
    setWorkingPrinters: (workingPrinters: Array<number>) => void;
    clearWorkingPrinters: () => void;
}
export const taskContext = React.createContext<TaskContextType>({
    tasks: null,
    successTasks: null,
    workingPrinters: null,
    increaseTasks: () => { },
    decreaseTasks: () => { },
    showCode: () => { },
    clearPendingTasks: () => { },
    setSuccessTasks: () => { },
    setFaildTasks: () => { },
    getSuccessTasksNumber: () => 0,
    getFaildTasksNumber: () => 0,
    setWorkingPrinters: () => { },
    clearWorkingPrinters: () => { }
});

class HomePage extends React.Component<any, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: null,
            currentCode: null,
            workingPrinters: null,
            currentTeamName: '未命名队伍',
            successTasks: null,
            faildTasks: null
        };
    }
    private increaseTasks = (printerId: number, fileName: string, date: string, fileContent: string, teamName: string): void => {
        this.setState((prevState) => ({
            tasks: prevState.tasks === null ?
                ([{ printerId, fileName, date, fileContent, index: 0, teamName }]) :
                ([...prevState.tasks, { printerId, fileName, date, fileContent, index: prevState.tasks.length, teamName }])
        }));
    }

    private decreaseTasks = (index: number): void => {
        this.setState((prevState) => ({
            tasks: (prevState.tasks || []).filter(task => task.index !== index)
        }));
    }

    private showCode = (fileContent: string, teamName: string): void => {
        this.setState({
            currentCode: fileContent,
            currentTeamName: teamName
        });
    }

    private closeCode = (): void => {
        this.setState({
            currentCode: null
        });
    }

    private clearPendingTasks = (): void => {
        this.setState({
            tasks: null
        });
    }

    private setSuccessTasks = (arr: Array<SuccessTaskType>): void => {
        this.setState({
            successTasks: arr
        })
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


    render() {
        return (
            <taskContext.Provider value={
                {
                    tasks: this.state.tasks,
                    successTasks: this.state.successTasks,
                    workingPrinters: this.state.workingPrinters,
                    increaseTasks: this.increaseTasks,
                    decreaseTasks: this.decreaseTasks,
                    showCode: this.showCode,
                    clearPendingTasks: this.clearPendingTasks,
                    setSuccessTasks: this.setSuccessTasks,
                    setFaildTasks: this.setFaildTasks,
                    getSuccessTasksNumber: this.getSuccessTasksNumber,
                    getFaildTasksNumber: this.getFaildTasksNumber,
                    setWorkingPrinters: this.setWorkingPrinters,
                    clearWorkingPrinters: this.clearWorkingPrinters
                }
            }>
                <div className="home">
                    {
                        this.state.currentCode ? <Code code={this.state.currentCode} teamName={this.state.currentTeamName} closeCode={this.closeCode} /> : null
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