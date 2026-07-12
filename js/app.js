import { questions } from './data/questions.js?v=10';
import { results } from './data/results.js?v=10';

// ==========================================================================
// APPLICATION STATE
// ==========================================================================
const state = {
  currentScreen: 'intro', // 'intro' | 'question' | 'loading' | 'result'
  currentQuestionIndex: 0,
  answers: {}, // Key: questionId, Value: selectedValue (-3 to 3)
  calculatedResults: null // Holds calculation data for result screen
};

const appEl = document.getElementById('app');

// ==========================================================================
// LOADING SCREEN SCIENTIFIC PHRASES
// ==========================================================================
const loadingPhrases = [
  "シュレーディンガーの波動関数を収縮させています...",
  "観測によるデコヒーレンスをシミュレート中...",
  "思考の固有状態を基底ベクトルへ射影しています...",
  "万有引力の座標系にプロット中...",
  "エントロピーの増大を抑制しています...",
  "熱力学的平衡状態に到達しました..."
];

// ==========================================================================
// MAIN ROUTER / RENDERER
// ==========================================================================
function render() {
  appEl.innerHTML = '';
  
  switch (state.currentScreen) {
    case 'intro':
      renderIntro();
      break;
    case 'question':
      renderQuestion();
      break;
    case 'loading':
      renderLoading();
      break;
    case 'result':
      renderResult();
      break;
    default:
      renderIntro();
  }
}

// ==========================================================================
// 1. INTRO SCREEN
// ==========================================================================
function renderIntro() {
  const panel = document.createElement('div');
  panel.className = 'glass-panel intro-container';
  
  panel.innerHTML = `
    <span class="badge">Experimental Personality Test</span>
    <h1 class="intro-title">あなたの思考を物理の座標に射影する<br><span>物理版MBTI診断</span></h1>
    <p class="intro-subtitle">
      23の質問に回答し、あなたの思考スタイルが「理論か実験か」「ミクロかマクロか」などを診断します。
      あなたに最も近い歴史上の偉大な物理学者を解き明かしましょう。
    </p>
    <p class="presented-by">Presented by <a href="https://nazeyama.com" target="_blank">nazeyama</a></p>
    
    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h3>連続的なプロファイル</h3>
        <p>16タイプに分類されるだけでなく、各指標の強さ（％）をグラデーションで可視化します。</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🎓</div>
        <h3>偉人とのマッチング</h3>
        <p>アインシュタインやファインマンなど、あなたの思考モデルに最も近い歴史上の物理学者を紹介します。</p>
      </div>

    </div>
    
    <button id="start-btn" class="btn btn-primary">測定を開始する</button>
  `;
  
  appEl.appendChild(panel);
  
  document.getElementById('start-btn').addEventListener('click', () => {
    state.currentScreen = 'question';
    state.currentQuestionIndex = 0;
    state.answers = {};
    render();
  });
}

