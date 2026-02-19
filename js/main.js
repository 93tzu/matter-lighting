
// 等整個網頁 HTML 都載入完成後，再開始抓元素（避免抓不到）
document.addEventListener("DOMContentLoaded", function () {

    // 抓到所有 FAQ 的問題按鈕（class = faq-question）
    const questionButtons = document.querySelectorAll(".faq-question");

    // 逐一替每個按鈕加上「點擊事件」
    questionButtons.forEach(function (btn) {

        // 當使用者點這個按鈕時，會執行下面這段
        btn.addEventListener("click", function () {

            // btn 的上一層容器就是 .faq-item（我們要在它身上加/刪 open）
            const item = btn.closest(".faq-item");

            // 找到這一題對應的答案區塊 .faq-answer
            const answer = item.querySelector(".faq-answer");

            // 判斷：這題目前是不是已經開著？
            const isOpen = item.classList.contains("open");

            // ======（可選）一次只開一題：先把其他題都關掉 ======
            document.querySelectorAll(".faq-item.open").forEach(function (openItem) {

                // 如果是別題（不是自己），就關掉
                if (openItem !== item) {
                    openItem.classList.remove("open");                           // 移除 open 樣式
                    const openBtn = openItem.querySelector(".faq-question");      // 找到那題按鈕
                    const openAns = openItem.querySelector(".faq-answer");        // 找到那題答案
                    openBtn.setAttribute("aria-expanded", "false");               // 無障礙屬性：關
                    openAns.hidden = true;                                        // 隱藏答案
                }
            });
            // ======（可選）一次只開一題：結束 ======

            // 如果原本是開著 -> 這次就關掉
            if (isOpen) {
                item.classList.remove("open");              // 移除 open
                btn.setAttribute("aria-expanded", "false"); // aria-expanded 改 false
                answer.hidden = true;                       // 隱藏答案
            }
            // 如果原本是關著 -> 這次就打開
            else {
                item.classList.add("open");                 // 加上 open
                btn.setAttribute("aria-expanded", "true");  // aria-expanded 改 true
                answer.hidden = false;                      // 顯示答案
            }

        });

    });

});


// ===== FAQ Accordion (click to toggle) =====
console.log("main.js loaded!");
document.querySelectorAll(".faq-question").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const item = btn.closest(".faq-item");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        const isHidden = answer.hasAttribute("hidden");

        // 切換 hidden
        if (isHidden) {
            answer.removeAttribute("hidden");
            icon.textContent = "▴";
        } else {
            answer.setAttribute("hidden", "");
            icon.textContent = "▾";
        }
    });
});

// ===== FAQ Search Filter =====
const searchInput = document.getElementById("faqSearch");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const keyword = searchInput.value.toLowerCase().trim();

        document.querySelectorAll(".faq-item").forEach(function (item) {
            const text = item.innerText.toLowerCase();

            if (text.includes(keyword)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
}
