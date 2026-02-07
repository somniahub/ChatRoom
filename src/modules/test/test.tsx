import React from 'react';
import { axiosGet } from '../../http/request';

const test: React.FC = () => {
  // 定义锚点配置数组
  const anchorConfig = [
    { id: 'section1', label: '首页介绍' },
    { id: 'section2', label: '产品功能' },
    { id: 'section3', label: '使用教程' },
    { id: 'section4', label: '常见问题' },
    { id: 'section5', label: '联系我们' },
  ];

  function handleRequest() {
    const account = 1;
    const password = 2;

    // 拼接 URL
    const url = `/users/${account}/${password}`;

    console.log(111);
    axiosGet(url, {
      val: '123',
    });
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <button onClick={handleRequest}>点击</button>
    </div>
  );
};

export default test;
