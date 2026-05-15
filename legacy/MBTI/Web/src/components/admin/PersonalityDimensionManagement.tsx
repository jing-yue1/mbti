import React, { useState, useEffect } from 'react';
import './PersonalityDimensionManagement.css';

interface PersonalityDimension {
  id: number;
  code: string;
  name: string;
  description: string;
}

const PersonalityDimensionManagement: React.FC = () => {
  const [dimensions, setDimensions] = useState<PersonalityDimension[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentDimension, setCurrentDimension] = useState<PersonalityDimension | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    // 模拟数据加载
    setDimensions([
      { id: 1, code: 'E', name: '外倾', description: '倾向于从外部世界获取能量' },
      { id: 2, code: 'I', name: '内倾', description: '倾向于从内部世界获取能量' },
      { id: 3, code: 'S', name: '感觉', description: '关注具体事实和细节' },
      { id: 4, code: 'N', name: '直觉', description: '关注抽象概念和可能性' },
      { id: 5, code: 'T', name: '思考', description: '基于逻辑和客观分析做决策' },
      { id: 6, code: 'F', name: '情感', description: '基于价值观和个人感受做决策' },
      { id: 7, code: 'J', name: '判断', description: '喜欢有计划、有条理的生活方式' },
      { id: 8, code: 'P', name: '感知', description: '喜欢灵活、随性的生活方式' },
    ]);
  }, []);

  const handleAddDimension = () => {
    const newDimension: PersonalityDimension = {
      id: dimensions.length + 1,
      ...formData,
    };
    setDimensions([...dimensions, newDimension]);
    setIsAddModalOpen(false);
    setFormData({
      code: '',
      name: '',
      description: '',
    });
  };

  const handleEditDimension = () => {
    if (currentDimension) {
      const updatedDimensions = dimensions.map(dimension => 
        dimension.id === currentDimension.id ? { ...currentDimension, ...formData } : dimension
      );
      setDimensions(updatedDimensions);
      setIsEditModalOpen(false);
      setCurrentDimension(null);
    }
  };

  const handleDeleteDimension = (id: number) => {
    setDimensions(dimensions.filter(dimension => dimension.id !== id));
  };

  const openEditModal = (dimension: PersonalityDimension) => {
    setCurrentDimension(dimension);
    setFormData({
      code: dimension.code,
      name: dimension.name,
      description: dimension.description,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="personality-dimension-management">
      <div className="page-header">
        <h1>性格维度管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加性格维度
        </button>
      </div>
      <div className="dimension-table-container">
        <table className="dimension-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>代码</th>
              <th>名称</th>
              <th>描述</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {dimensions.map(dimension => (
              <tr key={dimension.id}>
                <td>{dimension.id}</td>
                <td>{dimension.code}</td>
                <td>{dimension.name}</td>
                <td>{dimension.description}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(dimension)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteDimension(dimension.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加性格维度模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加性格维度</h2>
            <form>
              <div className="form-group">
                <label>代码</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
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
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                  取消
                </button>
                <button type="button" className="save-btn" onClick={handleAddDimension}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑性格维度模态框 */}
      {isEditModalOpen && currentDimension && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑性格维度</h2>
            <form>
              <div className="form-group">
                <label>代码</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                />
              </div>
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
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                  取消
                </button>
                <button type="button" className="save-btn" onClick={handleEditDimension}>
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

export default PersonalityDimensionManagement;