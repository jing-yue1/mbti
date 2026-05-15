import React, { useState, useEffect } from 'react';
import './UserManagement.css';

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    role: 'USER',
    active: true,
  });

  useEffect(() => {
    // 模拟数据加载
    setUsers([
      { id: 1, username: 'admin', name: '管理员', email: 'admin@example.com', role: 'ADMIN', active: true },
      { id: 2, username: 'user1', name: '用户1', email: 'user1@example.com', role: 'USER', active: true },
      { id: 3, username: 'user2', name: '用户2', email: 'user2@example.com', role: 'USER', active: false },
    ]);
  }, []);

  const handleAddUser = () => {
    const newUser: User = {
      id: users.length + 1,
      ...formData,
    };
    setUsers([...users, newUser]);
    setIsAddModalOpen(false);
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      role: 'USER',
      active: true,
    });
  };

  const handleEditUser = () => {
    if (currentUser) {
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { ...currentUser, ...formData } : user
      );
      setUsers(updatedUsers);
      setIsEditModalOpen(false);
      setCurrentUser(null);
    }
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const openEditModal = (user: User) => {
    setCurrentUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      active: user.active,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>用户管理</h1>
        <button className="add-btn" onClick={() => setIsAddModalOpen(true)}>
          添加用户
        </button>
      </div>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>姓名</th>
              <th>邮箱</th>
              <th>角色</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.active ? '活跃' : '禁用'}</td>
                <td>
                  <button className="edit-btn" onClick={() => openEditModal(user)}>
                    编辑
                  </button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加用户模态框 */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>添加用户</h2>
            <form>
              <div className="form-group">
                <label>用户名</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
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
                <label>密码</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>角色</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="ADMIN">管理员</option>
                  <option value="USER">用户</option>
                </select>
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
                <button type="button" className="save-btn" onClick={handleAddUser}>
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 编辑用户模态框 */}
      {isEditModalOpen && currentUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>编辑用户</h2>
            <form>
              <div className="form-group">
                <label>用户名</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
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
                <label>密码（留空则不修改）</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>角色</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="ADMIN">管理员</option>
                  <option value="USER">用户</option>
                </select>
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
                <button type="button" className="save-btn" onClick={handleEditUser}>
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

export default UserManagement;