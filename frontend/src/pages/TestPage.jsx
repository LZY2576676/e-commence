import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const navigate = useNavigate();

  // 测试产品ID
  const testProductIds = ["aaaaa", "aaaab", "aaaac", "aaaad", "aaaae"];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">路由测试页面</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">基本路由测试</h2>
        <div className="flex flex-wrap gap-3">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/')}
          >
            首页
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/collection')}
          >
            商品列表
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/about')}
          >
            关于我们
          </button>
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate('/contact')}
          >
            联系我们
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">商品详情页测试</h2>
        <div className="flex flex-wrap gap-3">
          {testProductIds.map((id, index) => (
            <button 
              key={id}
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => {
                console.log(`Navigating to product ${id}`);
                navigate(`/product/${id}`);
              }}
            >
              商品 {index + 1}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">调试信息</h3>
        <p>当前路径: {window.location.pathname}</p>
        <p>当前URL: {window.location.href}</p>
      </div>
    </div>
  );
};

export default TestPage; 