// ==========================================================================
// 2. QUESTION SCREEN
// ==========================================================================
function renderQuestion() {
  const q = questions[state.currentQuestionIndex];
  const progressPercent = Math.round((state.currentQuestionIndex / questions.length) * 100);
  
  const panel = document.createElement('div');
  panel.className = 'glass-panel question-container';
  
  panel.innerHTML = `
    <div class="question-nav">
      <button id="prev-btn" class="btn-back" ${state.currentQuestionIndex === 0 ? 'style="visibility:hidden;"' : ''}>
        ← 前の質問に戻る
      </button>
      <span class="progress-info">${state.currentQuestionIndex + 1} / ${questions.length}</span>
    </div>
    
    <div class="progress-track">
      <div class="progress-bar" style="width: ${progressPercent}%;"></div>
    </div>
    
    <div class="question-body">
      <p class="question-text">${q.text}</p>
      
      <div class="scale-container">
        <div class="scale-labels">
          <span class="scale-label agree">同意する</span>
          <span class="scale-label disagree">反対する</span>
        </div>
        <div class="scale-buttons">
          <button class="scale-btn scale-btn-agree-3" data-value="3" title="強く同意する"></button>
          <button class="scale-btn scale-btn-agree-2" data-value="2" title="同意する"></button>
          <button class="scale-btn scale-btn-agree-1" data-value="1" title="少し同意する"></button>
          <button class="scale-btn scale-btn-neutral" data-value="0" title="どちらでもない"></button>
          <button class="scale-btn scale-btn-disagree-1" data-value="-1" title="少し反対する"></button>
          <button class="scale-btn scale-btn-disagree-2" data-value="-2" title="反対する"></button>
          <button class="scale-btn scale-btn-disagree-3" data-value="-3" title="強く反対する"></button>
        </div>
      </div>
    </div>
  `;
  
  appEl.appendChild(panel);
  
  // 以前の回答を選択状態にする
  const savedAnswer = state.answers[q.id];
  if (savedAnswer !== undefined) {
    const activeBtn = panel.querySelector(`.scale-btn[data-value="${savedAnswer}"]`);
    if (activeBtn) activeBtn.classList.add('selected');
  }
  
  // 戻るボタンのクリック処理
  if (state.currentQuestionIndex > 0) {
    document.getElementById('prev-btn').addEventListener('click', () => {
      state.currentQuestionIndex--;
      render();
    });
  }
  
  // 回答ボタンのクリック処理
  panel.querySelectorAll('.scale-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // 選択エフェクトの更新
      panel.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('selected'));
      e.target.classList.add('selected');
      
      const value = parseInt(e.target.getAttribute('data-value'), 10);
      state.answers[q.id] = value;
      
      // MBTI風の心地よい操作感のため、少し遅延させて次の質問へ
      setTimeout(() => {
        if (state.currentQuestionIndex < questions.length - 1) {
          state.currentQuestionIndex++;
          render();
        } else {
          // すべて回答完了 ➔ 診断画面へ
          state.currentScreen = 'loading';
          render();
        }
      }, 250);
    });
  });
}

// ==========================================================================
// 3. LOADING / CALCULATION SCREEN (With physics-themed animation)
// ==========================================================================
function renderLoading() {
  const panel = document.createElement('div');
  panel.className = 'glass-panel loading-container';
  
  panel.innerHTML = `
    <div class="quantum-spinner">
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="orbit orbit-3"></div>
      <div class="nucleus"></div>
    </div>
    <div class="loading-text" id="loading-text-target">観測データを解析しています...</div>
  `;
  
  appEl.appendChild(panel);
  
  // フレーズを周期的に切り替えるアニメーション
  const textTarget = document.getElementById('loading-text-target');
  let phraseIdx = 0;
  
  const interval = setInterval(() => {
    if (textTarget) {
      textTarget.style.opacity = 0;
      setTimeout(() => {
        textTarget.innerText = loadingPhrases[phraseIdx % loadingPhrases.length];
        textTarget.style.opacity = 1;
        phraseIdx++;
      }, 200);
    }
  }, 900);
  
  // 3秒後に診断結果を計算して結果画面に遷移
  setTimeout(() => {
    clearInterval(interval);
    state.calculatedResults = calculateResult();
    state.currentScreen = 'result';
    render();
  }, 3200);
}

