import React, { useState, useEffect } from 'react';
import './TestScheduleManagement.css';

interface TestSchedule {
  id: number;
  batchId: number;
  batchName: string;
  assessmentTypeId: number;
  assessmentTypeName: string;
  startTime: string;
  endTime: string;
  location: string;
  active: boolean;
}

interface Batch {
  id: number;
  name: string;
}

interface AssessmentType {
  id: number;
  name: string;
}

const TestScheduleManagement: React.FC = () => {
  const [schedules, setSchedules] = useState<TestSchedule[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [assessmentTypes, setAssessmentTypes] = useState<AssessmentType[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<TestSchedule | null>(null);
  const [formData, setFormData] = useState({
    batchId: 1,
    assessmentTypeId: 1,
    startTime: '',
    endTime: '',
    location: '',
    active: true,
  });

  useEffect(() => {
    // 模拟数据加载
    setBatches([
      { id: 1, name: '2026年第一批次' },
      { id: 2, name: '2026年第二批次' },
    ]);

    setAssessmentTypes([
      { id: 1, name: 'MBTI测试' },
      { id: 2, name: '大五人格测试' },
    ]);

    setSchedules([
      {
        id: 1,
        batchId: 1,
        batchName: '2026年第一批次',
        assessmentTypeId: 1,
        assessmentTypeName: 'MBTI测试',
        startTime: '2026-01-15T10:00:00',
        endTime: '2026-01-15T12:00:00',
        location: '会议室A',
        active: true,
      },
      {
        id: 2,
        batchId: 1,
        batchName: '2026年第一批次',
        assessmentTypeId: 2,
        assessmentTypeName: '大五人格测试',
        startTime: '2026-01-20T14:00:00',
        endTime: '2026-01-20T16:00:00',
        location: '会议室B',
        active: true,
      },
      {
        id: 3,
        batchId: 2,
        batchName: '2026年第二批次',
        assessmentTypeId: 1,
        assessmentTypeName: 'MBTI测试',
        startTime: '2026-04-10T09:00:00',
        endTime: '2026-04-10T11:00:00',
        location: '会议室A',
        active: true,
      },
    ]);
  }, []);

  const handleAddSchedule = () => {
    const selectedBatch = batches.find(b => b.id === formData.batchId);
    const selectedAssessmentType = assessmentTypes.find(a => a.id === formData.assessmentTypeId);
    
    const newSchedule: TestSchedule = {
      id: schedules.length + 1,
      batchId: formData.batchId,
      batchName: selectedBatch?.name || '',
      assessmentTypeId: formData.assessmentTypeId,
      assessmentTypeName: selectedAssessmentType?.name || '',
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      active: formData.active,
    };
    setSchedules([...schedules, newSchedule]);
    setIsAddModalOpen(false);
    setFormData({
      batchId: 1,
      assessmentTypeId: 1,
      startTime: '',
      endTime: '',
      location: '',
      active: true,
    });
  };

  const handleEditSchedule = () => {
    if (currentSchedule) {
      const selectedBatch = batches.find(b => b.id === formData.batchId);
      const selectedAssessmentType = assessmentTypes.find(a => a.id === formData.assessmentTypeId);
      
      const updatedSchedule = {
        ...currentSchedule,
        batchId: formData.batchId,
        batchName: selectedBatch?.name || '',
        assessmentTypeId: formData.assessmentTypeId,
        assessmentTypeName: selectedAssessmentType?.name || '',
        startTime: formData.startTime,
        endTime: formData.endTime,
        location: formData.location,
        active: formData.active,
      };
      
      const updatedSchedules = schedules.map(schedule => 
        schedule.id === currentSchedule.id ? updatedSchedule : schedule
      );
      setSchedules(updatedSchedules);
      setIsEditModalOpen(false);
      setCurrentSchedule(null);
    }
  };

  const handleDeleteSchedule = (id: number) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
  };

  const openEditModal = (schedule: TestSchedule) => {
    setCurrentSchedule(schedule);
    setFormData({
      batchId: schedule.batchId,
      assessmentTypeId: schedule.assessmentTypeId,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      location: schedule.location,
      active: schedule.active,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="test-schedule-management">
      <div className="page-header">
        <h1>测试安排管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加测试安排
        </button>
      </div>
      <div className="schedule-table-container">
        <table className="schedule-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>批次</th>
              <th>考核类型</th>
              <th>开始时间</th>
              <th>结束时间</th>
              <th>地点</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.id}</td>
                <td>{schedule.batchName}</td>
                <td>{schedule.assessmentTypeName}</td>
                <td>{new Date(schedule.startTime).toLocaleString()}</td>
                <td>{new Date(schedule.endTime).toLocaleString()}</td>
                <td>{schedule.location}</td>
                <td>{schedule.active ? '活跃' : '禁用'}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(schedule)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteSchedule(schedule.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加测试安排模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加测试安排</h2>
            <form>
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
                <label>开始时间</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>结束时间</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>地点</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                <button type="button" className="save-btn" onClick={handleAddSchedule}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑测试安排模态框 */}
      {isEditModalOpen && currentSchedule && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑测试安排</h2>
            <form>
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
                <label>开始时间</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>结束时间</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>地点</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                <button type="button" className="save-btn" onClick={handleEditSchedule}>
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

export default TestScheduleManagement;