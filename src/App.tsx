import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import LiuYaoTest from '@/components/LiuYaoTest';
import LiuYaoResult from '@/components/LiuYaoResult';
import History from '@/components/History';
import AdminLayout from '@/components/admin/AdminLayout';
import Dashboard from '@/components/admin/Dashboard';
import UserManagement from '@/components/admin/UserManagement';
import AssessmentTypeManagement from '@/components/admin/AssessmentTypeManagement';
import PersonalityDimensionManagement from '@/components/admin/PersonalityDimensionManagement';
import QuestionManagement from '@/components/admin/QuestionManagement';
import BatchManagement from '@/components/admin/BatchManagement';
import TestScheduleManagement from '@/components/admin/TestScheduleManagement';
import TestTakerManagement from '@/components/admin/TestTakerManagement';
import PersonalityAnalysis from '@/components/admin/PersonalityAnalysis';
import Home from '@/components/Home';
import Test from '@/components/Test';
import Result from '@/components/Result';
import About from '@/components/About';
import '@/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="navbar-container">
              <NavLink to="/" className="navbar-logo">
                MBTI系统
              </NavLink>
              <div className="navbar-links">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                  首页
                </NavLink>
                <NavLink to="/test" className={({ isActive }) => isActive ? 'active' : ''}>
                  标准测试
                </NavLink>
                <NavLink to="/liuyao" className={({ isActive }) => isActive ? 'active' : ''}>
                  易经测试
                </NavLink>
                <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>
                  历史
                </NavLink>
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                  管理
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                  关于
                </NavLink>
              </div>
            </div>
          </nav>
          
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/result" element={<Result />} />
              <Route path="/liuyao" element={<LiuYaoTest />} />
              <Route path="/liuyao-result" element={<LiuYaoResult />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="assessment-types" element={<AssessmentTypeManagement />} />
                <Route path="personality-dimensions" element={<PersonalityDimensionManagement />} />
                <Route path="questions" element={<QuestionManagement />} />
                <Route path="batches" element={<BatchManagement />} />
                <Route path="schedules" element={<TestScheduleManagement />} />
                <Route path="test-takers" element={<TestTakerManagement />} />
                <Route path="analysis" element={<PersonalityAnalysis />} />
              </Route>
            </Routes>
          </ErrorBoundary>
          
          <footer className="footer">
            <p>© 2026 MBTI性格测试与就业推荐系统</p>
            <NavLink to="/admin" className="footer-admin-link">管理后台</NavLink>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App