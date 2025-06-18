import axios from "axios";


let concurrentArray = [];
let concurrentCount = 10;
const BASE_URL = "http://localhost:3000/";

/**
 * 单个进程
 * @class SingleProcess
 * @param {string} url - The URL to send the request to.
 * @param {number} priority - The priority of the process.
 * @param {string} fileName - The name of the file to be processed.
 * @param {string} fileContent - The content of the file to be processed.
 * @param {string} color - The color associated with the process.
 * @param {string} date - The date associated with the process.
 * @returns {Promise} - A promise that resolves when the request is complete.
 * }
 */
class SingleProcess {
    constructor(url, priority, fileName, fileContent, color, date) {
        this.priority = priority;
        this.fileName = fileName;
        this.fileContent = fileContent;
        this.color = color;
        this.date = date;
        this.url = url;
    }

    async run() {
        return axios.post(this.url, {
            fileName: this.fileName,
            fileContent: this.fileContent,
            color: this.color,
            date: this.date
        })
    }
}


/**
 * Generates an array of SingleProcess instances for concurrent execution.
 * @function genConcurrentArray
 * @param {number} count - The number of processes to generate.
 * @returns {void}
 */
function genConcurrentArray() {
    for (let i = 0; i < concurrentCount; i++) {
        const fileName = `file${i}.txt`;
        const fileContent = `This is the content of ${fileName}`;
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const date = new Date().toISOString();
        concurrentArray.push(new SingleProcess(BASE_URL, i, fileName, fileContent, color, date));
    }
}

async function bootstrap() {
    genConcurrentArray();
    try {
        const res = await Promise.all(concurrentArray.map(async(process) => process.run()));
        console.log("All processes completed successfully.");
        res.forEach((response, index) => {
            console.log(`Response from process ${index}:`, response.data);
        });
    }
    catch (error) {
        console.error("Error during concurrent execution:", error);
    }
}

bootstrap()