import { useState, useEffect } from 'react';
import { adminUserService, assessmentTypeService, batchService, adminTestResultService } from '@/services/adminService';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTypes: 0,
    totalBatches: 0,
    totalTestResults: 0,
    completedTests: 0,
  });

  useEffect(() => {
    setStats({
      totalUsers: adminUserService.getAll().length,
      totalTypes: assessmentTypeService.getAll().length,
      totalBatches: batchService.getAll().length,
      totalTestResults: adminTestResultService.getAll().length,
      completedTests: adminTestResultService.getStats().completed,
    });
  }, []);

  const cards = [
    { title: '注册用户', value: stats.totalUsers, color: '#667eea' },
    { title: '考核类型', value: stats.totalTypes, color: '#764ba2' },
    { title: '测试批次', value: stats.totalBatches, color: '#f093fb' },
    { title: '测试结果', value: stats.totalTestResults, color: '#4facfe' },
    { title: '已完成测试', value: stats.completedTests, color: '#00f2fe' },
  ];

  return (
    <div className="page-enter">
      <div className="page-header">
        <h1>仪表盘</h1>
      </div>
      <div className="stats-grid">
        {cards.map((card, i) => (
          <div key={i} className="stat-card" style={{ borderLeftColor: card.color }}>
            <h3>{card.title}</h3>
            <p className="stat-number">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="table-container" style={{ padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '1.1rem', color: '#333' }}>系统导航</h2>
        <p style={{ color: '#666', lineHeight: 1.8 }}>
          欢迎使用 MBTI 性格测试与就业推荐管理系统。本系统提供完整的测试流程管理、性格分析和职业推荐功能。
          使用左侧导航栏进入各管理模块。
        </p>
      </div>
    </div>
  );
}
