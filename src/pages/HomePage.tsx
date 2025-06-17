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
    tasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, index: number }> | null;
    currentCode: string | null;
}

interface TaskContextType {
    tasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string }> | null;
    increaseTasks: (printerId: number, fileName: string, date: string, fileContent: string) => void;
    decreaseTasks: (printerId: number) => void;
    showCode: (fileContent: string) => void;
}
export const taskContext = React.createContext<TaskContextType>({
    tasks: null,
    increaseTasks: () => { },
    decreaseTasks: () => { },
    showCode: () => { }
});

class HomePage extends React.Component<any, HomePageState> {
    constructor(props: any) {
        super(props);
        this.state = {
            tasks: null,
            currentCode: null
        };
    }
    private increaseTasks = (printerId: number, fileName: string, date: string, fileContent: string): void => {
        this.setState((prevState) => ({
            tasks: prevState.tasks === null ? ([{ printerId, fileName, date, fileContent, index: 0 }]) : ([...prevState.tasks, { printerId, fileName, date, fileContent, index: prevState.tasks.length }])
        }));
    }

    private decreaseTasks = (index: number): void => {
        this.setState((prevState) => ({
            tasks: (prevState.tasks || []).filter(task => task.index !== index)
        }));
    }

    private showCode = (fileContent: string): void => {
        this.setState({
            currentCode: fileContent
        });
    }

    private closeCode = (): void => {
        this.setState({
            currentCode: null
        });
    }
    render() {
        return (
            <taskContext.Provider value={
                {
                    tasks: this.state.tasks,
                    increaseTasks: this.increaseTasks,
                    decreaseTasks: this.decreaseTasks,
                    showCode: this.showCode
                }
            }>
                <div className="home">
                    {
                        this.state.currentCode ? <Code code={this.state.currentCode} closeCode={this.closeCode} /> : null
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