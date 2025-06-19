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