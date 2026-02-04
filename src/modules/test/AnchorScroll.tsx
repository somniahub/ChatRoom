import React, { useRef, useState, useEffect } from 'react';
import './AnchorScroll.css';

// 定义锚点项的类型
export interface AnchorItem {
  id: string; // 锚点对应内容区域的唯一ID（必填）
  label: string; // 锚点导航显示的文字（必填）
  [key: string]: any; // 支持额外自定义属性
}

// 定义锚点组件的属性类型
interface AnchorScrollProps {
  anchorList: AnchorItem[]; // 锚点配置数组
  scrollBehavior: 'instant' | 'smooth'; // 滚动效果：立即滚动/平滑滚动
  activeColor?: string; // 激活状态文字颜色（可选）
  offsetTop?: number; // 滚动偏移量（可选，用于适配导航栏高度）
}

const AnchorScroll: React.FC<AnchorScrollProps> = ({
  anchorList,
  scrollBehavior,
  activeColor = '#1890ff',
  offsetTop = 0,
}) => {
  // 存储所有内容区域的ref
  const contentRefs = useRef<Record<string, HTMLElement | null>>({});
  // 当前激活的锚点ID
  const [activeAnchorId, setActiveAnchorId] = useState<string>('');

  // 注册内容区域ref
  const registerContentRef = (id: string) => (el: HTMLElement | null) => {
    contentRefs.current[id] = el;
  };

  // 锚点点击事件：处理滚动逻辑
  const handleAnchorClick = (targetId: string) => {
    const targetElement = contentRefs.current[targetId];
    if (!targetElement) return;

    // 执行滚动（封装在组件内部，外部无需关心）
    targetElement.scrollIntoView({
      behavior: scrollBehavior,
      block: 'start',
    });

    // 手动设置激活状态（即时滚动时同步更新）
    setActiveAnchorId(targetId);
  };

  // 监听页面滚动，自动更新激活锚点
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      let currentActiveId = '';

      // 遍历锚点，判断当前可视区域对应的锚点
      for (let i = anchorList.length - 1; i >= 0; i--) {
        const anchor = anchorList[i];
        const targetElement = contentRefs.current[anchor.id];
        if (!targetElement) continue;

        // 获取元素距离顶部的偏移量
        const elementTop = targetElement.getBoundingClientRect().top + scrollTop - offsetTop;
        if (scrollTop >= elementTop - 10) { // 容错偏移10px
          currentActiveId = anchor.id;
          break;
        }
      }

      if (currentActiveId !== activeAnchorId) {
        setActiveAnchorId(currentActiveId);
      }
    };

    // 绑定滚动事件
    window.addEventListener('scroll', handleScroll);
    // 初始化时执行一次，确定默认激活锚点
    handleScroll();

    // 组件卸载时移除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorList, activeAnchorId, offsetTop]);

  return (
    <div className="anchor-scroll-container">
      {/* 锚点导航栏 */}
      <div className="anchor-nav">
        {anchorList.map((anchor) => (
          <button
            key={anchor.id}
            className={`anchor-nav-item ${activeAnchorId === anchor.id ? 'active' : ''}`}
            style={{ color: activeAnchorId === anchor.id ? activeColor : '' }}
            onClick={() => handleAnchorClick(anchor.id)}
          >
            {anchor.label}
          </button>
        ))}
      </div>

      {/* 锚点对应的内容区域 */}
      <div className="anchor-content-wrapper">
        {anchorList.map((anchor) => (
          <div
            key={anchor.id}
            ref={registerContentRef(anchor.id)}
            id={anchor.id}
            className="anchor-content-item"
          >
            <h2>{anchor.label}</h2>
            <p>这是{anchor.label}对应的内容区域</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnchorScroll;