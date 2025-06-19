interface RequestInterface {
    printerId: number;
    fileName: string;
    date: string;
    fileContent: string;
    color: boolean;
}
interface Job {
    // ...
}

interface ResponseInterface {
    success: boolean;
    message: string;
    data: Job;
}

[
    {
        printerId: 1,
        taskId: 0,
    },
    {
        printerId: 1,
        taskId: 1,
    },
    {
        printerId: 2,
        taskId: 2,
    },
    {
        printerId: 3,
        taskId: 3,
    },
    {
        printerId: 1,
        taskId: 4,
    }
]