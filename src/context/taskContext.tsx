import React from 'react';
import { type SuccessTaskType } from '../pages/HomePage';

interface TaskContextType {
    tasks: Array<{ printerId: number; fileName: string; date: string; fileContent: string, teamName: string, index: number, removing: boolean, taskId?: number | null, state: string, }> | null;
    successTasks: Array<SuccessTaskType> | null;
    workingPrinters: Array<number> | null;
    currentPrinter: number;
    currentTeamName: string;
    increaseTasks: (printerId: number, fileName: string, date: string, fileContent: string, teamName: string) => void;
    decreaseTasks: (index: number) => void;
    showCode: (fileName: string, fileContent: string, color: boolean, teamName: string, taskId?: number) => void;
    setPerndingTask: (index: number) => number;
    setSuccessTasks: (obj: SuccessTaskType) => void;
    setFaildTasks: (printerId: number, fileName: string, date: string, fileContent: string, teamName: string) => void;
    getSuccessTasksNumber: (printerId: number) => number;
    getFaildTasksNumber: (printerId: number) => number;
    setWorkingPrinters: (workingPrinters: Array<number>) => void;
    clearWorkingPrinters: () => void;
    setPrinterWorking: (printerId: number) => void;
    setPrinterPending: (printerId: number) => void;
    isPrinterWorking: (printerId: number) => boolean;
    clearOverallTasks: () => void;
    setCurrentPrinter: (printerId: number) => void;
    toSelect: () => void;
    closeSelect: () => void;
    setTeamName: (teamName: string) => void;
    clearPendingTask: () => void; // 可选方法，用于清除待处理任务
    setWaitingTask: (index: number, taskId: number | null, state: string) => void; // 可选方法，用于设置等待任务状态
}
export const taskContext = React.createContext<TaskContextType>({
    tasks: null,
    successTasks: null,
    workingPrinters: null,
    currentPrinter: 1,
    currentTeamName: 'Unknown Team',
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
    setPrinterWorking: () => { },
    setPrinterPending: () => { },
    isPrinterWorking: () => false,
    clearOverallTasks: () => { },
    setCurrentPrinter: () => { },
    toSelect: () => { },
    closeSelect: () => { },
    setTeamName: () => { },
    clearPendingTask: () => { },
    setWaitingTask: () => { }
});