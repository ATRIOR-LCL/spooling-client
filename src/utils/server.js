// server.js
// const http = require('http');
import http from 'http';

// 创建服务器实例
const server = http.createServer((req, res) => {
  // 模拟异步操作，例如数据库访问或文件读取
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello! You accessed ${req.url} at ${new Date().toISOString()}\n`);
  }, 1000); // 延迟1秒用于测试并发处理能力
});

// 监听端口
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
