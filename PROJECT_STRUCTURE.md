# 📂 项目目录结构说明

## 🏗️ 整体项目结构图

```
spooling-client/
├── 📁 public/                    # 静态资源目录
│   ├── 📁 code/                  # 代码示例文件
│   ├── 📁 fonts/                 # 字体文件
│   └── 📁 images/                # 公共图片资源
├── 📁 src/                       # 源代码目录
│   ├── 📁 assets/                # 项目资源
│   │   ├── 📁 css/               # 样式文件
│   │   └── 📁 images/            # 项目图片
│   ├── 📁 components/            # React 组件
│   │   ├── 📁 home/              # 首页组件
│   │   ├── 📁 interface/         # 界面组件
│   │   └── 📁 ui/                # UI 基础组件
│   ├── 📁 configs/               # 配置文件
│   ├── 📁 context/               # React 上下文
│   ├── 📁 pages/                 # 页面组件
│   ├── 📁 utils/                 # 工具函数
│   └── 📄 main.tsx               # 应用入口
├── 📁 node_modules/              # 依赖包
├── 📄 package.json               # 项目配置
├── 📄 vite.config.ts            # 构建配置
├── 📄 tsconfig.json             # TypeScript 配置
└── 📄 README.md                 # 项目说明
```

---

## 📁 根目录结构

```
spooling-client/
├── 📁 public/                    # 静态资源目录
├── 📁 src/                       # 源代码目录
├── 📁 node_modules/              # 依赖包目录
├── 📄 package.json               # 项目依赖配置
├── 📄 pnpm-lock.yaml            # 锁定依赖版本
├── 📄 vite.config.ts            # Vite 构建配置
├── 📄 tsconfig.json             # TypeScript 配置
├── 📄 tsconfig.app.json         # 应用 TypeScript 配置
├── 📄 tsconfig.node.json        # Node.js TypeScript 配置
├── 📄 eslint.config.js          # ESLint 代码规范配置
├── 📄 demo.config.ts            # 演示配置文件
├── 📄 index.html                # HTML 入口文件
├── 📄 README.md                 # 项目说明文档
└── 📄 .gitignore                # Git 忽略文件配置
```

---

## 📁 public/ - 静态资源目录

```
public/
├── 📁 code/                      # 代码示例文件
│   ├── 📄 code1.cpp             # C++ 代码示例 1
│   ├── 📄 code2.cpp             # C++ 代码示例 2
│   ├── 📄 code3.cpp             # C++ 代码示例 3
│   ├── 📄 code4.cpp             # C++ 代码示例 4
│   └── 📄 code5.cpp             # C++ 代码示例 5
├── 📁 fonts/                     # 字体文件
│   ├── 📄 robot-solid.ttf       # Robot 粗体字体
│   └── 📄 robot-thin.ttf        # Robot 细体字体
├── 📁 images/                    # 公共图片资源
│   ├── 🖼️ avatar.png             # 用户头像图片
│   ├── 🖼️ block.png              # 区块图标
│   └── 🖼️ cld.png                # 云图标
└── 📄 icon.svg                   # 网站图标
```

---

## 📁 src/ - 源代码目录

### 📁 src/components/ - 组件目录

```
src/components/
├── 📁 home/                      # 首页相关组件
│   ├── 📄 PrinterCard.tsx       # 🖨️ 打印机卡片组件（核心组件）
│   └── 📄 Run.tsx               # 🏃 任务运行状态组件
├── 📁 interface/                 # 界面相关组件
│   └── 📄 card.tsx              # 🎴 通用卡片组件
└── 📁 ui/                        # UI 基础组件
    ├── 📄 Banner.tsx             # 🎪 横幅组件
    ├── 📄 Code.tsx               # 💻 代码显示组件
    ├── 📄 Footetr.tsx            # 🦶 页脚组件
    ├── 📄 Info.tsx               # ℹ️ 信息显示组件
    ├── 📄 Loading.tsx            # ⏳ 加载动画组件
    ├── 📄 PrinterTip.tsx         # 💡 打印机提示组件
    ├── 📄 Select.tsx             # 📁 文件选择组件
    ├── 📄 shif.tsx               # 🔄 切换组件
    ├── 📄 ThemeButton.tsx        # 🎨 主题切换按钮
    └── 📄 Tip.tsx                # 💬 提示组件
```

#### 🔑 核心组件说明

- **PrinterCard.tsx**: 打印机管理的核心组件，包含：
  - 打印机信息显示（状态、类型、队列）
  - 任务提交和管理
  - 状态轮询和更新
  - 错误处理和异常管理

