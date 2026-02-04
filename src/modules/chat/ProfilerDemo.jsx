import { Suspense, useState, useRef } from 'react';

// 异步函数
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: '张三', age: 20 }), 2000);
  });
}

function NormalPromiseComponent() {
  const [user, setUser] = useState(null);
  const initialized = useRef(false);
  
  if (!initialized.current) {
    initialized.current = true;
    getUser().then(setUser);
  }
  
  if (!user) return null; // Suspense 看不到这个加载状态
  return <div>普通 Promise: {user.name}</div>;
}

function Demo() {
  return (
    <div style={{ padding: '20px' }}>
      
      <div>
        <h3>普通 Promise</h3>
        <Suspense fallback={<div style={{color: 'red'}}>这个不会显示...</div>}>
          <NormalPromiseComponent />
        </Suspense>
        <p><strong>结果：空白 → 2秒后显示内容</strong></p>
      </div>
    </div>
  );
}

export default Demo;