import React from "react";
import '../../assets/css/printer.less'
// import { taskContext } from "../../pages/HomePage";
import { taskContext } from "../../context/taskContext";

import axios from "axios";

interface PrinterCardState {
    printerName: string;
    printerId: number;
    printerSerialNumber: number;
    printerStatus: string;
    color: boolean;
    teamName: string;
}
interface PrinterItemsProps {
    name: string;
    seriesalNumber: number;
    setTeamName: (name: string) => void;
}

interface PrinterHandleProps {
    printerId: number;
    teamName: string;
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

/**
 * 打印机操作项组件，显示打印机信息和队伍名称输入框
 * * @class OperationItems
 * @extends React.Component
 * * @property {PrinterItemsProps} props - 组件的属性，包含打印机名称、序列号和设置队伍名称的函数
 * * @description 打印机操作项组件，显示打印机信息和队伍名称输入框
 * * @example
 * <OperationItems name="Printer - 1" seriesalNumber={5501} setTeamName={(name) => console.log(`Team name set to: ${name}`)} />
 * @returns {React.ReactNode} 返回一个包含打印机信息和队伍名称输入框的JSX元素
 */
class OperationItems extends React.Component<PrinterItemsProps> {
    private inputRef = React.createRef<HTMLInputElement>();
    constructor(props: PrinterItemsProps) {
        super(props);
        this.state = {};
    }

