import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAssessments: 0,
    totalQuestions: 0,
    totalTestTakers: 0,
    totalTestResults: 0,
  });

  useEffect(() => {
    // 模拟数据加载
    setStats({
      totalUsers: 50,
      totalAssessments: 10,
      totalQuestions: 100,
      totalTestTakers: 200,
      totalTestResults: 150,
    });
  }, []);

  const statsCards = [
    { title: '用户总数', value: stats.totalUsers, color: '#667eea' },
    { title: '考核类型', value: stats.totalAssessments, color: '#764ba2' },
    { title: '题目总数', value: stats.totalQuestions, color: '#f093fb' },
    { title: '参测人员', value: stats.totalTestTakers, color: '#4facfe' },
    { title: '测试结果', value: stats.totalTestResults, color: '#00f2fe' },
  ];

  return (
    <div className="dashboard">
      <h1>仪表盘</h1>
      <div className="stats-grid">
        {statsCards.map((card, index) => (
          <div key={index} className="stats-card" style={{ borderLeftColor: card.color }}>
            <h3>{card.title}</h3>
            <p className="stats-value">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="recent-activity">
        <h2>最近活动</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-time">今天 10:30</span>
            <span className="activity-content">新增用户: 张三</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">今天 09:15</span>
            <span className="activity-content">创建考核类型: MBTI测试</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">昨天 16:45</span>
            <span className="activity-content">新增题目: 10道</span>
          </div>
          <div className="activity-item">
            <span className="activity-time">昨天 14:20</span>
            <span className="activity-content">完成测试: 20人</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;