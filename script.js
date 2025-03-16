// Ініціалізація
let lang = "uk";
let quoteCount = sessionStorage.getItem("quoteCount") || 0;
document.getElementById("stats").textContent = `Згенеровано цитат: ${quoteCount}`;
loadFavorites();

// Початкова гучність
let audio = document.getElementById("clickSound");
audio.volume = 0.5; // 50% за замовчуванням

// База цитат (без змін, я залишу її скороченою для прикладу)
let quotes = {
    uk: {
        motivation: [
            { text: "Секрет успіху — діяти!", author: "Василь Сухомлинський" },
            { text: "Великі речі починаються з малого.", author: "Невідомий" },
            { text: "Ти можеш більше, ніж здається!", author: "Невідомий" },
            { text: "Не бійся помилок, бійся бездіяльності.", author: "Невідомий" },
            { text: "Кожен крок наближає тебе до мети.", author: "Невідомий" },
            { text: "Мрії стають реальністю, коли ти працюєш над ними.", author: "Невідомий" },
            { text: "Сьогодні — це твій шанс змінити завтра.", author: "Невідомий" },
            { text: "Успіх — це не відсутність перешкод, а вміння їх долати.", author: "Невідомий" },
            { text: "Той, хто вірить у себе, вже наполовину переміг.", author: "Невідомий" },
            { text: "Ніколи не пізно стати тим, ким ти хочеш бути.", author: "Джордж Еліот" }
        ],
        love: [
            { text: "Любов — це дія, а не слова.", author: "Лев Толстой" },
            { text: "Серце знає те, що розум не пояснить.", author: "Невідомий" },
            { text: "Любити — означає бачити диво там, де інші його не помічають.", author: "Невідомий" },
            { text: "Найбільше щастя — бути поруч із тим, кого любиш.", author: "Невідомий" },
            { text: "Любов не питає дозволу, вона просто приходить.", author: "Невідомий" },
            { text: "Дві душі, що знайшли одна одну, — це вічність у миті.", author: "Невідомий" },
            { text: "Справжня любов мовчить там, де слова зайві.", author: "Невідомий" },
            { text: "Кохання — це коли чужий біль стає твоїм.", author: "Невідомий" },
            { text: "Любов — це вогонь, що зігріває, але інколи й обпікає.", author: "Невідомий" },
            { text: "Той, хто любить, завжди знайде шлях.", author: "Невідомий" }
        ],
        humor: [
            { text: "Життя — це комедія для тих, хто думає.", author: "Марк Твен" },
            { text: "Краще сміятися, ніж плакати!", author: "Невідомий" },
            { text: "Якщо день почався погано, просто поспи ще раз.", author: "Невідомий" },
            { text: "Люди діляться на два типи: ті, хто запізнюється, і ті, хто нагадує про це.", author: "Невідомий" },
            { text: "Життя — це гра, але інструкцію загубили.", author: "Невідомий" },
            { text: "Найкращий спосіб забути проблему — знайти більшу.", author: "Невідомий" },
            { text: "Я не лінивий, я просто економлю енергію.", author: "Невідомий" },
            { text: "Сміх — це ліки, які не продаються в аптеці.", author: "Невідомий" },
            { text: "Якщо ти не знаєш, що сказати, посміхнись — це завжди працює.", author: "Невідомий" },
            { text: "Дзеркало бреше, але штани завжди скажуть правду.", author: "Невідомий" }
        ]
    },
    en: {
        motivation: [
            { text: "The secret to success is action!", author: "Vasyl Sukhomlynsky" },
            { text: "Great things start small.", author: "Unknown" },
            { text: "You can do more than you think!", author: "Unknown" },
            { text: "Don’t fear mistakes, fear inaction.", author: "Unknown" },
            { text: "Every step brings you closer to your goal.", author: "Unknown" },
            { text: "Dreams become reality when you work for them.", author: "Unknown" },
            { text: "Today is your chance to change tomorrow.", author: "Unknown" },
            { text: "Success is not the absence of obstacles, but the ability to overcome them.", author: "Unknown" },
            { text: "He who believes in himself is already halfway to victory.", author: "Unknown" },
            { text: "It’s never too late to become who you want to be.", author: "George Eliot" }
        ],
        love: [
            { text: "Love is action, not words.", author: "Leo Tolstoy" },
            { text: "The heart knows what the mind cannot explain.", author: "Unknown" },
            { text: "To love is to see a miracle where others don’t notice it.", author: "Unknown" },
            { text: "The greatest happiness is being near the one you love.", author: "Unknown" },
            { text: "Love doesn’t ask for permission; it just arrives.", author: "Unknown" },
            { text: "Two souls that found each other are eternity in a moment.", author: "Unknown" },
            { text: "True love is silent where words are unnecessary.", author: "Unknown" },
            { text: "Love is when someone else’s pain becomes yours.", author: "Unknown" },
            { text: "Love is a fire that warms but sometimes burns.", author: "Unknown" },
            { text: "He who loves will always find a way.", author: "Unknown" }
        ],
        humor: [
            { text: "Life is a comedy for those who think.", author: "Mark Twain" },
            { text: "Better to laugh than to cry!", author: "Unknown" },
            { text: "If the day starts badly, just go back to sleep.", author: "Unknown" },
            { text: "People are divided into two types: those who are late and those who remind them about it.", author: "Unknown" },
            { text: "Life is a game, but the instructions got lost.", author: "Unknown" },
            { text: "The best way to forget a problem is to find a bigger one.", author: "Unknown" },
            { text: "I’m not lazy, I’m just saving energy.", author: "Unknown" },
            { text: "Laughter is a medicine not sold in pharmacies.", author: "Unknown" },
            { text: "If you don’t know what to say, smile — it always works.", author: "Unknown" },
            { text: "The mirror lies, but pants always tell the truth.", author: "Unknown" }
        ]
    }
};