    private handleInputBlur = () => {
        const inputElement = this.inputRef.current;
        if (inputElement) {
            const teamName = inputElement.value.trim();
            if (teamName !== "") {
                console.log(`队伍名称设置为: ${teamName}`);
                this.props.setTeamName(teamName);
            } else {
                this.props.setTeamName("Unknown Team");
            }
        }
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
                                <p>East A Zone:</p>
                                <input type="text" placeholder="请输入队伍名称" onBlur={this.handleInputBlur} ref={this.inputRef} className="pt-operation-item-content-body-aside-team" />
                                <p><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="M0-240v-53q0-38.57 41.5-62.78Q83-380 150.38-380q12.16 0 23.39.5t22.23 2.15q-8 17.35-12 35.17-4 17.81-4 37.18v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-19.86-3.5-37.43T765-377.27q11-1.73 22.17-2.23 11.17-.5 22.83-.5 67.5 0 108.75 23.77T960-293v53H780Zm-480-60h360v-6q0-37-50.5-60.5T480-390q-79 0-129.5 23.5T300-305v5ZM149.57-410q-28.57 0-49.07-20.56Q80-451.13 80-480q0-29 20.56-49.5Q121.13-550 150-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T149.57-410Zm660 0q-28.57 0-49.07-20.56Q740-451.13 740-480q0-29 20.56-49.5Q781.13-550 810-550q29 0 49.5 20.5t20.5 49.93q0 28.57-20.5 49.07T809.57-410ZM480-480q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm.35-60Q506-540 523-557.35t17-43Q540-626 522.85-643t-42.5-17q-25.35 0-42.85 17.15t-17.5 42.5q0 25.35 17.35 42.85t43 17.5ZM480-300Zm0-300Z" /></svg></p>
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

/**
 * 操作处理组件，包含选择打印机、选择文件和开始打印按钮
 * * @class OperationHandle
 * @extends React.Component
 * * @property {PrinterHandleProps} props - 组件的属性，包含打印机ID、队伍名称和更改打印机编号的函数
 * * @property {PrinterHandleState} state - 组件的状态，包含文件名、文件内容和日期
 * * @description 操作处理组件，包含选择打印机、选择文件和开始打印按钮
 * * @example
 * <OperationHandle printerId={1} teamName="Team A" changeNumber={(id) => console.log(`Selected printer: ${id}`)} />
 * @returns {React.ReactNode} 返回一个包含选择打印机、选择文件和开始打印按钮的JSX元素
 */
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

    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        const startPrinting = async (event: any) => {
                            event.preventDefault();
                            if (value.tasks) {
                                // 立即将所有任务状态设置为 waiting，提供即时反馈
                                console.log('开始打印，立即设置所有任务状态为 waiting');
                                value.tasks.forEach((task) => {
                                    value.setWaitingTask(task.index, null, 'waiting');
                                    console.log(`任务 ${task.index} 状态立即设置为 waiting`);
                                });

                                // 使用 Promise.allSettled 确保单个任务失败不影响其他任务
                                const taskResults = await Promise.allSettled(value.tasks.map(async (task) => {
                                    try {
                                        const response = await axios.post('/api/print', {
                                            priority: task.printerId,
                                            team_name: task.teamName ? task.teamName : 'Unknown Team',
                                            file_content: task.fileContent,
                                            color: task.printerId === 3 ? true : false,
                                            problem_name: task.fileName
                                        }, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            }
                                        });
                                        console.log(`任务 ${task.index} HTTP 200 响应:`, response.data);
                                        return { ...response.data, taskIndex: task.index }; // 保存原始任务索引
                                    }
                                    catch (error) {
                                        console.error(`打印任务 ${task.index} 请求失败:`, error);
                                        // 直接返回失败任务对象，不抛出错误
                                        return { 
                                            status: 'faild', 
                                            taskIndex: task.index, 
                                            job_id: null, 
                                            data: {
                                                problem_name: task.fileName, 
                                                end_print_time: new Date().toISOString(), 
                                                file_content: task.fileContent, 
                                                team_name: task.teamName,
                                                priority: task.printerId
                                            }
                                        };
                                    }
                                }));

                                // 处理每个任务的结果
                                const taskList: any[] = [];
                                taskResults.forEach((result) => {
                                    if (result.status === 'fulfilled') {
                                        // 所有任务都应该是 fulfilled，包括成功和失败的
                                        taskList.push(result.value);
                                    } else {
                                        // 这种情况理论上不应该发生，但为了安全起见保留
                                        console.error('意外的 rejected 状态:', result.reason);
                                    }
                                });

                                // 创建任务ID到任务索引的映射
                                const taskIdToIndexMap = new Map<number, number>();

                                taskList.forEach((data) => {
                                    // 检查 data 是否为 null（异常情况）
                                    if (!data) {
                                        console.warn('跳过空的任务数据');
                                        return;
                                    }
                                    
                                    console.log(`处理任务 ${data.taskIndex}:`, {
                                        status: data.status,
                                        job_id: data.data?.job_id,
                                        hasData: !!data.data
                                    });
                                    
                                    if (data.status === 'success' && data.data?.job_id != null) {
                                        // 成功的任务：更新 job_id 并添加到轮询映射中，保持 waiting 状态
                                        console.log(`任务 ${data.taskIndex} 请求成功，添加到轮询列表，job_id: ${data.data.job_id}`);
                                        value.setWaitingTask(data.taskIndex, data.data.job_id, 'waiting');
                                        taskIdToIndexMap.set(data.data.job_id, data.taskIndex);
                                    } else if (data.status === 'faild') {
                                        // 失败的任务：立即设置为 faild 状态
                                        console.log(`任务 ${data.taskIndex} 请求失败，设置为 faild 状态`);
                                        value.setWaitingTask(data.taskIndex, null, 'faild');
                                        value.setFaildTasks(
                                            data.data.priority, 
                                            data.data.problem_name, 
                                            data.data.end_print_time, 
                                            data.data.file_content, 
                                            data.data.team_name
                                        );
                                    } else {
                                        // 其他异常情况：设置为 faild 状态
                                        console.log(`任务 ${data.taskIndex} 其他异常情况，设置为 faild:`, { status: data.status, job_id: data.data?.job_id });
                                        value.setWaitingTask(data.taskIndex, null, 'faild');
                                        if (data.data) {
                                            value.setFaildTasks(data.data.priority, data.data.problem_name, data.data.end_print_time, data.data.file_content, data.data.team_name);
                                        }
                                    }
                                })

                                // 只收集有效的任务ID，过滤掉异常任务（job_id 为 null 或 undefined）
                                let taskIdList = taskList
                                    .filter(task => task && task.data?.job_id != null) // 过滤掉异常任务
                                    .map(task => task.data.job_id);

                                const intervalId = setInterval(async () => {
                                    try {
                                        if (taskIdList.length === 0) {
                                            clearInterval(intervalId);
                                            value.clearWorkingPrinters(); // 清除工作打印机列表
                                            console.log('所有任务处理完毕，已清除定时器。');
                                            return;
                                        }

                                        const toRemove: number[] = [];
                                        const printerTaskCount = new Map<number, number>(); // 跟踪每台打印机的待处理任务数

                                        // 使用 Promise.allSettled 而不是 Promise.all，确保单个请求异常不影响其他请求
                                        const results = await Promise.allSettled(taskIdList.map(async (taskId) => {
                                            // 额外检查确保 taskId 有效
                                            if (taskId == null || taskId === undefined) {
                                                console.warn(`跳过无效的任务ID: ${taskId}`);
                                                throw new Error(`无效的任务ID: ${taskId}`);
                                            }
                                            
                                            try {
                                                const response = await axios.post(`/api/get_job_info`, { id: taskId });
                                                return { data: response.data, taskId };
                                            } catch (error) {
                                                console.error(`任务 ${taskId} 请求失败:`, error);
                                                // 对于轮询阶段的异常，我们不需要标记为 failed，因为可能是网络临时问题
                                                // 只抛出错误，让 Promise.allSettled 处理
                                                throw error;
                                            }
                                        }));

                                        // 处理每个请求的结果，不管其他请求是否成功
                                        results.forEach((result, index) => {
                                            const taskId = taskIdList[index];
                                            
                                            if (result.status === 'rejected') {
                                                console.error(`任务 ${taskId} 轮询失败:`, result.reason);
                                                // 对于轮询阶段的失败，我们可以选择重试或者暂时跳过
                                                // 这里我们暂时跳过，不将其标记为 failed
                                                return;
                                            }

                                            const { data, taskId: resultTaskId } = result.value;
                                            const taskIndex = taskIdToIndexMap.get(resultTaskId);

                                            if (taskIndex === undefined) {
                                                console.warn(`找不到任务ID ${resultTaskId} 对应的索引`);
                                                return;
                                            }

                                            // 找到对应的任务以获取打印机ID
                                            const task = value.tasks?.find(t => t.index === taskIndex);
                                            const printerId = task?.printerId;

                                            try {
                                                if (data.data.status === 'Waiting') {
                                                    value.setWaitingTask(taskIndex, data.job_id, 'waiting');
                                                    // 统计该打印机的待处理任务
                                                    if (printerId) {
                                                        printerTaskCount.set(printerId, (printerTaskCount.get(printerId) || 0) + 1);
                                                    }
                                                } else if (data.data.status === 'SubmitFailed') {
                                                    value.setWaitingTask(taskIndex, data.job_id, 'faild');
                                                    toRemove.push(resultTaskId);
                                                } else if (data.data.status === 'Completed') {
                                                    value.setWaitingTask(taskIndex, data.job_id, 'success');
                                                    value.setSuccessTasks({
                                                        fileContent: data.data.file_content,
                                                        fileName: data.data.problem_name,
                                                        date: data.data.end_print_time || new Date().toISOString(),
                                                        printerId: data.data.priority,
                                                        teamName: data.data.team_name || 'Unknown Team',
                                                        taskId: data.data.job_id
                                                    })
                                                    toRemove.push(resultTaskId);
                                                }
                                            } catch (statusError) {
                                                // 即使状态处理出错，也不影响其他任务的处理
                                            }
                                        });

                                        // 更新任务列表
                                        taskIdList = taskIdList.filter(id => !toRemove.includes(id));

                                        // 如果任务全部处理完了，再次检查后清除定时器
                                        if (taskIdList.length === 0) {
                                            clearInterval(intervalId);
                                            value.clearWorkingPrinters(); // 清除工作打印机列表
                                        }
                                    } catch (intervalError) {
                                        // 即使出现意外错误，也不中断定时器，确保系统继续运行
                                    }
                                }, 1000);
                            }
                        }
                        return (
                            <div className="pt-operation-handle">
                                <div className="pt-operation-handle-select" tabIndex={1}>
                                    <p className="pt-operation-handle-select-btn">Select Printer</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="pt-operation-handle-select-logo" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M222-200 80-342l56-56 85 85 170-170 56 57-225 226Zm0-320L80-662l56-56 85 85 170-170 56 57-225 226Zm298 240v-80h360v80H520Zm0-320v-80h360v80H520Z" /></svg>
                                    <div className="pt-operation-handle-select-box">
                                        <p className="pt-operation-handle-select-box-item" onClick={() => { this.props.changeNumber(1); value.setCurrentPrinter(1) }}>1</p>
                                        <p className="pt-operation-handle-select-box-item" onClick={() => { this.props.changeNumber(2); value.setCurrentPrinter(2) }}>2</p>
                                        <p className="pt-operation-handle-select-box-item" onClick={() => { this.props.changeNumber(3); value.setCurrentPrinter(3) }}>3</p>
                                    </div>
                                </div>
                                <div className="pt-operation-handle-form" onClick={value.toSelect}>
                                    <div className="pt-operation-handle-form-select">
                                        <p className="pt-operation-handle-form-select-group">
                                            <span className="pt-operation-handle-form-select-p">Choose Code</span>
                                            <span className="pt-operation-handle-form-select-p"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="48px" fill="#fff"><path d="M319-250h322v-60H319v60Zm0-170h322v-60H319v60ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z" /></svg></span>
                                        </p>
                                    </div>
                                </div>

                                <form className="pt-operation-handle-form">
                                    <button className="pt-operation-handle-form-submit" disabled={
                                        value.tasks && value.tasks.length > 0 ? false : true
                                    } onClick={(e) => startPrinting(e)}>
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


/**
 * 打印机详情组件，显示打印机的详细信息和状态
 * @class PrinterDetails
 * @extends React.Component
 * @property {PrinterDetalsProps} props - 组件的属性，包含打印机ID和颜色
 * * @property {PrinterDetalsState} state - 组件的状态，包含打印机是否工作、任务数量、成功数量和失败数量
 * * @description 打印机详情组件，显示打印机的详细信息和状态
 * * @example
 * <PrinterDetails id={1} color={false} />
 * @returns {React.ReactNode} 返回一个包含打印机详细信息的JSX元素
 * 
 */
class PrinterDetails extends React.Component<PrinterDetalsProps> {
    constructor(props: PrinterDetalsProps) {
        super(props);
    }
    render(): React.ReactNode {
        return (
            <taskContext.Consumer>
                {
                    value => {
                        let tasksNumber = 0;
                        value.tasks?.forEach(task => {
                            if (task.printerId === this.props.id) {
                                tasksNumber++;
                            }
                        })
                        let isWork = false;
                        isWork = value.isPrinterWorking(this.props.id);

                        let successNumber = 0;
                        successNumber = value.getSuccessTasksNumber(this.props.id);
                        let faildNumber = 0;
                        faildNumber = value.getFaildTasksNumber(this.props.id);

                        return (
                            <div className="pt-detail">
                                <div className="pt-detail-device">
                                    <header className="pt-detail-device-name">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" className="pt-detail-device-name-svg"><path d="M658-648v-132H302v132h-60v-192h476v192h-60Zm-518 60h680-680Zm599 95q12 0 21-9t9-21q0-12-9-21t-21-9q-12 0-21 9t-9 21q0 12 9 21t21 9Zm-81 313v-192H302v192h356Zm60 60H242v-176H80v-246q0-45.05 30.5-75.53Q141-648 186-648h588q45.05 0 75.53 30.47Q880-587.05 880-542v246H718v176Zm102-236v-186.21Q820-562 806.78-575q-13.23-13-32.78-13H186q-19.55 0-32.77 13.22Q140-561.55 140-542v186h102v-76h476v76h102Z" /></svg>
                                        <p>{this.props.id} 号打印机</p>
                                        <div style={{ backgroundColor: tasksNumber ? 'red' : 'green' }} className="pt-detail-device-name-state"></div>
                                    </header>
                                    <main className="pt-detail-device-body">
                                        <ul className="pt-detail-device-body-items">
                                            <li className="pt-detail-device-body-items-i">❓ 设备类型：</li>
                                            <li className="pt-detail-device-body-items-i">{this.props.color ? '彩色打印机' : '黑白打印机'}</li>
                                        </ul>
                                        <ul className="pt-detail-device-body-items">
                                            <li className="pt-detail-device-body-items-i">💬 设备运行状态：</li>
                                            <li className="pt-detail-device-body-items-i">{isWork ? 'Running' : 'Free'}</li>
                                        </ul>
                                        <ul className="pt-detail-device-body-items">
                                            <li className="pt-detail-device-body-items-i">📃 当前打印任务数：</li>
                                            <li className="pt-detail-device-body-items-i">{tasksNumber}</li>
                                        </ul>
                                        <ul className="pt-detail-device-body-items">
                                            <li className="pt-detail-device-body-items-i">🎊 成功打印数：</li>
                                            <li className="pt-detail-device-body-items-i">{successNumber}</li>
                                        </ul>
                                        <ul className="pt-detail-device-body-items">
                                            <li className="pt-detail-device-body-items-i">📌 失败打印数：</li>
                                            <li className="pt-detail-device-body-items-i">{faildNumber}</li>
                                        </ul>
                                    </main>
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
 * 打印机卡片组件，包含打印机信息、操作项和打印机详情
 * * @class PrinterCard
 * @extends React.Component
 * @property {PrinterCardState} state - 组件状态，包含打印机名称、ID、序列号、状态、颜色和队伍名称
 * * @property {Function} setPrinter - 设置打印机信息的方法
 * * @property {Function} setTeamName - 设置队伍名称的方法
 * * @description 打印机卡片组件，包含打印机信息、操作项和打印机详情
 * * @example
 * <PrinterCard />
 * @returns {React.ReactNode} 返回一个包含打印机信息、操作项和打印机详情的JSX元素
 */
export default class PrinterCard extends React.Component<any, PrinterCardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            printerName: "Printer - 1",
            printerId: 1,
            printerSerialNumber: 5501,
            printerStatus: "Pending",
            color: false,
            teamName: "未命名队伍",
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
                    <taskContext.Consumer>
                        {
                            value => <OperationItems setTeamName={value.setTeamName} name={this.state.printerName} seriesalNumber={this.state.printerSerialNumber} />
                        }
                    </taskContext.Consumer>
                    <OperationHandle teamName={this.state.teamName} changeNumber={this.setPrinter} printerId={this.state.printerId} />
                </div>
                <PrinterDetails id={this.state.printerId} color={this.state.color} />
            </div>
        )
    }
}