// ==========================================================================
// 4. DIAGNOSIS CALCULATION ALGORITHM
// ==========================================================================
function calculateResult() {
  // --- A. 文系トラップ (H) の判定 ---
  // 文系質問はid: 21, 22, 23 (dimension: "H")
  const hQuestions = questions.filter(q => q.dimension === 'H');
  let hScoreSum = 0;
  
  hQuestions.forEach(q => {
    const rawAns = state.answers[q.id] !== undefined ? state.answers[q.id] : 0;
    // rawAns (-3 ~ +3) を 0 ~ 6 点にスケーリング
    // 強く同意(3) ➔ 6点, 強く反対(-3) ➔ 0点
    const points = rawAns + 3;
    hScoreSum += points;
  });
  
  const hMaxPossible = hQuestions.length * 6; // 18点
  const hPercentage = (hScoreSum / hMaxPossible) * 100;
  
  // もし文系パーセントが 75% 以上（14点以上）なら、文系結果をオーバーライド
  if (hPercentage >= 75) {
    return {
      isHumanities: true,
      typeCode: 'BNKI',
      data: results['BNKI'],
      hScore: hPercentage,
      metrics: {
        TE: 50, // 真ん中にダミー配置
        CQ: 50,
        MP: 50,
        FA: 50
      }
    };
  }
  
  // --- B. 物理指標の計算 ---
  const dimensions = {
    TE: { score: 0, count: 5 },
    CQ: { score: 0, count: 5 },
    MP: { score: 0, count: 5 },
    FA: { score: 0, count: 5 }
  };
  
  // 各質問の回答を集計
  questions.forEach(q => {
    if (q.dimension !== 'H') {
      const rawAns = state.answers[q.id] !== undefined ? state.answers[q.id] : 0;
      // direction を掛けてスコアに加算
      dimensions[q.dimension].score += rawAns * q.direction;
    }
  });
  
  // 各指標の割合 (0 - 100) を計算
  // 5問ずつのため、最大スコアは 5 * 3 = 15, 最小スコアは 5 * -3 = -15
  // スケーリング式: percentage (左側要素の比率) = ((score - min) / (max - min)) * 100
  const metrics = {};
  for (const [key, dim] of Object.entries(dimensions)) {
    const maxVal = dim.count * 3; // 15
    const minVal = dim.count * -3; // -15
    const percentage = ((dim.score - minVal) / (maxVal - minVal)) * 100;
    metrics[key] = Math.round(percentage);
  }
  
  // 4文字コードの決定
  // 各指標 50% を境界とする。
  // スコアが 0 より大きい（50%超）なら左側文字、0以下（50%以下）なら右側文字。
  const tOrE = metrics.TE > 50 ? 'T' : 'E';
  const cOrQ = metrics.CQ > 50 ? 'C' : 'Q';
  const mOrP = metrics.MP > 50 ? 'M' : 'P';
  const fOrA = metrics.FA > 50 ? 'F' : 'A';
  
  const typeCode = `${tOrE}${cOrQ}${mOrP}${fOrA}`;
  const resultData = results[typeCode] || results['TCMF']; // フォールバック
  
  return {
    isHumanities: false,
    typeCode,
    data: resultData,
    hScore: hPercentage,
    metrics
  };
}