// Завантаження збережених цитат при старті
window.onload = function() {
    let savedQuotes = JSON.parse(localStorage.getItem("userQuotes"));
    if (savedQuotes) {
        quotes = savedQuotes;
    }
};

// Генерація цитати
function generateQuote() {
    let audio = document.getElementById("clickSound");
    audio.currentTime = 0; // Скидає на початок
    audio.play();

    let category = document.getElementById("category").value;
    let quoteElement = document.getElementById("quote");
    quoteElement.classList.remove("fade-in");

    setTimeout(() => {
        let randomIndex = Math.floor(Math.random() * quotes[lang][category].length);
        let quote = quotes[lang][category][randomIndex];
        quoteElement.textContent = `"${quote.text}" — ${quote.author}`;
        quoteElement.classList.add("fade-in");

        quoteCount++;
        sessionStorage.setItem("quoteCount", quoteCount);
        document.getElementById("stats").textContent = `Згенеровано цитат: ${quoteCount}`;
    }, 500);
}

// Регулювання гучності
function adjustVolume(value) {
    let audio = document.getElementById("clickSound");
    audio.volume = value / 100; // Переводимо відсотки в діапазон 0.0-1.0
    document.getElementById("volume-value").textContent = `${value}%`; // Оновлюємо відображення
}

// Зміна мови
function switchLang(newLang) {
    lang = newLang;
    generateQuote();
}

// Зміна теми
function setTheme(theme) {
    document.body.className = "";
    document.body.classList.add(theme);
}

// Збереження цитати в улюблені
function saveQuote() {
    let quote = document.getElementById("quote").textContent;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(quote)) {
        favorites.push(quote);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        updateFavoritesList();
    }
}

// Завантаження улюблених цитат
function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    updateFavoritesList(favorites);
}

function updateFavoritesList(favorites = JSON.parse(localStorage.getItem("favorites")) || []) {
    let list = document.getElementById("favorites-list");
    list.innerHTML = "";
    favorites.forEach(fav => {
        let li = document.createElement("li");
        li.textContent = fav;
        list.appendChild(li);
    });
}

// Поділитися цитатою
function shareQuote() {
    let quote = document.getElementById("quote").textContent;
    navigator.clipboard.writeText(quote);
    alert("Цитату скопійовано в буфер обміну!");
}

// Додавання нової цитати
function addUserQuote() {
    let text = document.getElementById("new-quote").value;
    let author = document.getElementById("new-author").value || "Користувач";
    if (text) {
        let categoryQuotes = quotes[lang][document.getElementById("category").value];
        if (!categoryQuotes.some(q => q.text === text)) {
            categoryQuotes.push({ text, author });
            localStorage.setItem("userQuotes", JSON.stringify(quotes));
            document.getElementById("new-quote").value = "";
            document.getElementById("new-author").value = "";
            alert("Цитату успішно додано!");
            generateQuote();
        } else {
            alert("Ця цитата вже існує!");
        }
    } else {
        alert("Введіть текст цитати!");
    }
}