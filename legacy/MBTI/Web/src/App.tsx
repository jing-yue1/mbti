
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import Test from './components/Test';
import Result from './components/Result';
import About from './components/About';
import HexagramPrediction from './components/HexagramPrediction';
import AdminLayout from './components/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import UserManagement from './components/admin/UserManagement';
import AssessmentTypeManagement from './components/admin/AssessmentTypeManagement';
import PersonalityDimensionManagement from './components/admin/PersonalityDimensionManagement';
import QuestionManagement from './components/admin/QuestionManagement';
import BatchManagement from './components/admin/BatchManagement';
import TestScheduleManagement from './components/admin/TestScheduleManagement';
import TestTakerManagement from './components/admin/TestTakerManagement';
import TestResultManagement from './components/admin/TestResultManagement';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
                      开始测试
                    </NavLink>
                    <NavLink to="/hexagram" className={({ isActive }) => isActive ? 'active' : ''}>
                      六爻预测
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>
                      关于
                    </NavLink>
                    <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                      管理后台
                    </NavLink>
                  </div>
            </div>
          </nav>

          <Routes>
            {/* 前台路由 */}
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/result" element={<Result />} />
            <Route path="/hexagram" element={<HexagramPrediction />} />
            <Route path="/about" element={<About />} />

            {/* 后台路由 */}
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/users" element={<AdminLayout><UserManagement /></AdminLayout>} />
            <Route path="/admin/assessment-types" element={<AdminLayout><AssessmentTypeManagement /></AdminLayout>} />
            <Route path="/admin/personality-dimensions" element={<AdminLayout><PersonalityDimensionManagement /></AdminLayout>} />
            <Route path="/admin/questions" element={<AdminLayout><QuestionManagement /></AdminLayout>} />
            <Route path="/admin/batches" element={<AdminLayout><BatchManagement /></AdminLayout>} />
            <Route path="/admin/test-schedules" element={<AdminLayout><TestScheduleManagement /></AdminLayout>} />
            <Route path="/admin/test-takers" element={<AdminLayout><TestTakerManagement /></AdminLayout>} />
            <Route path="/admin/test-results" element={<AdminLayout><TestResultManagement /></AdminLayout>} />

            {/* 404路由 */}
            <Route path="*" element={<Home />} />
          </Routes>

          <footer className="footer">
            <p>© 2026 MBTI性格测试与就业推荐系统</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;