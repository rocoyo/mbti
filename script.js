const questions = [
    {
        question: "1. 你喜歡和新的人見面嗎？",
        options: [
            { value: "E", text: "是的" },
            { value: "I", text: "不是" }
        ]
    },
    {
        question: "2. 經常想抽象的想法或概念嗎？",
        options: [
            { value: "N", text: "是的" },
            { value: "S", text: "不是" }
        ]
    },
    {
        question: "3. 做出判斷的時候，你認為邏輯和分析很重要嗎？",
        options: [
            { value: "T", text: "是的" },
            { value: "F", text: "不是" }
        ]
    },
    {
        question: "4. 制定計劃後希望按原樣進行嗎？",
        options: [
            { value: "J", text: "是的" },
            { value: "P", text: "不是" }
        ]
    },
    {
        question: "5. 跟人們相處很累嗎？",
        options: [
            { value: "I", text: "是的" },
            { value: "E", text: "不是" }
        ]
    },
    {
        question: "6. 喜歡現實和具體的資訊嗎？",
        options: [
            { value: "S", text: "是的" },
            { value: "N", text: "不是" }
        ]
    },
    {
        question: "7. 你喜歡以感情為基礎的決定嗎?",
        options: [
            { value: "F", text: "是的" },
            { value: "T", text: "不是" }
        ]
    },
    {
        question: "8. 您更重視靈活性和即興發揮嗎？",
        options: [
            { value: "P", text: "是的" },
            { value: "J", text: "不是" }
        ]
    },
    {
        question: "9. 你喜歡和各種各樣的人在一起嗎？",
        options: [
            { value: "E", text: "是的" },
            { value: "I", text: "不是" }
        ]
    },
    {
        question: "10. 你喜歡想象未來的可能性嗎？",
        options: [
            { value: "N", text: "是的" },
            { value: "S", text: "不是" }
        ]
    },
    {
        question: "11. 解決問題時會選擇理性的方法嗎？",
        options: [
            { value: "T", text: "是的" },
            { value: "F", text: "不是" }
        ]
    },
    {
        question: "12. 準確管理並遵守日程嗎？",
        options: [
            { value: "J", text: "是的" },
            { value: "P", text: "不是" }
        ]
    },
    {
        question: "13. 在聚會或派對上和周圍的人積極對話嗎？",
        options: [
            { value: "E", text: "是的" },
            { value: "I", text: "不是" }
        ]
    },
    {
        question: "14. 你更喜歡透過觀察和經驗來理解世界嗎？",
        options: [
            { value: "S", text: "是的" },
            { value: "N", text: "不是" }
        ]
    },
    {
        question: "15. 在任何情況下都會努力做出客觀的判斷嗎？",
        options: [
            { value: "T", text: "是的" },
            { value: "F", text: "不是" }
        ]
    },
    {
        question: "16. 你是為了實現目標而系統地制定計劃嗎？",
        options: [
            { value: "J", text: "是的" },
            { value: "P", text: "不是" }
        ]
    },
    {
        question: "17. 一個人的時間沒有負擔，舒服嗎？",
        options: [
            { value: "I", text: "是的" },
            { value: "E", text: "不是" }
        ]
    },
    {
        question: "18. 你喜歡用形象、比喻或比喻來思考或對話嗎?",
        options: [
            { value: "N", text: "是的" },
            { value: "S", text: "不是" }
        ]
    },
    {
        question: "19. 你主要考慮價值、感情和關係來做決定嗎？",
        options: [
            { value: "F", text: "是的" },
            { value: "T", text: "不是" }
        ]
    },
    {
        question: "20. 容易適應新情況,尋找靈活的解決方案嗎？",
        options: [
            { value: "P", text: "是的" },
            { value: "J", text: "不是" }
        ]
    }
];