// ==========================================================================
// 5. RESULT SCREEN
// ==========================================================================
function renderResult() {
  const { isHumanities, typeCode, data, metrics } = state.calculatedResults;
  
  const panel = document.createElement('div');
  panel.className = 'glass-panel result-container';
  
  // 指標プロファイルHTMLの生成
  let metricsHTML = '';
  
  if (isHumanities) {
    metricsHTML = `
      <div class="metric-row">
        <div class="metric-labels">
          <span class="metric-label-left">L (Liberal Arts / 人文・芸術感性)</span>
          <span class="metric-percentage">100%</span>
        </div>
        <div class="metric-bar-track">
          <div class="metric-bar-fill" style="width: 100%;"></div>
        </div>
        <p class="metric-desc">あなたは物理学の定規（数式や測定）では測れない、極めて高い人間的感性や文学的情緒（文系脳）を発揮しています。</p>
      </div>
    `;
  } else {
    // 物理指標4つの表示
    const metricsData = [
      {
        key: 'TE',
        left: 'T (Theorist / 理論家)',
        right: 'E (Experimentalist / 実験屋)',
        val: metrics.TE,
        desc: '思考の出力形式：美しい数理モデルを追求するか、リアリティあふれる実験事実を信頼するか。'
      },
      {
        key: 'CQ',
        left: 'C (Cosmos / マクロ・古典)',
        right: 'Q (Quantum / ミクロ・量子)',
        val: metrics.CQ,
        desc: '関心の対象スケール：巨大な時空のダイナミクスを好むか、極微の不可思議な量子世界を好むか。'
      },
      {
        key: 'MP',
        left: 'M (Mathematical / 数理・厳密)',
        right: 'P (Phenomenological / 現象論・近似)',
        val: metrics.MP,
        desc: '研究へのアプローチ：完璧で対称的な数理的真理を求めるか、実用的で現実を説明するモデルを求めるか。'
      },
      {
        key: 'FA',
        left: 'F (Fundamental / 基礎・純粋)',
        right: 'A (Applied / 応用・社会実装)',
        val: metrics.FA,
        desc: '探求の目的：宇宙の根源的謎という知の極限を目指すか、人類社会を豊かにするイノベーションを目指すか。'
      }
    ];
    
    metricsHTML = metricsData.map(item => {
      // 50% を基準として、どちらが優勢かを判定
      const leftDominant = item.val > 50;
      const displayVal = leftDominant ? item.val : (100 - item.val);
      const labelText = leftDominant ? item.left : item.right;
      
      // バーの幅と向きの設定
      // 左側優勢なら左から伸ばす。右側優勢なら右から伸ばす（またはCSSで右寄せにする）
      const barStyle = leftDominant 
        ? `width: ${item.val}%;` 
        : `width: ${100 - item.val}%;`;
        
      const barClass = leftDominant ? 'metric-bar-fill' : 'metric-bar-fill right-dominant';
      
      return `
        <div class="metric-row">
          <div class="metric-labels">
            <span class="metric-label-left">${item.left}</span>
            <span class="metric-percentage">${item.val}% vs ${100 - item.val}%</span>
            <span class="metric-label-right">${item.right}</span>
          </div>
          <div class="metric-bar-track">
            <div class="${barClass}" style="${barStyle}"></div>
          </div>
          <p class="metric-desc">${item.desc}</p>
        </div>
      `;
    }).join('');
  }
  
  // 適した分野のタグ生成
  const tagsHTML = data.fields.map(f => `<span class="field-tag">${f}</span>`).join('');
  
  // 似ている物理学者たちのHTMLカードをループ生成
  const scientistsHTML = data.scientists.map(sc => `
    <div class="scientist-card">
      <div class="scientist-avatar-container">
        ${sc.avatar}
      </div>
      <div class="scientist-info">
        <span class="scientist-label">似ている物理学者</span>
        <h2 class="scientist-name">${sc.name}</h2>
        <p class="scientist-description">${sc.bio}</p>
        <div class="quote-box">
          <p>${sc.famousQuote}</p>
        </div>
      </div>
    </div>
  `).join('');
  
  // 結果テキストのコピペ用作成
  const scientistNames = data.scientists.map(sc => sc.name).join('、');
  const mainQuote = data.scientists[0].famousQuote.replace(/[「」]/g, '');
  const shareText = `【物理版MBTI診断結果】
あなたのタイプ：${typeCode} - ${data.typeTitle}
似ている物理学者：${scientistNames}
「${mainQuote}」
提供：nazeyama (https://nazeyama.com)
#物理版MBTI #PHYSICS_MBTI #nazeyama`;

  panel.innerHTML = `
    <div class="result-header">
      <span class="result-type-badge">診断座標</span>
      <h1 class="result-type-code">${typeCode}</h1>
      <p class="result-type-title">${data.typeTitle}</p>
      <p class="result-type-desc" style="max-width: 700px; margin: 1.5rem auto 0; line-height: 1.7; color: var(--text-muted); font-size: 1.05rem;">
        ${data.description}
      </p>
    </div>
    
    <div class="scientists-section" style="display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem;">
      ${scientistsHTML}
    </div>
    
    <div class="metrics-section">
      <h2 class="metrics-title">📊 指標パラメータプロファイル</h2>
      ${metricsHTML}
    </div>
    
    <div class="fields-section">
      <h2 class="fields-title">🔬 あなたに適した物理学領域</h2>
      <div class="fields-tags">
        ${tagsHTML}
      </div>
    </div>
    
    <div class="promo-card">
      <div class="promo-icon">⛰️</div>
      <div class="promo-info">
        <span class="promo-label">Presented by Sponsor</span>
        <h3 class="promo-title">nazeyama（ナゼヤマ）</h3>
        <p class="promo-desc">
          「なぜ？」を山のように積み重ねて、物理や宇宙の不思議をどこまでも深掘りする科学メディア。本診断の運営元です。
        </p>
        <a href="https://nazeyama.com" target="_blank" class="promo-link">nazeyamaを訪ねる ➔</a>
      </div>
    </div>
    
    <div class="result-actions">
      <button id="retry-btn" class="btn btn-secondary">もう一度測定する</button>
      <div class="share-container">
        <button id="share-btn" class="btn btn-primary">結果をコピーして共有する</button>
        <span class="tooltip" id="copy-tooltip">クリップボードにコピーしました！</span>
      </div>
    </div>
  `;
  
  appEl.appendChild(panel);
  
  // リトライイベント
  document.getElementById('retry-btn').addEventListener('click', () => {
    state.currentScreen = 'intro';
    state.currentQuestionIndex = 0;
    state.answers = {};
    state.calculatedResults = null;
    render();
  });
  
  // 共有テキストのコピーイベント
  document.getElementById('share-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(shareText).then(() => {
      const tooltip = document.getElementById('copy-tooltip');
      tooltip.classList.add('show');
      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 2000);
    }).catch(err => {
      console.error('コピーに失敗しました: ', err);
      alert('コピーに失敗しました。お手数ですが手動でコピーしてください。');
    });
  });
}

// ==========================================================================
// APPLICATION INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  render();
});
