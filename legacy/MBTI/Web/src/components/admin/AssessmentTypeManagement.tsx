import React, { useState, useEffect } from 'react';
import './AssessmentTypeManagement.css';

interface AssessmentType {
  id: number;
  name: string;
  description: string;
  active: boolean;
}

const AssessmentTypeManagement: React.FC = () => {
  const [assessmentTypes, setAssessmentTypes] = useState<AssessmentType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentType, setCurrentType] = useState<AssessmentType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    active: true,
  });

  useEffect(() => {
    // 模拟数据加载
    setAssessmentTypes([
      { id: 1, name: 'MBTI测试', description: '迈尔斯-布里格斯性格类型测试', active: true },
      { id: 2, name: '大五人格测试', description: '五因素人格测试', active: true },
      { id: 3, name: '职业兴趣测试', description: '霍兰德职业兴趣测试', active: false },
    ]);
  }, []);

  const handleAddType = () => {
    const newType: AssessmentType = {
      id: assessmentTypes.length + 1,
      ...formData,
    };
    setAssessmentTypes([...assessmentTypes, newType]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      description: '',
      active: true,
    });
  };

  const handleEditType = () => {
    if (currentType) {
      const updatedTypes = assessmentTypes.map(type => 
        type.id === currentType.id ? { ...currentType, ...formData } : type
      );
      setAssessmentTypes(updatedTypes);
      setIsEditModalOpen(false);
      setCurrentType(null);
    }
  };

  const handleDeleteType = (id: number) => {
    setAssessmentTypes(assessmentTypes.filter(type => type.id !== id));
  };

  const openEditModal = (type: AssessmentType) => {
    setCurrentType(type);
    setFormData({
      name: type.name,
      description: type.description,
      active: type.active,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="assessment-type-management">
      <div className="page-header">
        <h1>考核类型管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加考核类型
        </button>
      </div>
      <div className="type-table-container">
        <table className="type-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>描述</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {assessmentTypes.map(type => (
              <tr key={type.id}>
                <td>{type.id}</td>
                <td>{type.name}</td>
                <td>{type.description}</td>
                <td>{type.active ? '活跃' : '禁用'}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(type)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteType(type.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加考核类型模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加考核类型</h2>
            <form>
              <div className="form-group">
                <label>名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
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
                <button type="button" className="save-btn" onClick={handleAddType}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑考核类型模态框 */}
      {isEditModalOpen && currentType && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑考核类型</h2>
            <form>
              <div className="form-group">
                <label>名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
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
                <button type="button" className="save-btn" onClick={handleEditType}>
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

export default AssessmentTypeManagement;