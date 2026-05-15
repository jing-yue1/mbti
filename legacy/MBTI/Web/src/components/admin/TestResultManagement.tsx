import React, { useState, useEffect } from 'react';
import './TestResultManagement.css';

interface TestResult {
  id: number;
  testTakerId: number;
  testTakerName: string;
  testScheduleId: number;
  testScheduleName: string;
  personalityType: string;
  score: number;
  analysis: string;
  careerRecommendation: string;
  completed: boolean;
  completedAt: string;
}

const TestResultManagement: React.FC = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    // 模拟数据加载
    setTestResults([
      {
        id: 1,
        testTakerId: 1,
        testTakerName: '张三',
        testScheduleId: 1,
        testScheduleName: '2026年第一批次 MBTI测试',
        personalityType: 'ISTJ',
        score: 85,
        analysis: '张三的性格类型为ISTJ，属于内向、感觉、思考、判断型人格。这类人通常具有责任感强、注重细节、逻辑思维清晰等特点。',
        careerRecommendation: '适合从事会计、审计、项目管理等需要细心和逻辑思维的职业。',
        completed: true,
        completedAt: '2026-01-15T11:30:00',
      },
      {
        id: 2,
        testTakerId: 2,
        testTakerName: '李四',
        testScheduleId: 1,
        testScheduleName: '2026年第一批次 MBTI测试',
        personalityType: 'ENFP',
        score: 90,
        analysis: '李四的性格类型为ENFP，属于外向、直觉、情感、感知型人格。这类人通常具有创造力强、热情开朗、善于沟通等特点。',
        careerRecommendation: '适合从事市场营销、广告、教育等需要创造力和人际交往的职业。',
        completed: true,
        completedAt: '2026-01-15T11:45:00',
      },
      {
        id: 3,
        testTakerId: 3,
        testTakerName: '王五',
        testScheduleId: 3,
        testScheduleName: '2026年第二批次 MBTI测试',
        personalityType: 'INTJ',
        score: 88,
        analysis: '王五的性格类型为INTJ，属于内向、直觉、思考、判断型人格。这类人通常具有战略思维、独立性强、追求卓越等特点。',
        careerRecommendation: '适合从事科研、技术研发、管理咨询等需要战略思维和创新能力的职业。',
        completed: true,
        completedAt: '2026-04-10T10:30:00',
      },
    ]);
  }, []);

  const openDetailModal = (result: TestResult) => {
    setSelectedResult(result);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="test-result-management">
      <div className="page-header">
        <h1>测试结果管理</h1>
      </div>
      <div className="result-table-container">
        <table className="result-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>参测人员</th>
              <th>测试安排</th>
              <th>性格类型</th>
              <th>得分</th>
              <th>完成状态</th>
              <th>完成时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {testResults.map(result => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.testTakerName}</td>
                <td>{result.testScheduleName}</td>
                <td>{result.personalityType}</td>
                <td>{result.score}</td>
                <td>{result.completed ? '已完成' : '未完成'}</td>
                <td>{result.completed ? new Date(result.completedAt).toLocaleString() : '-'}</td>
                <td>
                  <button className="detail-btn" onClick={() => openDetailModal(result)}>
                    详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 测试结果详情模态框 */}
      {isDetailModalOpen && selectedResult && (
        <div className="modal">
          <div className="modal-content">
            <h2>测试结果详情</h2>
            <div className="result-details">
              <div className="detail-item">
                <label>参测人员:</label>
                <span>{selectedResult.testTakerName}</span>
              </div>
              <div className="detail-item">
                <label>测试安排:</label>
                <span>{selectedResult.testScheduleName}</span>
              </div>
              <div className="detail-item">
                <label>性格类型:</label>
                <span className="personality-type">{selectedResult.personalityType}</span>
              </div>
              <div className="detail-item">
                <label>得分:</label>
                <span>{selectedResult.score}</span>
              </div>
              <div className="detail-item">
                <label>完成状态:</label>
                <span>{selectedResult.completed ? '已完成' : '未完成'}</span>
              </div>
              <div className="detail-item">
                <label>完成时间:</label>
                <span>{selectedResult.completed ? new Date(selectedResult.completedAt).toLocaleString() : '-'}</span>
              </div>
              <div className="detail-section">
                <label>性格分析:</label>
                <p>{selectedResult.analysis}</p>
              </div>
              <div className="detail-section">
                <label>职业推荐:</label>
                <p>{selectedResult.careerRecommendation}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button type="button" className="close-btn" onClick={() => setIsDetailModalOpen(false)}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestResultManagement;