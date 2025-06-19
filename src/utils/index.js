import axios from "axios";


let concurrentArray = [];
let concurrentCount = 10;
const BASE_URL = "http://localhost:3000/";



function genConcurrentArray() {
    for (let i = 0; i < concurrentCount; i++) {
        const fileName = `file${i}.txt`;
        const fileContent = `This is the content of ${fileName}`;
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const date = new Date().toISOString();
        concurrentArray.push({
            fileName,
            fileContent,
            color,
            date,
        });
    }
}

async function bootstrap() {
    genConcurrentArray();
    try {
        concurrentArray.forEach(async (process) => {
            const res = await axios.post(BASE_URL, {
                fileName: process.fileName,
                fileContent: process.fileContent,
                color: process.color,
                date: process.date
            })
            console.log(`Request sent for ${process.fileName} with color ${process.color} at ${process.date}`);
        })
    }
    catch (error) {
        console.error("Error during concurrent execution:", error);
    }
}

function getSuccessTasks() {
    setInterval(async() => {
        try {
            const response = await axios.get(`${BASE_URL}success`);
            const successTasks = response.data;
            console.log("Success tasks:", successTasks);
        }
        catch (error) {
            console.error("Error fetching success tasks:", error);
        }
    }, 0);
}

bootstrap()