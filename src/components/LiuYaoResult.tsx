import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generateLiuYaoAnalysis, type LiuYaoResult as LiuYaoResultType } from '@/utils/liuyao';
import './LiuYao.css';

// 单条爻的图形
function YaoLine({ isYang, isChanging, label }: { isYang: boolean; isChanging: boolean; label?: string }) {
  return (
    <div className={`yao-line ${isYang ? 'yang' : 'yin'} ${isChanging ? 'changing' : ''}`}>
      {isYang ? (
        <div className="yao-bar yang-bar" />
      ) : (
        <div className="yao-bar yin-bar">
          <span className="yin-seg" /><span className="yin-gap" /><span className="yin-seg" />
        </div>
      )}
      {label && <span className="yao-label">{label}</span>}
    </div>
  );
}

function HexagramDisplay({ binary, label }: { binary: string; label: string }) {
  const bits = binary.split('').reverse(); // 从上往下显示
  return (
    <div className="hexagram-box">
      <h4>{label}</h4>
      <div className="hexagram-lines">
        {bits.map((b, i) => (
          <YaoLine key={i} isYang={b === '1'} isChanging={false} label={`${6 - i}`} />
        ))}
      </div>
    </div>
  );
}

export default function LiuYaoResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<LiuYaoResultType | null>(null);
  const [analysis, setAnalysis] = useState<string[]>([]);

  useEffect(() => {
    const fromState = (location.state as { result: LiuYaoResultType } | null)?.result;
    const fromStorage = sessionStorage.getItem('liuyaoResult');
    const data = fromState || (fromStorage ? JSON.parse(fromStorage) : null);
    if (!data) { navigate('/liuyao', { replace: true }); return; }
    setResult(data);
    setAnalysis(generateLiuYaoAnalysis(data));
  }, [location.state, navigate]);

  if (!result) return null;

  const { originalHexagram, changedHexagram, originalBinary, changedBinary, movingYaoIndices, mbtiType } = result;

  return (
    <div className="liuyao-container page-transition">
      <div className="liuyao-result-header">
        <h1>🔮 你的易经理性格卦象</h1>
      </div>

      {/* 双卦对比 */}
      <div className="hexagram-compare">
        <HexagramDisplay binary={originalBinary} label={`本卦 · ${originalHexagram.name}`} />
        {changedBinary && changedHexagram && (
          <>
            <div className="hexagram-arrow">→</div>
            <HexagramDisplay binary={changedBinary} label={`变卦 · ${changedHexagram.name}`} />
          </>
        )}
      </div>

      {/* 卦象信息 */}
      <div className="liuyao-section">
        <h2>📜 卦象解读</h2>
        <div className="hexagram-info-card">
          <div className="hexagram-name">{originalHexagram.name}（{originalHexagram.pinyin}）</div>
          <div className="hexagram-meaning">{originalHexagram.meaning}</div>
          <p className="hexagram-advice">{originalHexagram.advice}</p>
        </div>
        {changedHexagram && (
          <div className="hexagram-info-card changed">
            <div className="hexagram-name">{changedHexagram.name}（{changedHexagram.pinyin}）</div>
            <div className="hexagram-meaning">{changedHexagram.meaning}</div>
            <p className="hexagram-advice">{changedHexagram.advice}</p>
            <div className="moving-yao-info">
              动爻：第 <strong>{movingYaoIndices.join('、')}</strong> 爻
            </div>
          </div>
        )}
      </div>

      {/* 各爻详情 */}
      <div className="liuyao-section">
        <h2>📊 六爻详情</h2>
        <div className="yao-detail-list">
          {[...result.yaos].reverse().map(y => {
            const labels: Record<string, string> = {
              old_yang: '老阳 ○（阳变阴）', young_yang: '少阳 —',
              young_yin: '少阴 - -', old_yin: '老阴 X（阴变阳）',
            };
            return (
              <div key={y.index} className={`yao-detail-item ${y.isChanging ? 'changing' : ''}`}>
                <div className="yao-detail-header">
                  <span className="yao-detail-pos">第 {y.index} 爻</span>
                  <span className="yao-detail-type">{labels[y.type]}</span>
                  {y.isChanging && <span className="yao-detail-badge">动爻</span>}
                </div>
                <div className="yao-detail-line">
                  <YaoLine isYang={y.isYang} isChanging={y.isChanging} />
                </div>
                <div className="yao-detail-desc">
                  {y.dimension === 'EI' && '精力来源：'}{y.dimension === 'SN' && '感知方式：'}
                  {y.dimension === 'TF' && '决策倾向：'}{y.dimension === 'JP' && '生活态度：'}
                  {y.isYang ? '阳（主动、外显）' : '阴（内敛、沉静）'}
                  {y.isChanging ? ' → 即将转变' : ''}
                </div>
              </div>
            );
          }).reverse()}
        </div>
      </div>

      {/* MBTI 推演 */}
      <div className="liuyao-section">
        <h2>🧩 卦象推演 MBTI</h2>
        <div className="mbti-result-card">
          <div className="mbti-type-badge">{mbtiType}</div>
          <div className="mbti-analysis">
            {analysis.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="liuyao-actions">
        <button className="primary-button" onClick={() => navigate('/liuyao')}>重新测试</button>
        <button className="secondary-button" onClick={() => navigate('/')}>返回首页</button>
      </div>
    </div>
  );
}
