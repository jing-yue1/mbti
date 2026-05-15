import React, { useState, useEffect } from 'react';
import './HexagramPrediction.css';

const HexagramPrediction: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [originalYao, setOriginalYao] = useState<number[]>([]);
  const [changedYao, setChangedYao] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [interpretation, setInterpretation] = useState('');
  const [luckInfo, setLuckInfo] = useState({ level: '', text: '' });
  const [history, setHistory] = useState<any[]>([]);

  // 先天八卦数
  const baguaNumbers = {
    '乾': 1,
    '兑': 2,
    '离': 3,
    '震': 4,
    '巽': 5,
    '坎': 6,
    '艮': 7,
    '坤': 8
  };

  // 六十四卦映射表
  const hexagramMap = [
    { name: '乾为天', text: '元亨利贞', luck: 5 },
    { name: '天风姤', text: '女壮，勿用取女', luck: 3 },
    { name: '天山遁', text: '亨，小利贞', luck: 4 },
    { name: '天地否', text: '否之匪人，不利君子贞', luck: 2 },
    { name: '风地观', text: '盥而不荐，有孚颙若', luck: 3 },
    { name: '山地剥', text: '不利有攸往', luck: 2 },
    { name: '火地晋', text: '康侯用锡马蕃庶', luck: 4 },
    { name: '火天大有', text: '元亨', luck: 5 },
    { name: '泽天夬', text: '扬于王庭', luck: 4 },
    { name: '兑为泽', text: '亨利贞', luck: 4 },
    { name: '泽山咸', text: '亨利贞', luck: 4 },
    { name: '泽地萃', text: '亨，王假有庙', luck: 4 },
    { name: '泽风大过', text: '栋桡，利有攸往', luck: 2 },
    { name: '泽火革', text: '己日乃孚', luck: 3 },
    { name: '泽水困', text: '亨，贞大人吉', luck: 3 },
    { name: '泽雷随', text: '元亨利贞', luck: 5 },
    { name: '火山旅', text: '小亨，旅贞吉', luck: 3 },
    { name: '火风鼎', text: '元吉亨', luck: 4 },
    { name: '火水未济', text: '亨，小狐汔济', luck: 3 },
    { name: '火雷噬嗑', text: '亨，利用狱', luck: 3 },
    { name: '火地晋', text: '康侯用锡马蕃庶', luck: 4 },
    { name: '火天大有', text: '元亨', luck: 5 },
    { name: '离为火', text: '利贞，亨', luck: 4 },
    { name: '雷火丰', text: '亨，王假之', luck: 4 },
    { name: '雷山小过', text: '亨，利贞', luck: 3 },
    { name: '雷风恒', text: '亨，无咎，利贞', luck: 4 },
    { name: '雷水解', text: '亨，利西南', luck: 4 },
    { name: '雷地豫', text: '利建侯行师', luck: 4 },
    { name: '雷天壮', text: '利贞', luck: 4 },
    { name: '震为雷', text: '亨，震来虩虩', luck: 3 },
    { name: '泽雷随', text: '元亨利贞', luck: 5 },
    { name: '巽为风', text: '小亨，利有攸往', luck: 3 },
    { name: '风天小畜', text: '亨，密云不雨', luck: 3 },
    { name: '风火家人', text: '利女贞', luck: 4 },
    { name: '风雷益', text: '利有攸往', luck: 4 },
    { name: '风泽中孚', text: '豚鱼吉', luck: 4 },
    { name: '风山渐', text: '女归吉', luck: 4 },
    { name: '风水涣', text: '亨，王假有庙', luck: 3 },
    { name: '水风井', text: '改邑不改井', luck: 3 },
    { name: '水天需', text: '有孚，光亨', luck: 3 },
    { name: '水地比', text: '吉，原筮元永贞', luck: 4 },
    { name: '坎为水', text: '习坎，有孚维心', luck: 2 },
    { name: '水泽节', text: '亨，苦节不可贞', luck: 3 },
    { name: '水雷屯', text: '元亨利贞', luck: 4 },
    { name: '水火既济', text: '亨，小利贞', luck: 4 },
    { name: '艮为山', text: '艮其背，不获其身', luck: 3 },
    { name: '山火贲', text: '亨，小利有攸往', luck: 3 },
    { name: '山天大畜', text: '利贞', luck: 4 },
    { name: '山泽损', text: '有孚，元吉', luck: 3 },
    { name: '山风蛊', text: '元亨，利涉大川', luck: 3 },
    { name: '山水蒙', text: '亨，匪我求童蒙', luck: 3 },
    { name: '山地剥', text: '不利有攸往', luck: 2 },
    { name: '山雷颐', text: '贞吉', luck: 3 },
    { name: '坤为地', text: '元亨，利牝马之贞', luck: 4 },
    { name: '地雷复', text: '亨，出入无疾', luck: 4 },
    { name: '地泽临', text: '元亨利贞', luck: 5 },
    { name: '地天泰', text: '小往大来，吉亨', luck: 5 },
    { name: '地风升', text: '元亨，用见大人', luck: 4 },
    { name: '地水师', text: '贞，大人吉', luck: 3 },
    { name: '地火明夷', text: '利艰贞', luck: 2 },
    { name: '地山谦', text: '亨，君子有终', luck: 5 },
    { name: '雷地豫', text: '利建侯行师', luck: 4 },
    { name: '风地观', text: '盥而不荐，有孚颙若', luck: 3 },
    { name: '泽地萃', text: '亨，王假有庙', luck: 4 },
    { name: '天地否', text: '否之匪人，不利君子贞', luck: 2 },
    { name: '山地剥', text: '不利有攸往', luck: 2 },
    { name: '火地晋', text: '康侯用锡马蕃庶', luck: 4 },
    { name: '地地坤', text: '元亨，利牝马之贞', luck: 4 }
  ];

  // 摇卦函数
  const shake = () => {
    const coins = [Math.random() > 0.5, Math.random() > 0.5, Math.random() > 0.5];
    const heads = coins.filter(c => c).length;
    
    if (heads === 3) {
      return 9; // 老阳
    } else if (heads === 2) {
      return 7; // 少阳
    } else if (heads === 1) {
      return 8; // 少阴
    } else {
      return 6; // 老阴
    }
  };

  // 生成卦象
  const generateHexagram = () => {
    const yao = [];
    for (let i = 0; i < 6; i++) {
      yao.push(shake());
    }
    return yao;
  };

  // 根据卦象生成八卦
  const getBagua = (yao1: number, yao2: number, yao3: number) => {
    const y1 = (yao1 === 7 || yao1 === 9) ? 1 : 0;
    const y2 = (yao2 === 7 || yao2 === 9) ? 1 : 0;
    const y3 = (yao3 === 7 || yao3 === 9) ? 1 : 0;
    
    const num = y1 * 4 + y2 * 2 + y3 * 1 + 1;
    
    const baguaNames = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤'];
    return baguaNames[num - 1];
  };

  // 获取卦名
  const getHexagramName = (yao: number[]) => {
    const upperBagua = getBagua(yao[3], yao[4], yao[5]);
    const lowerBagua = getBagua(yao[0], yao[1], yao[2]);
    
    const upperNum = baguaNumbers[upperBagua as keyof typeof baguaNumbers];
    const lowerNum = baguaNumbers[lowerBagua as keyof typeof baguaNumbers];
    const index = (upperNum - 1) * 8 + (lowerNum - 1);
    
    return hexagramMap[index].name;
  };

  // 生成变卦
  const generateChangedHexagram = (originalYao: number[]) => {
    return originalYao.map(y => {
      if (y === 9) return 8; // 老阳变阴
      if (y === 6) return 7; // 老阴变阳
      return y;
    });
  };

  // 获取吉凶等级
  const getLuckLevel = (luck: number) => {
    if (luck === 5) return { level: 'great-good', text: '大吉' };
    if (luck === 4) return { level: 'good', text: '吉' };
    if (luck === 3) return { level: 'neutral', text: '平' };
    if (luck === 2) return { level: 'bad', text: '凶' };
    return { level: 'great-bad', text: '大凶' };
  };

  // 生成解读
  const generateInterpretation = (originalYao: number[], changedYao: number[], question: string) => {
    const originalName = getHexagramName(originalYao);
    const changedName = getHexagramName(changedYao);
    
    const moveCount = originalYao.filter(y => y === 9 || y === 6).length;
    
    const originalIndex = (baguaNumbers[getBagua(originalYao[3], originalYao[4], originalYao[5]) as keyof typeof baguaNumbers] - 1) * 8 + (baguaNumbers[getBagua(originalYao[0], originalYao[1], originalYao[2]) as keyof typeof baguaNumbers] - 1);
    const originalText = hexagramMap[originalIndex].text;
    
    const changedIndex = (baguaNumbers[getBagua(changedYao[3], changedYao[4], changedYao[5]) as keyof typeof baguaNumbers] - 1) * 8 + (baguaNumbers[getBagua(changedYao[0], changedYao[1], changedYao[2]) as keyof typeof baguaNumbers] - 1);
    const changedText = hexagramMap[changedIndex].text;
    
    let interpretation = `为${question || '问事'}起卦，得本卦${originalName}，${originalText}；`;
    
    if (moveCount > 0) {
      interpretation += `变卦${changedName}，${changedText}。`;
      
      if (moveCount === 1) {
        interpretation += '动爻单一，事情发展方向明确，宜把握时机。';
      } else if (moveCount === 2) {
        interpretation += '动爻两个，事情变化多端，需灵活应对。';
      } else if (moveCount === 3) {
        interpretation += '动爻三个，事情多有反复，需耐心等待。';
      } else if (moveCount >= 4) {
        interpretation += '动爻较多，事态剧变，需谨慎应对。';
      }
    } else {
      interpretation += '无动爻，静卦，事缓则圆，宜静观其变。';
    }
    
    const originalLuck = hexagramMap[originalIndex].luck;
    const changedLuck = hexagramMap[changedIndex].luck;
    const finalLuck = Math.max(originalLuck, changedLuck);
    const luckInfo = getLuckLevel(finalLuck);
    
    interpretation += `综合判断为：${luckInfo.text}。`;
    
    return { interpretation, luckInfo };
  };

  // 保存历史
  const saveHistory = (question: string, originalName: string, changedName: string, interpretation: string) => {
    const newHistory = [
      {
        id: Date.now(),
        question: question || '问事',
        originalName,
        changedName,
        interpretation,
        timestamp: new Date().toLocaleString()
      },
      ...history
    ];
    
    if (newHistory.length > 3) {
      newHistory.pop();
    }
    
    setHistory(newHistory);
    localStorage.setItem('hexagramHistory', JSON.stringify(newHistory));
  };

  // 加载历史
  useEffect(() => {
    const savedHistory = localStorage.getItem('hexagramHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 开始摇卦
  const handleStart = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const newOriginalYao = generateHexagram();
      const newChangedYao = generateChangedHexagram(newOriginalYao);
      
      setOriginalYao(newOriginalYao);
      setChangedYao(newChangedYao);
      
      const { interpretation, luckInfo } = generateInterpretation(newOriginalYao, newChangedYao, question);
      setInterpretation(interpretation);
      setLuckInfo(luckInfo);
      
      saveHistory(question, getHexagramName(newOriginalYao), getHexagramName(newChangedYao), interpretation);
      
      setIsLoading(false);
      setShowResult(true);
      
      // 滚动到结果区
      setTimeout(() => {
        document.getElementById('resultSection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1500);
  };

  // 重新起卦
  const handleReset = () => {
    setQuestion('');
    setOriginalYao([]);
    setChangedYao([]);
    setShowResult(false);
    setInterpretation('');
    setLuckInfo({ level: '', text: '' });
  };

  // 渲染爻
  const renderYao = (yao: number, index: number) => {
    const yaoTypes = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
    const isYang = yao === 7 || yao === 9;
    const isMove = yao === 9 || yao === 6;
    
    return (
      <div className="yao" key={index}>
        <span className="yao-label">{yaoTypes[index]}</span>
        <div className="yao-line">
          <div className={isYang ? 'yang' : 'yin'}></div>
        </div>
        {isMove && <span className="yao-move">⚡动</span>}
      </div>
    );
  };

  return (
    <div className="hexagram-container">
      <div className="input-section">
        <div className="form-group">
          <label htmlFor="question">所问之事：</label>
          <input 
            type="text" 
            id="question" 
            placeholder="例如：这次工作面试结果如何？" 
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button className="btn-primary" onClick={handleStart} disabled={isLoading}>
            {isLoading ? '摇卦中...' : '诚心起卦'}
          </button>
          <button className="btn-secondary" onClick={handleReset} disabled={isLoading}>
            重新起卦
          </button>
        </div>
      </div>

      {showResult && (
        <>
          <div className="result-section" id="resultSection">
            <h2>卦象结果</h2>
            <div className="hexagram-container-grid">
              <div className="hexagram">
                <h3>本卦</h3>
                <div className="hexagram-name">{originalYao.length > 0 ? getHexagramName(originalYao) : ''}</div>
                <div className="yao-container">
                  {originalYao.map((yao, index) => renderYao(yao, index))}
                </div>
              </div>
              <div className="hexagram">
                <h3>变卦</h3>
                <div className="hexagram-name">{changedYao.length > 0 ? getHexagramName(changedYao) : ''}</div>
                <div className="yao-container">
                  {changedYao.map((yao, index) => renderYao(yao, index))}
                </div>
              </div>
            </div>
          </div>

          <div className="interpretation-section">
            <h2>吉凶解读</h2>
            <div className={`luck-badge ${luckInfo.level}`}>{luckInfo.text}</div>
            <div className="interpretation-text">{interpretation}</div>
          </div>
        </>
      )}

      <div className="history-section">
        <h2>起卦历史</h2>
        <div className="history-container">
          {history.length === 0 ? (
            <p>暂无历史记录</p>
          ) : (
            history.map(item => (
              <div className="history-item" key={item.id}>
                <h4>{item.question}</h4>
                <p>{item.timestamp}</p>
                <p>本卦：{item.originalName}，变卦：{item.changedName}</p>
                <p>{item.interpretation}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {isLoading && (
        <div className="loading">
          摇卦中...
        </div>
      )}
    </div>
  );
};

export default HexagramPrediction;