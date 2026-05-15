import React, { useState, useEffect } from 'react';
import './BatchManagement.css';

interface Batch {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  active: boolean;
}

const BatchManagement: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBatch, setCurrentBatch] = useState<Batch | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    active: true,
  });

  useEffect(() => {
    // 模拟数据加载
    setBatches([
      {
        id: 1,
        name: '2026年第一批次',
        description: '2026年第一季度MBTI测试批次',
        startDate: '2026-01-01',
        endDate: '2026-03-31',
        active: true,
      },
      {
        id: 2,
        name: '2026年第二批次',
        description: '2026年第二季度MBTI测试批次',
        startDate: '2026-04-01',
        endDate: '2026-06-30',
        active: true,
      },
      {
        id: 3,
        name: '2025年第四批次',
        description: '2025年第四季度MBTI测试批次',
        startDate: '2025-10-01',
        endDate: '2025-12-31',
        active: false,
      },
    ]);
  }, []);

  const handleAddBatch = () => {
    const newBatch: Batch = {
      id: batches.length + 1,
      ...formData,
    };
    setBatches([...batches, newBatch]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      active: true,
    });
  };

  const handleEditBatch = () => {
    if (currentBatch) {
      const updatedBatches = batches.map(batch => 
        batch.id === currentBatch.id ? { ...currentBatch, ...formData } : batch
      );
      setBatches(updatedBatches);
      setIsEditModalOpen(false);
      setCurrentBatch(null);
    }
  };

  const handleDeleteBatch = (id: number) => {
    setBatches(batches.filter(batch => batch.id !== id));
  };

  const openEditModal = (batch: Batch) => {
    setCurrentBatch(batch);
    setFormData({
      name: batch.name,
      description: batch.description,
      startDate: batch.startDate,
      endDate: batch.endDate,
      active: batch.active,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="batch-management">
      <div className="page-header">
        <h1>批次管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加批次
        </button>
      </div>
      <div className="batch-table-container">
        <table className="batch-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>名称</th>
              <th>描述</th>
              <th>开始日期</th>
              <th>结束日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {batches.map(batch => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.name}</td>
                <td>{batch.description}</td>
                <td>{batch.startDate}</td>
                <td>{batch.endDate}</td>
                <td>{batch.active ? '活跃' : '禁用'}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(batch)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteBatch(batch.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加批次模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加批次</h2>
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
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>开始日期</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>结束日期</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
                <button type="button" className="save-btn" onClick={handleAddBatch}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑批次模态框 */}
      {isEditModalOpen && currentBatch && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑批次</h2>
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
                  rows={3}
                />
              </div>
              <div className="form-group">
                <label>开始日期</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>结束日期</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
                <button type="button" className="save-btn" onClick={handleEditBatch}>
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

export default BatchManagement;