let currentQuestionIndex = 0;
const answers = {};

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];

    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map(option => `
            <label>
                <input type="radio" name="q${currentQuestionIndex + 1}" value="${option.value}"> ${option.text}
            </label>
        `).join('')}
    `;

    document.getElementById('prevButton').disabled = currentQuestionIndex === 0;

    // 根據當前問題的索引顯示按鈕
    if (currentQuestionIndex === questions.length - 1) {
        document.getElementById('nextButton').innerText = "確認結果";
    } else {
        document.getElementById('nextButton').innerText = "下一條";
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        answers[`q${currentQuestionIndex + 1}`] = selectedOption.value;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            calculateResults();
        }
    } else {
        alert("請選擇一個選項！");
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function calculateMBTI(answers) {
    // 簡單的 MBTI 計算邏輯
    const traits = {
        E: 0,
        I: 0,
        S: 0,
        N: 0,
        T: 0,
        F: 0,
        J: 0,
        P: 0
    };

    for (let key in answers) {
        traits[answers[key]]++;
    }

    return (traits.E > traits.I ? 'E' : 'I') +
           (traits.S > traits.N ? 'S' : 'N') +
           (traits.T > traits.F ? 'T' : 'F') +
           (traits.J > traits.P ? 'J' : 'P');
}

const mbtiDescriptions = {
    ISTJ: {
        title: "ISTJ（檢察官型）",
        traits: "注重責任、傳統和秩序，擅長規劃和遵守規則。對細節和效率有高度要求。",
        strengths: "穩重可靠，適應結構化工作，喜歡按照既定流程行事。",
        challenges: "對變化或創新不感興趣，可能過於僵化和固執。",
        image: "images/istj.jpg"
    },
    ISFJ: {
        title: "ISFJ（守護者型）",
        traits: "非常關懷他人，樂於提供支持，忠誠可靠。喜歡保護弱勢群體，重視人際關係。",
        strengths: "有強烈的責任感和奉獻精神，注重細節，善於照顧和協調。",
        challenges: "可能過於自我犧牲，忽視自己的需求，容易感到疲憊。",
        image: "images/isfj.jpg"
    },
    INFJ: {
        title: "INFJ（提倡者型）",
        traits: "內心理想主義，富有洞察力和直覺，關心社會問題，渴望改變世界。",
        strengths: "擅長洞察他人內心，能夠激勵和啟發周圍的人，關心大局和未來的可能性。",
        challenges: "容易過度理想化，面對現實挑戰時會感到挫敗。",
        image: "images/infj.jpg"
    },
    INTJ: {
        title: "INTJ（建築師型）",
        traits: "冷靜、理性，富有遠見，擅長長期規劃和戰略思考，對自己的能力充滿自信。",
        strengths: "能夠系統化地解決問題，有清晰的目標和強大的執行力。",
        challenges: "可能過於孤立和強��，不太關注他人的情感需求。",
        image: "images/intj.jpg"
    },
    ISTP: {
        title: "ISTP（工匠型）",
        traits: "實際、靈活，喜歡動手操作，重視效率和即時反饋，善於應對突發問題。",
        strengths: "擅長解決具體問題，反應迅速，享受動手的過程。",
        challenges: "容易感到厭倦常規工作，可能不善於長期計劃。",
        image: "images/istp.jpg"
    },
    ISFP: {
        title: "ISFP（探險家型）",
        traits: "內向但感性，熱愛美和藝術，追求和諧和自由，重視個人感受和環境。",
        strengths: "富有藝術感和創造力，擅長靜心創作和欣賞生活中的美。",
        challenges: "對壓力不敏感，容易逃避現實的挑戰和責任。",
        image: "images/isfp.jpg"
    },
    INFP: {
        title: "INFP（調停者型）",
        traits: "理想主義，追求真理和個人價值觀，富有同理心，渴望讓世界變得更美好。",
        strengths: "創意豐富，對他人感受敏感，善於探索深層次的人生問題。",
        challenges: "容易過於理想化，忽視現實，容易感到失落或孤獨。",
        image: "images/infp.jpg"
    },
    INTP: {
        title: "INTP（邏輯學家型）",
        traits: "富有創造力和好奇心，喜歡探索理論和概念，擅長分析和解決問題。",
        strengths: "思維靈活，能夠提出創新想法，對知識有強烈的渴望。",
        challenges: "可能過於理論化，忽視實際應用，容易感到孤獨。",
        image: "images/intp.jpg"
    },
    ESTP: {
        title: "ESTP（推動者型）",
        traits: "外向、活躍，喜歡冒險和挑戰，擅長即時反應和解決問題。",
        strengths: "行動力強，能夠迅速適應變化，享受生活中的刺激。",
        challenges: "可能不善於長期計劃，容易忽視細節。",
        image: "images/estp.jpg"
    },
    ESFP: {
        title: "ESFP（表演者型）",
        traits: "外向活潑，喜歡成為注意的焦點，富有感染力，享受與人互動。",
        strengths: "擅長激發他人的熱情和快樂，享受當下，社交能力強。",
        challenges: "可能不注重長期計劃，容易過於注重享樂。",
        image: "images/esfp.jpg"
    },
    ENFP: {
        title: "ENFP（活動家型）",
        traits: "充滿熱情和創意，喜歡探索新的點子和人際關係，擁有開放的心態。",
        strengths: "具有極大的創造力，擅長激勵和啟發他人，樂觀且適應力強。",
        challenges: "容易分心，缺乏持續性，可能無法完成長期項目。",
        image: "images/enfp.jpg"
    },
    ENTP: {
        title: "ENTP（辯論家型）",
        traits: "喜歡辯論和挑戰現狀，擅長解決問題，創造性思維強。",
        strengths: "善於應對複雜局面，能夠迅速提出創新方案和新點子。",
        challenges: "可能過於好辯，容易忽視他人情感或缺乏耐心。",
        image: "images/entp.jpg"
    },
    ESTJ: {
        title: "ESTJ（執行者型）",
        traits: "務實、果斷，重視秩序和效率，擅長組織和管理，喜歡掌控局面。",
        strengths: "有出色的領導和組織能力，擅長規劃和執行目標。",
        challenges: "可能過於強勢，不喜歡他人違背規則，對變化不耐煩。",
        image: "images/estj.jpg"
    },
    ESFJ: {
        title: "ESFJ（供應者型）",
        traits: "注重他人感受，重視傳統和社會責任，擅長維護和諧。",
        strengths: "擁有強大的社交能力，能夠輕鬆建立並維持關係，喜歡幫助他人。",
        challenges: "容易依賴他人的認可，可能忽視自身需求。",
        image: "images/esfj.jpg"
    },
    ENFJ: {
        title: "ENFJ（主人型）",
        traits: "充滿魅力且富有同理心，擅長領導和激勵他人，注重人際關係。",
        strengths: "擁有強大的溝通和協調能力，能夠激發團隊潛力，樂於助人。",
        challenges: "過於關注他人，忽略自己的需求，容易過度投入。",
        image: "images/enfj.jpg"
    },
    ENTJ: {
        title: "ENTJ（指揮官型）",
        traits: "果斷、具戰略思維，擅長制定計劃和組織工作，重視效率和目標實現。",
        strengths: "有出色的領導才能，能夠組織大規模的計劃並實施，目標明確。",
        challenges: "可能過於強勢，忽視他人情感需求，對他人不耐煩。",
        image: "images/entj.jpg"
    }
};

function calculateResults() {
    const mbti = calculateMBTI(answers);
    const description = mbtiDescriptions[mbti];
    document.getElementById('results').innerHTML = `
        <h2>${description.title}</h2>
        <img src="${description.image}" alt="${description.title}">
        <p><strong>特徵：</strong>${description.traits}</p>
        <p><strong>優勢：</strong>${description.strengths}</p>
        <p><strong>挑戰：</strong>${description.challenges}</p>
    `;
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

// 鍵盤事件監聽器
document.addEventListener('keydown', function(event) {
    if (event.key === 'y' || event.key === 'Y') {
        // 假設第一個選項是“是的”
        const currentQuestion = questions[currentQuestionIndex];
        const yesOption = currentQuestion.options[0].value; // 取得“是的”選項的值
        document.querySelector(`input[name="q${currentQuestionIndex + 1}"][value="${yesOption}"]`).checked = true;
    } else if (event.key === 'n' || event.key === 'N') {
        // 假設第二個選項是“不是”
        const currentQuestion = questions[currentQuestionIndex];
        const noOption = currentQuestion.options[1].value; // 取得“不是”選項的值
        document.querySelector(`input[name="q${currentQuestionIndex + 1}"][value="${noOption}"]`).checked = true;
    } else if (event.key === ' ' || event.key === 'Space') {
        // 按下空格鍵進入下一條問題
        event.preventDefault(); // 防止頁面滾動
        nextQuestion();
    }
});

// 初始化問題
loadQuestion();