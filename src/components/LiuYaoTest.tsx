import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { liuYaoQuestions } from '@/data/liuyaoHexagrams';
import { calculateLiuYao, type YaoType } from '@/utils/liuyao';
import './LiuYao.css';

export default function LiuYaoTest() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<YaoType[]>([]);

  const current = liuYaoQuestions[step];

  const handleSelect = (type: YaoType) => {
    const newAnswers = [...answers, type];
    if (step < liuYaoQuestions.length - 1) {
      setAnswers(newAnswers);
      setStep(step + 1);
    } else {
      // 完成
      const result = calculateLiuYao(newAnswers);
      sessionStorage.setItem('liuyaoResult', JSON.stringify(result));
      navigate('/liuyao-result', { state: { result } });
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setAnswers(answers.slice(0, -1));
      setStep(step - 1);
    }
  };

  return (
    <div className="liuyao-container page-transition">
      <div className="liuyao-header">
        <h1>⚡ 六爻 · 易经性格测试</h1>
        <p className="liuyao-subtitle">回答 6 道情境题，每一爻揭示你性格的一个维度</p>
      </div>

      {/* 进度 */}
      <div className="liuyao-progress">
        {liuYaoQuestions.map((_, i) => (
          <div key={i} className={`liuyao-progress-dot ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`}>
            <span className="liuyao-dot-inner">{i < step ? '✓' : i + 1}</span>
          </div>
        ))}
      </div>

      {/* 题目卡片 */}
      <div className="liuyao-question-card" key={step}>
        <div className="liuyao-question-badge">{current.title}</div>
        <p className="liuyao-scenario">{current.scenario}</p>

        <div className="liuyao-options">
          {current.options.map((opt, i) => (
            <button key={i} className="liuyao-option" onClick={() => handleSelect(opt.type)}>
              <span className="liuyao-option-label">{opt.label}</span>
              <span className="liuyao-option-text">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 导航 */}
      <div className="liuyao-nav">
        {step > 0 && (
          <button className="liuyao-nav-btn" onClick={handlePrev}>← 上一题</button>
        )}
        <span className="liuyao-step-indicator">{step + 1} / {liuYaoQuestions.length}</span>
      </div>

      {/* 已选概览 */}
      <div className="liuyao-preview">
        <div className="liuyao-yao-strip">
          {answers.map((a, i) => (
            <span key={i} className={`liuyao-yao-tag ${a === 'old_yang' || a === 'young_yang' ? 'yang' : 'yin'}`}>
              {a === 'old_yang' ? '○' : a === 'young_yang' ? '—' : a === 'young_yin' ? '- -' : 'X'}
            </span>
          ))}
          {Array.from({ length: liuYaoQuestions.length - answers.length }).map((_, i) => (
            <span key={i + answers.length} className="liuyao-yao-tag empty">⚬</span>
          ))}
        </div>
        <p className="liuyao-preview-label">已选 / 共 6 爻</p>
      </div>
    </div>
  );
}
