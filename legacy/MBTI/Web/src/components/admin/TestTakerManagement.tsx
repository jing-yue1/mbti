import React, { useState, useEffect } from 'react';
import './TestTakerManagement.css';

interface TestTaker {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  batchId: number;
  batchName: string;
}

interface Batch {
  id: number;
  name: string;
}

const TestTakerManagement: React.FC = () => {
  const [testTakers, setTestTakers] = useState<TestTaker[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentTestTaker, setCurrentTestTaker] = useState<TestTaker | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    batchId: 1,
  });

  useEffect(() => {
    // 模拟数据加载
    setBatches([
      { id: 1, name: '2026年第一批次' },
      { id: 2, name: '2026年第二批次' },
    ]);

    setTestTakers([
      {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138001',
        department: '技术部',
        position: '工程师',
        batchId: 1,
        batchName: '2026年第一批次',
      },
      {
        id: 2,
        name: '李四',
        email: 'lisi@example.com',
        phone: '13900139002',
        department: '市场部',
        position: '经理',
        batchId: 1,
        batchName: '2026年第一批次',
      },
      {
        id: 3,
        name: '王五',
        email: 'wangwu@example.com',
        phone: '13700137003',
        department: '人力资源部',
        position: '专员',
        batchId: 2,
        batchName: '2026年第二批次',
      },
    ]);
  }, []);

  const handleAddTestTaker = () => {
    const selectedBatch = batches.find(b => b.id === formData.batchId);
    
    const newTestTaker: TestTaker = {
      id: testTakers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      position: formData.position,
      batchId: formData.batchId,
      batchName: selectedBatch?.name || '',
    };
    setTestTakers([...testTakers, newTestTaker]);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      batchId: 1,
    });
  };

  const handleEditTestTaker = () => {
    if (currentTestTaker) {
      const selectedBatch = batches.find(b => b.id === formData.batchId);
      
      const updatedTestTaker = {
        ...currentTestTaker,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        batchId: formData.batchId,
        batchName: selectedBatch?.name || '',
      };
      
      const updatedTestTakers = testTakers.map(testTaker => 
        testTaker.id === currentTestTaker.id ? updatedTestTaker : testTaker
      );
      setTestTakers(updatedTestTakers);
      setIsEditModalOpen(false);
      setCurrentTestTaker(null);
    }
  };

  const handleDeleteTestTaker = (id: number) => {
    setTestTakers(testTakers.filter(testTaker => testTaker.id !== id));
  };

  const openEditModal = (testTaker: TestTaker) => {
    setCurrentTestTaker(testTaker);
    setFormData({
      name: testTaker.name,
      email: testTaker.email,
      phone: testTaker.phone,
      department: testTaker.department,
      position: testTaker.position,
      batchId: testTaker.batchId,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="test-taker-management">
      <div className="page-header">
        <h1>参测人员管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加参测人员
        </button>
      </div>
      <div className="test-taker-table-container">
        <table className="test-taker-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>电话</th>
              <th>部门</th>
              <th>职位</th>
              <th>批次</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {testTakers.map(testTaker => (
              <tr key={testTaker.id}>
                <td>{testTaker.id}</td>
                <td>{testTaker.name}</td>
                <td>{testTaker.email}</td>
                <td>{testTaker.phone}</td>
                <td>{testTaker.department}</td>
                <td>{testTaker.position}</td>
                <td>{testTaker.batchName}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(testTaker)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteTestTaker(testTaker.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加参测人员模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加参测人员</h2>
            <form>
              <div className="form-group">
                <label>姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>电话</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>部门</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>职位</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>批次</label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: parseInt(e.target.value) })}
                >
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsAddModalOpen(false)}>
                  取消
                </button>
                <button type="button" className="save-btn" onClick={handleAddTestTaker}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑参测人员模态框 */}
      {isEditModalOpen && currentTestTaker && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑参测人员</h2>
            <form>
              <div className="form-group">
                <label>姓名</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>电话</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>部门</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>职位</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>批次</label>
                <select
                  value={formData.batchId}
                  onChange={(e) => setFormData({ ...formData, batchId: parseInt(e.target.value) })}
                >
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>
                      {batch.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>
                  取消
                </button>
                <button type="button" className="save-btn" onClick={handleEditTestTaker}>
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

export default TestTakerManagement;