- **Run.tsx**: 任务执行状态展示组件，包含：
  - 待处理任务列表
  - 任务状态动画
  - 成功/失败任务展示

- **Select.tsx**: 文件选择和代码输入组件，支持：
  - 文件上传
  - 代码粘贴
  - 队伍名称设置

### 📁 src/pages/ - 页面目录

```
src/pages/
├── 📄 HomePage.tsx               # 🏠 主页面组件（状态管理中心）
├── 📄 Interface.tsx              # 🖥️ 界面页面组件
└── 📄 fetchData.ts               # 📡 数据获取工具
```

#### HomePage.tsx - 状态管理中心
- 管理全局任务状态
- 处理打印机工作状态
- 协调组件间通信
- 提供上下文数据

### 📁 src/context/ - 上下文目录

```
src/context/
└── 📄 taskContext.tsx            # 📋 任务上下文管理
```

#### taskContext.tsx - 全局状态管理
- 任务队列管理
- 打印机状态跟踪
- 成功/失败任务记录
- 组件间数据共享

### 📁 src/assets/ - 资源目录

```
src/assets/
├── 📁 css/                       # 样式文件
│   ├── 📄 banner.less            # 横幅样式
│   ├── 📄 code.less              # 代码显示样式
│   ├── 📄 default.less           # 默认全局样式
│   ├── 📄 footer.less            # 页脚样式
│   ├── 📄 home.less              # 首页样式
│   ├── 📄 info.less              # 信息显示样式
│   ├── 📄 interface.less         # 界面样式
│   ├── 📄 loading.less           # 加载动画样式
│   ├── 📄 printer.less           # 打印机样式
│   ├── 📄 run.less               # 任务运行样式
│   ├── 📄 select.less            # 文件选择样式
│   ├── 📄 shift.less             # 切换组件样式
│   └── 📄 tip.less               # 提示样式
└── 📁 images/                    # 图片资源
    ├── 🖼️ block.png              # 区块图标
    ├── 🖼️ eye-s.png              # 眼睛图标（小）
    ├── 🖼️ eye.png                # 眼睛图标
    └── 🖼️ icpc-logo.webp         # ICPC 标志
```

### 📁 src/configs/ - 配置目录

```
src/configs/
└── 📄 svg.config.ts              # 🎨 SVG 图标配置
```

### 📁 src/utils/ - 工具目录

```
src/utils/
├── 📄 getRandom.ts               # 🎲 随机数生成工具
├── 📄 index.js                   # 📋 工具集合
├── 📄 preferTheme.js             # 🎨 主题偏好管理
├── 📄 server.js                  # 🌐 服务器相关工具
└── 📄 sleep.ts                   # ⏰ 延时工具
```

### 📄 src/main.tsx - 应用入口
- React 应用启动文件
- 根组件渲染
- 全局配置初始化

### 📄 src/vite-env.d.ts - 类型声明
- Vite 环境类型声明
- 全局类型定义

---

## 🔧 配置文件说明

### 📄 vite.config.ts - 构建配置
- 开发服务器配置
- 构建优化设置
- 插件配置

### 📄 tsconfig.json - TypeScript 配置
- 编译选项
- 路径映射
- 类型检查规则

### 📄 eslint.config.js - 代码规范
- 代码风格检查
- 语法规则定义
- 自动修复配置

---

## 🚀 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式语言**: Less
- **包管理**: pnpm
- **代码规范**: ESLint
- **HTTP 客户端**: Axios
- **开发语言**: TypeScript

---

## 📊 项目特性

### 🎯 核心功能
1. **多打印机管理**: 支持 3 台打印机（1-2号黑白，3号彩色）
2. **任务队列**: 实时任务提交和状态跟踪
3. **状态管理**: 完整的任务生命周期管理
4. **错误处理**: 健壮的异常处理和恢复机制
5. **实时反馈**: 即时状态更新和用户反馈

### 🎨 UI/UX 特性
1. **响应式设计**: 适配不同屏幕尺寸
2. **动画效果**: 流畅的状态转换动画
3. **主题支持**: 可切换的界面主题
4. **直观操作**: 简洁明了的用户界面

### 🔧 技术特性
1. **组件化架构**: 高度模块化的组件设计
2. **状态隔离**: 独立的任务状态管理
3. **错误边界**: 完善的错误捕获和处理
4. **类型安全**: 完整的 TypeScript 类型定义

---

## 📝 开发说明

### 🏗️ 项目启动
```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 📋 开发规范
1. 组件使用 TypeScript + React Class Components
2. 样式使用 Less 预处理器
3. 遵循 ESLint 代码规范
4. 使用语义化的文件和组件命名

---

*📅 最后更新: 2025年6月20日*
