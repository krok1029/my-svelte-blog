<script lang="ts">
  import Metronome from './Metronome.svelte';
  import PracticeLayout from '$components/PracticeLayout.svelte';

  const practiceInfo = {
    id: 4,
    title: 'Simple Metronome',
    description: '使用 JavaScript 製作簡單的節拍器，練習音頻 API 和定時器的使用。',
    type: 'js' as const,
    difficulty: 'medium' as const,
    tags: ['audio', 'timer', 'music', 'web-audio-api'],
    concepts: [
      'Audio API 音頻播放',
      'setInterval 定時器控制',
      'BPM (每分鐘節拍數) 計算',
      '音量控制和預載入'
    ],
    codeExamples: [
      {
        title: '音頻設定',
        description: '建立音頻物件並設定預載入。',
        code: `const mainBeat = new Audio('metronome1.mp3');
const subBeat = new Audio('metronome2.mp3');

// 預載入音頻檔案
mainBeat.preload = 'auto';
subBeat.preload = 'auto';

// 設定音量
mainBeat.volume = 0.8;
subBeat.volume = 0.8;`,
        language: 'javascript'
      },
      {
        title: '節拍控制邏輯',
        description: '使用計數器控制主拍和副拍的播放。',
        code: `let beatCount = 0;
const BEAT = 2; // 每兩拍一個循環

function playSound() {
  beatCount++;
  
  if (beatCount % BEAT === 0) {
    // 主拍 (重音)
    subBeat.pause();
    subBeat.currentTime = 0;
    mainBeat.play();
  } else {
    // 副拍
    mainBeat.pause();
    mainBeat.currentTime = 0;
    subBeat.play();
  }
}`,
        language: 'javascript'
      },
      {
        title: '定時器控制',
        description: '根據 BPM 計算間隔時間並控制播放。',
        code: `let tempo = 120; // BPM
let isPlaying = false;
let interval;

function toggleMetronome() {
  if (isPlaying) {
    clearInterval(interval);
    beatCount = 0;
  } else {
    // 60000ms / BPM = 每拍間隔毫秒數
    const intervalTime = 60000 / tempo;
    interval = setInterval(playSound, intervalTime);
  }
  isPlaying = !isPlaying;
}`,
        language: 'javascript'
      }
    ]
  };
</script>

<PracticeLayout {practiceInfo}>
  <div slot="demo">
    <Metronome />
  </div>
  
  <div slot="tips">
    <div class="space-y-4">
      <p class="text-gray-700">
        這個節拍器展示了如何使用 Web Audio API 和定時器創建音樂工具。重點在於精確的時間控制和音頻同步。
      </p>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 class="font-semibold text-blue-900 mb-2">💡 學習要點：</h4>
        <ul class="text-blue-800 text-sm space-y-1">
          <li>• Audio 物件的 preload 屬性可以提升播放性能</li>
          <li>• 重置 currentTime 確保音頻從頭播放</li>
          <li>• BPM 轉換公式：60000ms ÷ BPM = 間隔毫秒數</li>
          <li>• 使用計數器創造節拍的重音效果</li>
        </ul>
      </div>
    </div>
  </div>
</PracticeLayout>
