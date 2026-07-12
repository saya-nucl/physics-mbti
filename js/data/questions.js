export const questions = [
  // 1. Theorist (理論) vs Experimentalist (実験)
  {
    id: 1,
    text: "実験装置の調整や測定データを分析するよりも、美しい数式や抽象的な理論モデルを組み立てて考えている方が楽しい。",
    dimension: "TE",
    direction: 1 // Positive is T, Negative is E
  },
  {
    id: 2,
    text: "物理を勉強するとき、実験の授業やレポート作成よりも、講義で数式がエレガントに導出される瞬間の方に興奮する。",
    dimension: "TE",
    direction: 1
  },
  {
    id: 3,
    text: "身の回りの機械や道具が壊れたとき、その仕組みを頭で考えるより、まず実際に分解して手を動かしながら原因を探りたい。",
    dimension: "TE",
    direction: -1 // Positive is E, Negative is T
  },
  {
    id: 4,
    text: "どんなに完璧に見える理論モデルであっても、実際に精密に測定された実験データが示す事実の方を強く信頼する。",
    dimension: "TE",
    direction: -1
  },
  {
    id: 5,
    text: "ペンと紙、あるいはコンピュータ上でのシミュレーションだけで、完結するような研究スタイルに強い魅力を感じる。",
    dimension: "TE",
    direction: 1
  },

  // 2. Classical/Cosmos (古典・宇宙) vs Quantum/Particle (量子・ミクロ)
  {
    id: 6,
    text: "ロケットの軌道計算、流体のダイナミックな動き、あるいは宇宙の膨張といった、目に見えるスケールの大きなマクロな現象にロマンを感じる。",
    dimension: "CQ",
    direction: 1 // Positive is C, Negative is Q
  },
  {
    id: 7,
    text: "量子力学の「観測するまで状態が定まらない」という不確定な世界観より、相対性理論のような美しく決定論的な時空の幾何学の方がしっくりくる。",
    dimension: "CQ",
    direction: 1
  },
  {
    id: 8,
    text: "ナノ物質の挙動、超伝導、あるいはクォークやヒッグス粒子など、「極微の世界で働く奇妙なルール」に強く惹かれる。",
    dimension: "CQ",
    direction: -1 // Positive is Q, Negative is C
  },
  {
    id: 9,
    text: "物理学の話題で最も興味を惹かれるのは、ブラックホールや銀河の衝突、宇宙の誕生といった、壮大な宇宙スケールの謎である。",
    dimension: "CQ",
    direction: 1
  },
  {
    id: 10,
    text: "万物を構成する「究極の最小基本粒子」が何であるか、そのミクロな世界のルールを解き明かしたい。",
    dimension: "CQ",
    direction: -1
  },

  // 3. Mathematical/Formal (数理・厳密) vs Phenomenological/Pragmatic (現象論・実用)
  {
    id: 11,
    text: "物理法則を学ぶとき、直感的なわかりやすさよりも、数学的な厳密さや対称性の美しさを何よりも重視したい。",
    dimension: "MP",
    direction: 1 // Positive is M, Negative is P
  },
  {
    id: 12,
    text: "複雑な現象を説明するためなら、厳密な数学的証明が完了していなくても、大胆な近似や実用的なモデル化を行うことに抵抗がない。",
    dimension: "MP",
    direction: -1 // Positive is P, Negative is M
  },
  {
    id: 13,
    text: "方程式が極めてシンプルで美しく整理されていることは、それが自然界の真理であることの強力な証拠だと思う。",
    dimension: "MP",
    direction: 1
  },
  {
    id: 14,
    text: "どんなに数学的に洗練された美しい理論であっても、現実の複雑な現象や観測データを説明できなければ、価値は半減すると思う。",
    dimension: "MP",
    direction: -1
  },
  {
    id: 15,
    text: "物理法則の根底にある「前提条件」や「公理的枠組み」を厳密に突き詰めることこそが、真の物理学の探求だと感じる。",
    dimension: "MP",
    direction: 1
  },

  // 4. Fundamental (基礎) vs Applied (応用)
  {
    id: 16,
    text: "「宇宙はどのように始まったのか」「なぜ質量が存在するのか」といった、実用性からは遠い究極の知の探求に命を燃やしたい。",
    dimension: "FA",
    direction: 1 // Positive is F, Negative is A
  },
  {
    id: 17,
    text: "物理の法則を活用して、超伝導リニア、量子コンピュータ、あるいは高性能半導体などの次世代テクノロジーを創り出したい。",
    dimension: "FA",
    direction: -1 // Positive is A, Negative is F
  },
  {
    id: 18,
    text: "研究テーマを選ぶとすれば、日常生活やビジネスに直接役立つものより、純粋な人間の知的好奇心を極限まで広げるものを選びたい。",
    dimension: "FA",
    direction: 1
  },
  {
    id: 19,
    text: "物理学の価値は、エネルギー問題の解決や医療技術の発展など、人類の具体的な課題解決に実用的に活かされてこそ最大化すると思う。",
    dimension: "FA",
    direction: -1
  },
  {
    id: 20,
    text: "実用的な恩恵や利益が一切なかったとしても、自然界の新しい対称性や法則を見出すこと自体が、人生を捧げるに値する目的である。",
    dimension: "FA",
    direction: 1
  },

  // 5. Humanities (文系トラップ)
  {
    id: 21,
    text: "リンゴが木から落ちるのを見たとき、重力加速度（g = 9.8m/s²）を計算するよりも、秋の深まりや詩的な情緒を感じる。",
    dimension: "H",
    direction: 1 // Positive means higher Humanities score
  },
  {
    id: 22,
    text: "数式を解いたり実験データをグラフ化するよりも、小説を読んだり、歴史上のドラマや世界の思想史に思いを馳せる方が圧倒的に心躍る。",
    dimension: "H",
    direction: 1
  },
  {
    id: 23,
    text: "ブラックホールの特異点や宇宙の法則よりも、人間の複雑な感情、心理、あるいは社会システムや人間関係の謎の方が探求しがいがある。",
    dimension: "H",
    direction: 1
  }
];
