import React from 'react';
import AnchorScroll from './AnchorScroll';

const App: React.FC = () => {
  // 定义锚点配置数组
  const anchorConfig = [
    { id: 'section1', label: '首页介绍' },
    { id: 'section2', label: '产品功能' },
    { id: 'section3', label: '使用教程' },
    { id: 'section4', label: '常见问题' },
    { id: 'section5', label: '联系我们' },
  ];

  return (
    <div className="app">
      <h1>React 锚点滚动组件演示</h1>
      {/* 使用锚点组件，传入滚动效果和配置数组 */}
      <AnchorScroll
        anchorList={anchorConfig}
        scrollBehavior="smooth" // 可选：'instant' 立即滚动 / 'smooth' 平滑滚动
        activeColor="#1890ff"
        offsetTop={0}
      />
    </div>
  );
};

export default App;