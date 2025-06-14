## 技术栈

- React
- Vite
- JSX
- Tailwind CSS
- Ant Design Mobile
- Zustand (状态管理)
- Framer Motion (动画效果)
- emoji-mart (表情选择器)
- react-infinite-scroll-component (无限滚动)
- postcss-px-to-viewport (移动端适配)
- lib-flexible (移动端适配)

## 项目结构

```
src/
├── components/        # 组件
│   ├── ChatHeader.jsx    # 聊天头部组件
│   ├── MessageItem.jsx   # 消息项组件
│   ├── MessageList.jsx   # 消息列表组件
│   └── MessageInput.jsx  # 消息输入组件
├── store/             # 状态管理
│   └── chatStore.js      # 聊天状态存储
├── App.jsx            # 主应用组件
├── App.css            # 应用样式
├── main.jsx           # 入口文件
└── index.css          # 全局样式
```

## 设计考虑

- 使用 Zustand 进行简洁的状态管理
- 使用 Framer Motion 实现流畅的动画效果
- 使用 Tailwind CSS 进行快速样式开发
- 使用 postcss-px-to-viewport 实现移动端适配
- 组件化设计，便于维护和扩展

