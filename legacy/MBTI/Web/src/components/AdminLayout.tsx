import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: '仪表盘', path: '/admin/dashboard' },
    { name: '用户管理', path: '/admin/users' },
    { name: '考核类型管理', path: '/admin/assessment-types' },
    { name: '性格维度管理', path: '/admin/personality-dimensions' },
    { name: '题目管理', path: '/admin/questions' },
    { name: '批次管理', path: '/admin/batches' },
    { name: '测试安排管理', path: '/admin/test-schedules' },
    { name: '参测人员管理', path: '/admin/test-takers' },
    { name: '测试结果分析', path: '/admin/test-results' },
  ];

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h1 className="logo">MBTI管理系统</h1>
          <button 
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? '←' : '→'}
          </button>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main-content">
        <header className="main-header">
          <div className="header-left">
            <h2>管理后台</h2>
          </div>
          <div className="header-right">
            <button className="logout-btn">退出登录</button>
          </div>
        </header>
        <div className="content-area">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;