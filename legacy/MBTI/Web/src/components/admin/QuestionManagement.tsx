import React, { useState, useEffect } from 'react';
import './QuestionManagement.css';

interface Question {
  id: number;
  content: string;
  dimensionId: number;
  dimensionName: string;
  assessmentTypeId: number;
  assessmentTypeName: string;
  orderIndex: number;
  active: boolean;
}

interface Dimension {
  id: number;
  name: string;
}

interface AssessmentType {
  id: number;
  name: string;
}

const QuestionManagement: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [dimensions, setDimensions] = useState<Dimension[]>([]);
  const [assessmentTypes, setAssessmentTypes] = useState<AssessmentType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    content: '',
    dimensionId: 1,
    assessmentTypeId: 1,
    orderIndex: 1,
    active: true,
  });

  useEffect(() => {
    // 模拟数据加载
    setDimensions([
      { id: 1, name: '外倾' },
      { id: 2, name: '内倾' },
      { id: 3, name: '感觉' },
      { id: 4, name: '直觉' },
      { id: 5, name: '思考' },
      { id: 6, name: '情感' },
      { id: 7, name: '判断' },
      { id: 8, name: '感知' },
    ]);

    setAssessmentTypes([
      { id: 1, name: 'MBTI测试' },
      { id: 2, name: '大五人格测试' },
    ]);

    setQuestions([
      {
        id: 1,
        content: '我更喜欢参加热闹的聚会，而不是独自在家看书',
        dimensionId: 1,
        dimensionName: '外倾',
        assessmentTypeId: 1,
        assessmentTypeName: 'MBTI测试',
        orderIndex: 1,
        active: true,
      },
      {
        id: 2,
        content: '我更关注现实情况，而不是未来的可能性',
        dimensionId: 3,
        dimensionName: '感觉',
        assessmentTypeId: 1,
        assessmentTypeName: 'MBTI测试',
        orderIndex: 2,
        active: true,
      },
      {
        id: 3,
        content: '我做决策时更注重逻辑分析，而不是个人感受',
        dimensionId: 5,
        dimensionName: '思考',
        assessmentTypeId: 1,
        assessmentTypeName: 'MBTI测试',
        orderIndex: 3,
        active: true,
      },
    ]);
  }, []);

  const handleAddQuestion = () => {
    const selectedDimension = dimensions.find(d => d.id === formData.dimensionId);
    const selectedAssessmentType = assessmentTypes.find(a => a.id === formData.assessmentTypeId);
    
    const newQuestion: Question = {
      id: questions.length + 1,
      content: formData.content,
      dimensionId: formData.dimensionId,
      dimensionName: selectedDimension?.name || '',
      assessmentTypeId: formData.assessmentTypeId,
      assessmentTypeName: selectedAssessmentType?.name || '',
      orderIndex: formData.orderIndex,
      active: formData.active,
    };
    setQuestions([...questions, newQuestion]);
    setIsAddModalOpen(false);
    setFormData({
      content: '',
      dimensionId: 1,
      assessmentTypeId: 1,
      orderIndex: 1,
      active: true,
    });
  };

  const handleEditQuestion = () => {
    if (currentQuestion) {
      const selectedDimension = dimensions.find(d => d.id === formData.dimensionId);
      const selectedAssessmentType = assessmentTypes.find(a => a.id === formData.assessmentTypeId);
      
      const updatedQuestion = {
        ...currentQuestion,
        content: formData.content,
        dimensionId: formData.dimensionId,
        dimensionName: selectedDimension?.name || '',
        assessmentTypeId: formData.assessmentTypeId,
        assessmentTypeName: selectedAssessmentType?.name || '',
        orderIndex: formData.orderIndex,
        active: formData.active,
      };
      
      const updatedQuestions = questions.map(question => 
        question.id === currentQuestion.id ? updatedQuestion : question
      );
      setQuestions(updatedQuestions);
      setIsEditModalOpen(false);
      setCurrentQuestion(null);
    }
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const openEditModal = (question: Question) => {
    setCurrentQuestion(question);
    setFormData({
      content: question.content,
      dimensionId: question.dimensionId,
      assessmentTypeId: question.assessmentTypeId,
      orderIndex: question.orderIndex,
      active: question.active,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="question-management">
      <div className="page-header">
        <h1>题目管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加题目
        </button>
      </div>
      <div className="question-table-container">
        <table className="question-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>题目内容</th>
              <th>性格维度</th>
              <th>考核类型</th>
              <th>排序</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {questions.map(question => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td>{question.content}</td>
                <td>{question.dimensionName}</td>
                <td>{question.assessmentTypeName}</td>
                <td>{question.orderIndex}</td>
                <td>{question.active ? '活跃' : '禁用'}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(question)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteQuestion(question.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加题目模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加题目</h2>
            <form>
              <div className="form-group">
                <label>题目内容</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>性格维度</label>
                <select
                  value={formData.dimensionId}
                  onChange={(e) => setFormData({ ...formData, dimensionId: parseInt(e.target.value) })}
                >
                  {dimensions.map(dimension => (
                    <option key={dimension.id} value={dimension.id}>
                      {dimension.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>考核类型</label>
                <select
                  value={formData.assessmentTypeId}
                  onChange={(e) => setFormData({ ...formData, assessmentTypeId: parseInt(e.target.value) })}
                >
                  {assessmentTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>排序</label>
                <input
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>状态</label>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                  取消
                </button>
                <button type="button" className="save-btn" onClick={handleAddQuestion}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑题目模态框 */}
      {isEditModalOpen && currentQuestion && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑题目</h2>
            <form>
              <div className="form-group">
                <label>题目内容</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>性格维度</label>
                <select
                  value={formData.dimensionId}
                  onChange={(e) => setFormData({ ...formData, dimensionId: parseInt(e.target.value) })}
                >
                  {dimensions.map(dimension => (
                    <option key={dimension.id} value={dimension.id}>
                      {dimension.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>考核类型</label>
                <select
                  value={formData.assessmentTypeId}
                  onChange={(e) => setFormData({ ...formData, assessmentTypeId: parseInt(e.target.value) })}
                >
                  {assessmentTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>排序</label>
                <input
                  type="number"
                  value={formData.orderIndex}
                  onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) })}
                />
              </div>
              <div className="form-group">
                <label>状态</label>
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                  取消
                </button>
                <button type="button" className="save-btn" onClick={handleEditQuestion}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionManagement;