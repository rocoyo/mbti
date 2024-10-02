const questions = [
    { question: "1. 你喜歡和新的人見面嗎？", options: ["是", "不是"] },
    { question: "2. 經常想抽象的想法或概念嗎？", options: ["是", "不是"] },
    { question: "3. 做出判斷的時候，你認為邏輯和分析很重要嗎？", options: ["是", "不是"] },
    { question: "4. 制定計劃後希望按原樣進行嗎？", options: ["是", "不是"] },
    { question: "5. 跟人們相處很累嗎？", options: ["是", "不是"] },
    { question: "6. 喜歡現實和具體的資訊嗎？", options: ["是", "不是"] },
    { question: "7. 你喜歡以感情為基礎的決定嗎？", options: ["是", "不是"] },
    { question: "8. 您更重視靈活性和即興發揮嗎？", options: ["是", "不是"] },
    { question: "9. 你喜歡和各種各樣的人在一起嗎？", options: ["是", "不是"] },
    { question: "10. 你喜歡想象未來的可能性嗎？", options: ["是", "不是"] },
    { question: "11. 解決問題時會選擇理性的方法嗎？", options: ["是", "不是"] },
    { question: "12. 準確管理並遵守日程嗎？", options: ["是", "不是"] },
    { question: "13. 在聚會或派對上和周圍的人積極對話嗎？", options: ["是", "不是"] },
    { question: "14. 你更喜歡透過觀察和經驗來理解世界嗎？", options: ["是", "不是"] },
    { question: "15. 在任何情況下都會努力做出客觀的判斷嗎？", options: ["是", "不是"] },
    { question: "16. 你是為了實現目標而系統地制定計劃嗎？", options: ["是", "不是"] },
    { question: "17. 一個人的時間沒有負擔，舒服嗎？", options: ["是", "不是"] },
    { question: "18. 你喜歡用形象、比喻或比喻來思考或對話嗎？", options: ["是", "不是"] },
    { question: "19. 你主要考慮價值、感情和關係來做決定嗎？", options: ["是", "不是"] },
    { question: "20. 容易適應新情況,尋找靈活的解決方案嗎？", options: ["是", "不是"] },
];

let currentQuestionIndex = 0;
const results = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
};

const images = {
    ISTJ: "images/ISTJ.jpg",
    ISFJ: "images/ISFJ.jpg",
    INFJ: "images/INFJ.jpg",
    INTJ: "images/INTJ.jpg",
    ISTP: "images/ISTP.jpg",
    ISFP: "images/ISFP.jpg",
    INFP: "images/INFP.jpg",
    INTP: "images/INTP.jpg",
    ESTP: "images/ESTP.jpg",
    ESFP: "images/ESFP.jpg",
    ENFP: "images/ENFP.jpg",
    ENTP: "images/ENTP.jpg",
    ESTJ: "images/ESTJ.jpg",
    ESFJ: "images/ESFJ.jpg",
    ENFJ: "images/ENFJ.jpg",
    ENTJ: "images/ENTJ.jpg",
};

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ''; // 清空容器

    const question = questions[currentQuestionIndex];
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-box'; // 添加圓角框架的類
    questionDiv.innerHTML = `<h2>${question.question}</h2>`;

    question.options.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="q${currentQuestionIndex + 1}" value="${option}"> ${option}`;
        questionDiv.appendChild(label);
    });

    questionContainer.appendChild(questionDiv);

    // 控制「上一題」按鈕的顯示
    const prevButton = document.getElementById('prev-button');
    if (currentQuestionIndex === 0) {
        prevButton.style.display = 'none'; // 隱藏「上一題」按鈕
    } else {
        prevButton.style.display = 'inline'; // 顯示「上一題」按鈕
    }

    // 控制「下一題」按鈕的文本
    const nextButton = document.getElementById('next-button');
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerText = '分析MBTI'; // 最後一題顯示「分析MBTI」
    } else {
        nextButton.innerText = '下一題'; // 其他題目顯示「下一題」
    }
}

function nextQuestion() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestionIndex + 1}"]:checked`);
    if (selectedOption) {
        // 根據選擇的答案更新結果
        if (selectedOption.value === "是") {
            results.E++; // 假設「是」對應E或S
        } else {
            results.I++; // 假設「不是」對應I或N
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            calculateResults();
        }
    } else {
        alert('請選擇一個選項！');
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function calculateResults() {
    const mbtiType = `${results.E > results.I ? 'E' : 'I'}${results.S > results.N ? 'S' : 'N'}${results.T > results.F ? 'T' : 'F'}${results.J > results.P ? 'J' : 'P'}`;
    
    // MBTI類型補充說明
    const descriptions = {
        ISTJ: "檢察官型：注重責任、傳統和秩序，擅長規劃和遵守規則。對細節和效率有高度要求。",
        ISFJ: "守護者型：非常關懷他人，樂於提供支持，忠誠可靠。喜歡保護弱勢群體，重視人際關係。",
        INFJ: "提倡者型：內心理想主義，富有洞察力和直覺，關心社會問題，渴望改變世界。",
        INTJ: "建築師型：冷靜、理性，富有遠見，擅長長期規劃和戰略思考，對自己的能力充滿自信。",
        ISTP: "工匠型：實際、靈活，喜歡動手操作，重視效率和即時反饋，善於應對突發問題。",
        ISFP: "探險家型：內向但感性，熱愛美和藝術，追求和諧和自由，重視個人感受和環境。",
        INFP: "調停者型：理想主義，追求真理和個人價值觀，富有同理心，渴望讓世界變得更美好。",
        INTP: "思考者型：喜歡分析理論和抽象概念，思維邏輯性強，對知識充滿熱情。",
        ESTP: "企業家型：充滿活力，熱衷於冒險和挑戰，行動導向，能迅速做出決策。",
        ESFP: "表演者型：外向活潑，喜歡成為注意的焦點，富有感染力，享受與人互動。",
        ENFP: "活動家型：充滿熱情和創意，喜歡探索新的點子和人際關係，擁有開放的心態。",
        ENTP: "辯論家型：喜歡辯論和挑戰現狀，擅長解決問題，創造性思維強。",
        ESTJ: "執行者型：務實、果斷，重視秩序和效率，擅長組織和管理，喜歡掌控局面。",
        ESFJ: "供應者型：注重他人感受，重視傳統和社會責任，擅長維護和諧。",
        ENFJ: "主人型：充滿魅力且富有同理心，擅長領導和激勵他人，注重人際關係。",
        ENTJ: "指揮官型：果斷、具戰略思維，擅長制定計劃和組織工作，重視效率和目標實現。",
    };

    // 顯示結果和補充說明
    const description = descriptions[mbtiType] || "未知類型";
    const imageUrl = images[mbtiType] || ""; // 獲取圖片URL

    document.getElementById('results').innerHTML = `
        <h2>你的MBTI類型是: ${mbtiType}</h2>
        <p>${description}</p>
        <img src="${imageUrl}" alt="${mbtiType} image" style="max-width: 100%; height: auto; border-radius: 10px;">
    `;
    document.getElementById('myModal').style.display = 'block';
}

// 關閉模態
document.querySelector('.close').onclick = function() {
    document.getElementById('myModal').style.display = 'none';
}

// 初始化顯示第一個問題
showQuestion();