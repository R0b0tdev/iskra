// Main JavaScript for iSKRA Tour

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const floatingMenuBtn = document.getElementById('floatingMenuBtn');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const afterAbout = document.getElementById('afterAbout');

function toggleMobileMenu() {
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (floatingMenuBtn) {
    floatingMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenu && mobileMenu.contains(e.target);
    const isClickOnMenuBtn = (mobileMenuBtn && mobileMenuBtn.contains(e.target)) || (floatingMenuBtn && floatingMenuBtn.contains(e.target));
    
    if (!isClickInsideMenu && !isClickOnMenuBtn && mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
});

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (scrollTopBtn && afterAbout) {
    const aboutObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    scrollTopBtn.classList.remove('hidden');
                    scrollTopBtn.classList.add('flex');
                    observer.disconnect();
                }
            });
        },
        { threshold: 0.1 }
    );
    aboutObserver.observe(afterAbout);
}

// Smooth scroll for navigation links (except those marked with data-no-smooth)
document.querySelectorAll('a[href^="#"]:not([data-no-smooth])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

// Country Data
const countryData = {
    turkey: {
        image: 'images/jpg/turkey.jpg',
        name: 'Турция',
        flag: '🇹🇷',
        description: 'Идеальное сочетание тёплого моря, восточного гостеприимства и высокого уровня сервиса. Страна, куда хочется возвращаться снова и снова.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Анталия</strong> — активный отдых, шопинг, ночная жизнь</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Кемер</strong> — окружён сосновыми горами, подходит для спокойного отдыха</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Сиде</strong> — античные руины и атмосферные прогулки по старому городу</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Аланья</strong> — молодёжный курорт с активной ночной жизнью</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Белек</strong> — роскошные отели, гольф и высокий уровень сервиса</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Мармарис</strong> — яхты, бухты и морские прогулки</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Фетхие и Олудениз</strong> — живописные пляжи и лазурная лагуна</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Бодрум</strong> — клубная столица, стиль и средиземноморская атмосфера</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Май–октябрь</strong> — купальный сезон. Воздух +28…+34°C, море +25…+28°C</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Весна (апрель–май)</strong> — комфортная погода, цветущие пейзажи</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Лето (июнь–август)</strong> — жарко, идеально для моря и отдыха в отелях с аквапарками</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Осень (сентябрь–октябрь)</strong> — мягкое солнце, меньше туристов, хорошие цены</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Зима (ноябрь–март)</strong> — сезон зимней концепции: многие 5★-отели продолжают работу, предлагают подогреваемые бассейны, SPA-программы, хаммамы, аутентичную кухню и атмосферу спокойного отдыха без жары и толп</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Официальная валюта — турецкая лира (TRY), но в ходу и евро и доллары</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Обмен денег — лучше в официальных обменниках (Döviz) или банках</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>💳 Банковские карты российских банков — Visa и Mastercard не работают из-за санкций</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Карты «Мир» — принимаются не везде, периодически только в Ziraat Bank, VakifBank и İş Bankası</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кебаб, мезе, пахлава, долма, гёзлеме</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Турецкий кофе в джезве и чай в традиционных стаканах</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Айран, гранатовый сок, мороженое дондурма</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Турецкий чай, кофе, лукум, пахлаву</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Пряности, специи, оливковое масло</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Текстиль — полотенца, покрывала, халаты</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Косметику на основе розы и оливкового масла</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Восточные лампы, кальяны, керамику</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Для граждан РФ виза не требуется на срок до 60 дней</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>На границе ничего заполнять не нужно, достаточно загранпаспорта</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Детям, путешествующим без одного из родителей, требуется нотариальная доверенность</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Стамбул</strong> — Айя-София, Голубая мечеть, Босфор, Гранд-базар</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Каппадокия</strong> — полёты на шарах, подземные города</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Памуккале</strong> — термальные источники и белые травертины</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Эфес</strong> — античные руины и библиотека Цельса</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Анталия</strong> — старый город Калеичи, водопады Дюден</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Олудениз</strong> — Лагуна и смотровая гора Бабадаг</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Турция славится All Inclusive — отличный баланс цены и сервиса</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Весна и осень — комфортный отдых без жары и очередей</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Зимой выбирайте отели с зимней концепцией — они предлагают подогреваемые бассейны, wellness-услуги и уютную атмосферу</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Воду пейте только бутилированную</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Торг на рынках — часть культуры, не стесняйтесь улыбаться и договариваться 😊</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фотографировать военных и стратегические объектов</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Распивать алкоголь на улице (штраф)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Неприлично вести себя у мечетей и в транспорте</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вывозить антиквариат или камни с археологических зон</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Игнорировать солнцезащитные средства — обгорают даже в апреле!</div>'
    },
    egypt: {
        image: 'images/jpg/egypt.jpg',
        name: 'Египет',
        flag: '🇪🇬',
        description: 'Страна фараонов, солнца и Красного моря — место, где история встречается с идеальным дайвингом и восточным колоритом. Египет — выбор тех, кто ценит яркие эмоции, атмосферу и круглогодичное лето.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Хургада</strong> — удобный вход в море, песчаные пляжи, семейный отдых</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Шарм-эль-Шейх</strong> — лучшие кораллы, дайвинг и фешенебельные отели</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Марса-Алам</strong> — уединение, первозданные рифы и черепахи</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Сафага</strong> — спокойный курорт, популярный среди дайверов</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Эль-Гуна</strong> — "египетская Венеция" с каналами и яхтами</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Каир и Гиза</strong> — экскурсионные туры, пирамиды, Сфинкс и музеи</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Зима (ноябрь–март)</strong> — идеальное время: +23…+28°C днём, море +22…+24°C</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Весна (апрель–май)</strong> — жаркое солнце, комфорт для купания</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Лето (июнь–август)</strong> — жара до +40°C, но сухой климат переносится легко</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Осень (сентябрь–октябрь)</strong> — бархатный сезон, тёплое море и мягкое солнце</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Даже зимой работают отели с подогреваемыми бассейнами, а море остаётся комфортным для купания и снорклинга</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Официальная валюта — египетский фунт (EGP), в ходу и доллары / евро</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Выгоднее брать доллары, их проще обменять и принимают чаще</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>При обмене следите за состоянием купюр: принимают только новые, чистые, без повреждений (выпуск после 2013 г.)</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Менять деньги лучше в официальных обменниках или банках, не у частных лиц</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Египетский кофе (сада), фалафель, хумус, кебаб, кюфта</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Молибия (рисовый десерт), каркаде, фреш из манго и гуавы</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Морепродукты и восточные сладости — свежие и недорогие</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Папирус, ароматические масла и духи ручной работы</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Пряности, чай, кофе, халву, финики и рахат-лукум</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Египетский хлопок: полотенца, постельное бельё</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Каменные фигурки, украшения, изделия из меди и латуни</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Магниты и статуэтки с символикой Древнего Египта</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Для граждан РФ действуют разные правила в зависимости от курорта:</strong></div><div class="mb-2"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Шарм-эль-Шейх (Синай):</strong> Без визы до 15 дней. При въезде ставят штамп "Sinai Only", действующий только в пределах Синайского полуострова</div><div class="mb-2"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Если хотите поехать в Каир или Луксор — оформляется виза за 25 USD в аэропорту</div><div class="mb-2"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Хургада, Марса-Алам и другие курорты:</strong> Требуется виза по прибытии — 25 USD, оплачивается наличными в аэропорту. Срок действия — 30 дней</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Паспорт должен быть действителен минимум 6 месяцев</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Пирамиды Гизы и Сфинкс</strong> — символ Египта</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Долина Царей и Луксор</strong> — храмы и гробницы фараонов</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Каирский музей</strong> — мумии, саркофаги и золото Тутанхамона</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Пирамиды Саккары, Храм Хатшепсут, Абу-Симбел</strong></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Круизы по Нилу</strong> — один из самых атмосферных способов увидеть древний Египет</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Подводный мир Красного моря</strong> — обязательный пункт: рифы, дайвинг, катание на яхтах</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Отели All Inclusive — визитная карточка Египта, особенно в Хургаде и Шарме</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В зимний период выбирайте отели с подогреваемыми бассейнами</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вода из-под крана непригодна для питья — только бутилированная!</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>На рынках торгуйтесь — это часть восточной культуры 😉</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Уважайте местные традиции: в общественных местах не надевайте слишком открытую одежду</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Электричество 220В, розетки стандартные европейские</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фотографировать военных и полицейских</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Распивать алкоголь вне территории отеля (штраф!)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Критиковать местные традиции и религию</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вывозить кораллы, песок и морские раковины — за это штраф и конфискация</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Ходить босиком по кораллам — можно получить ожог и нанести вред рифу</div>'
    },
    thailand: {
        image: 'images/jpg/thailand.jpg',
        name: 'Таиланд',
        flag: '🇹🇭',
        description: 'Королевство улыбок, тропических островов и уличной еды. Здесь сочетаются райские пляжи, яркие города и абсолютное ощущение отпуска 🌴',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Пхукет</strong> — самый известный остров, пляжи, храмы, массаж и ночная жизнь</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Паттайя</strong> — круглогодичный курорт недалеко от Бангкока, активный отдых и экскурсии</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Самуи</strong> — спокойствие, кокосовые пальмы, семейная атмосфера</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Краби</strong> — живописные скалы и лучшие виды Таиланда</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Бангкок</strong> — шопинг, храмы, ночные рынки и азиатский драйв</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Чиангмай</strong> — горы, слоны и культура Севера</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Ноябрь–март</strong> — идеальное время: сухой сезон, солнце, море +27…+29°C</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Апрель–май</strong> — жарко, до +35°C</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Июнь–октябрь</strong> — сезон дождей, но осадки кратковременные и цены ниже</div><div class="mb-2"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>На островах климат разнится:</strong></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Пхукет и Краби</strong> — лучше с ноября по апрель</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Самуи</strong> — комфортно с мая по сентябрь</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Официальная валюта — бат (THB)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>К обмену принимают доллары и евро, но выгоднее доллары нового образца (после 2013 г.)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Обменивать лучше в обменниках SuperRich, банки Kasikorn, Bangkok Bank — курс там лучший</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Старые или повреждённые купюры не принимают</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Пад Тай, Том Ям, Манго-стики райс, Карри Пананг</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кокосовое мороженое, фреши, тропические фрукты (манго, рамбутан, мангостин)</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кофе с кокосовым молоком и уличную еду</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Тайский чай и кофе</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кокосовое масло, натуральную косметику, мыло</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Латексные подушки и матрасы (популярный сувенир)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Сушёные фрукты, специи, пасту Том Ям</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Слонов из дерева, изделия ручной работы</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Гражданам России виза не требуется при поездке в Таиланд с туристической целью на срок до 60 дней</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Загранпаспорт должен быть действителен минимум 6 месяцев с даты въезда</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>С 1 мая 2025 года все иностранные туристы обязаны заполнить Thailand Digital Arrival Card (TDAC)</strong> — электронную карту прибытия, которая заменила бумажную форму TM6</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Заполняется онлайн на официальном сайте ➡️ <a href="https://tdac.immigration.go.th" target="_blank" class="text-pink-500 hover:text-pink-600 underline">https://tdac.immigration.go.th</a></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Можно подать заявку не ранее чем за 72 часа и не позднее чем за 1 час до вылета</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>После заполнения система выдаёт QR-код, который нужно предъявить при регистрации на рейс и по прилёту</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Бангкок:</strong> Храм Изумрудного Будды, дворец, смотровые площадки</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Пхукет:</strong> Большой Будда, смотровая Karon Viewpoint, острова Пхи-Пхи</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Краби:</strong> храм Тигра, пляж Рейли, прогулки на лодке</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Самуи:</strong> Ват Плай Лаем, храм Большого Будды, водопады</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Чиангмай:</strong> древние храмы, фестиваль фонарей Лой Кратонг</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В Таиланде левостороннее движение — будьте внимательны при аренде байка</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>При входе в храм — снимайте обувь, плечи и колени должны быть прикрыты</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Нельзя прикасаться к голове тайцев и изображению Будды</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Курение в неположенных местах и электронные сигареты запрещены (штраф до 1000$)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вода из-под крана непригодна для питья</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Улыбка — лучший способ общения, тайцы ценят вежливость и спокойствие 😊</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вывозить изображения Будды без разрешения</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Оскорблять королевскую семью (строгое наказание)</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Игнорировать правила дорожного движения — штрафуют даже туристов</div>'
    },
    uae: {
        image: 'images/jpg/uae.jpg',
        name: 'ОАЭ',
        flag: '🇦🇪',
        description: 'Страна роскоши, солнца и безупречного сервиса. ОАЭ объединяют восточные традиции и современные технологии — здесь небоскрёбы соседствуют с пустыней, а отдых возможен круглый год.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Дубай</strong> — главный туристический центр, небоскрёбы, шопинг, пляжи и развлечения</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Абу-Даби</strong> — столица Эмиратов, культурные достопримечательности и высокий уровень сервиса</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Шарджа</strong> — спокойный семейный отдых без алкоголя</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Рас-эль-Хайма</strong> — живописные горы и уединённые пляжи</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Фуджейра</strong> — Индийский океан, дайвинг и мягкий климат</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Ноябрь–март</strong> — идеальное время для отдыха: воздух +25…+30°C, море +23…+26°C</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Апрель–май</strong> — уже жарко, но ещё комфортно</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Июнь–сентябрь</strong> — жара до +45°C, отдых преимущественно в отелях</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Октябрь–ноябрь</strong> — "бархатный сезон" с приятной температурой и умеренными ценами</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Зимой выбирайте отели с подогреваемыми бассейнами, летом — с кондиционированными переходами и крытыми зонами отдыха</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Валюта — дирхам (AED)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Обмен выгоднее в официальных обменниках (Exchange)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Лучше брать доллары нового образца (после 2013 года) — евро менее удобны</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>💳 Банковские карты российских банков — Visa и Mastercard не работают из-за санкций</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Арабский кофе с кардамоном и финики</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Хумус, фалафель, шаурма, кебаб</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Морепродукты и блюда международной кухни</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Десерты: баклава, халва, восточные сладости</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Финики, кофе, специи и сладости</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Масла и духи (особенно уд и мускус)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Ювелирные украшения, золото, текстиль</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Восточные лампы, кальяны, сувениры ручной работы</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Для граждан России виза не требуется</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В аэропорту ставится штамп на 90 дней пребывания в течение 180 дней</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Паспорт должен быть действителен минимум 6 месяцев с даты въезда</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Дубай:</strong> Бурдж-Халифа, Пальма Джумейра, фонтаны, аквапарк Atlantis</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Абу-Даби:</strong> Мечеть шейха Заида, Лувр, остров Яс с Ferrari World</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Шарджа:</strong> рынок Сук аль-Арса, набережная Аль-Маджаз</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Рас-эль-Хайма:</strong> пустынное сафари, смотровая площадка Jebel Jais</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Фуджейра:</strong> дайвинг и пляжи Индийского океана</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В общественных местах одежда должна быть скромной — закрытые плечи и колени</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Купальники допустимы только на пляже или у бассейна</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Алкоголь разрешён только в барах и ресторанах при отелях</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вода из-под крана непригодна для питья — используйте бутилированную</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фотографируйте людей и объекты только с разрешения</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Торговаться можно, но вежливо — это часть культуры 😉</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Распивать алкоголь и курить в общественных местах</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Публично выражать чувства (поцелуи, объятия) — это может повлечь штраф</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Критиковать религию, правительство или семью шейхов — строго запрещено</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фотографировать военных, полицейских и госздания</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Использовать ненормативную лексику или жесты — считается оскорблением</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Нарушать правила дорожного движения — штрафы высокие, камеры повсюду</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вывозить золото и ценные украшения без чеков</div>'
    },
    vietnam: {
        image: 'images/jpg/vietnam.jpg',
        name: 'Вьетнам',
        flag: '🇻🇳',
        description: 'Экзотика Юго-Восточной Азии: тропические острова, джунгли, бурная история и сочная культура. Вьетнам — отличное сочетание пляжного отдыха, природы, активных путешествий и доступных цен.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Нячанг</strong> — пляжи, морские прогулки, комфортабельные отели</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Фукуок</strong> — остров в Сиамском заливе, ласковое море, кораллы</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Ханой</strong> — столица, старинные улочки, культура и гастрономия</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Северный/центральный Вьетнам:</strong> с ноября по апрель — сухой сезон, комфортно для города и природы</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Острова и юг:</strong> декабрь-март — лучшее время для пляжа и моря на Фукуоке</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Сезон дождей</strong> в разных регионах: примерно с мая по октябрь — бывают кратковременные ливни, но цены ниже и туристов меньше</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>На пляжах можно отдыхать круглый год, но выбирайте регион по сезону</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Официальная валюта — вьетнамский донг (VND)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Лучше брать с собой доллары США нового образца — их легко поменять</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>💳 Банковские карты российских банков — Visa и Mastercard не работают из-за санкций</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фо (Pho) — вьетнамский суп с лапшой</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Бан мий (Banh mi) — вьетнамский багет с начинкой</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Свежие фрукты: манго, драконий фрукт, рамбутан</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Уличная еда на рынках — безопасна и вкусна, но выбирайте места с хорошей гигиеной</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вьетнамский кофе и чай</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Шёлк и изделия ручной работы</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Традиционные вьетнамки и специи</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Гражданам РФ не требуется виза для пребывания до 45 дней</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Загранпаспорт должен быть действителен минимум 6 месяцев с даты въезда</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Залив Халонг</strong> — живописные скалы, прогулки на лодке</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Старая улица Хойана</strong> — архитектура, вечерние фонари, атмосфера</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Храмы Ханоя</strong> — культурное погружение</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Пляжи Фукуока и Нячанга</strong> — отдых и море</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Центральные горы и Далат</strong> — природа, кофейные плантации</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Транспорт: в городах пользуйтесь зарегистрированным такси или приложениями</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Уважайте местные традиции: в храмах прикрывайте плечи и по возможности колени</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В сезон дождей возьмите зонт или дождевик</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Торговаться на рынках можно — но с уважением и улыбкой</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Не фотографируйте государственные здания и военные объекты без разрешения</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Не рискуйте ездить на байке без шлема и документов — штрафы возможны</div>'
    },
    maldives: {
        image: 'images/jpg/maldives.jpg',
        name: 'Мальдивы',
        flag: '🇲🇻',
        description: 'Острова мечты в Индийском океане — белоснежный песок, прозрачная вода, уединение и премиальный сервис. Мальдивы — идеальное место для романтического отдыха, дайвинга и полного перезагрузки.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Мале (North & South Male Atoll)</strong> — ближе всего к аэропорту, развитая инфраструктура, отели на любой вкус</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Ари Атолл</strong> — лучшие места для дайвинга и подводных экскурсий</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Баа Атолл</strong> — биосферный заповедник ЮНЕСКО, черепахи и мантовые бухты</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Раа и Лавияни</strong> — уединённые острова с отелями высокого класса</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Аду (Addu Atoll)</strong> — самый южный, с насыщенной историей и дикой природой</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Высокий сезон:</strong> декабрь – апрель — сухо, солнечно, море спокойное</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Низкий сезон:</strong> май – ноябрь — возможны кратковременные дожди, но тёплая вода и меньше туристов</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Температура воздуха круглый год +28…+32°C, воды — +27…+29°C</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Лучшее время для путешествия — зима и ранняя весна</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Валюта — мальдивская руфия (MVR), но в отелях и аэропортах повсеместно принимают доллары США</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Берите доллары нового образца (выпуск после 2013 года) — старые купюры могут не принять</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Обменивать деньги стоит только в банках или официальных обменниках</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>На островах-резортах всё оплачивается в долларах, а мелкие расходы можно совершать картой</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>💳 Банковские карты российских банков — Visa и Mastercard не работают из-за санкций</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Рыбные блюда: тунец, гриль, суп гарудия</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кокосовые десерты, тропические фрукты, свежевыжатые соки</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Национальные завтраки "мас хуни" (тунец с кокосом и лепёшками)</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В отелях — кухня всех стран мира, включая вегетарианские и halal-варианты</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кокосовое масло, специи и чай</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Изделия из ракушек и кораллов (только если разрешены к вывозу)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Ароматические масла, мыло ручной работы, украшения из перламутра</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Магниты и сувениры с изображением океана и атоллов</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Для граждан РФ виза не требуется при поездке до 90 дней</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>При въезде бесплатно ставится штамп в паспорт</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Паспорт должен быть действителен не менее 6 месяцев с даты въезда</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Снорклинг и дайвинг среди кораллов и мант</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Прогулки на яхтах и катамаранах, рыбалка на закате</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>SPA-салоны на воде, йога, романтические ужины на пляже</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Столица Мале: мечеть Хукуру-Миский, рыбный рынок, набережная</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Полёт на гидросамолёте между атоллами — отдельное впечатление</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>На Мальдивах действует "островная концепция" — каждый отель расположен на отдельном острове</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Алкоголь разрешён только на курортных островах (в столице и местных деревнях — запрещён)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вода из-под крана не пригодна для питья — используйте бутилированную</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Для купания в населённых районах женщины должны соблюдать дресс-код (пляжная одежда допустима только на "bikini-beach")</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Электрические розетки британского типа — возьмите адаптер</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Не трогайте морских животных и кораллы — штрафы за повреждение экосистемы высокие</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вывозить кораллы, песок и раковины — это запрещено законом</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Употреблять алкоголь вне территории отеля</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фотографировать местных жителей без разрешения</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Оскорблять религию или демонстрировать неуважение к обычаям</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Купаться топлес или в откровенной одежде на общественных пляжах</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Игнорировать инструкции гидов при снорклинге и дайвинге — это может быть опасно</div>'
    },
    bali: {
        image: 'images/jpg/bali.jpg',
        name: 'Бали',
        flag: '🇮🇩',
        description: 'Остров богов, вулканов и бесконечных рисовых террас 🌿 Бали — место силы, где сочетаются духовность, природа и современный комфорт. Здесь каждый найдёт свой формат отдыха — от серфинга и йоги до роскошных вилл у океана.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Нуса-Дуа</strong> — элитные отели, идеальные пляжи и спокойный отдых</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Семиньяк</strong> — стильные бутики, рестораны, клубы и sunset-бары</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Кута</strong> — молодёжная атмосфера и серфинг</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Убуд</strong> — сердце острова, рисовые террасы, йога и культура</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Чангу</strong> — серферы, кафе, виллы, коворкинги</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Санур</strong> — семейный отдых и прогулочные пляжи</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Нуса-Пенида и Гили</strong> — острова с дикой природой и лазурным морем</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Сухой сезон:</strong> май – октябрь. Комфортно, солнечно, идеальное море</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Сезон дождей:</strong> ноябрь – апрель. Осадки чаще вечером, природа особенно яркая</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Средняя температура воздуха +28…+32°C, воды — +27°C</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Лучшее время для поездки — июнь–сентябрь, а для дайвинга — март–ноябрь</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Валюта — индонезийская рупия (IDR)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Выгоднее брать доллары нового образца (после 2013 года) и обменивать в лицензированных обменниках</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>На рынке курс чуть хуже, избегайте "уличных обменников" — возможен обман</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>💳 Банковские карты российских банков не работают из-за санкций</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Наси Горенг — жареный рис с яйцом и курицей</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Ми Горенг — лапша с овощами и соусом</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Сате — шашлычки из курицы или рыбы</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Свежие морепродукты на пляже Джимбаран — визитная карточка острова</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Косметику: масла, мыло, скрабы, аромапалочки</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кофе "Kopi Luwak" и специи</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Серебро, изделия ручной работы</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Гражданам РФ при въезде в Индонезию требуется виза по прибытии</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Стоимость — 500 000 IDR (~35 USD), срок действия — до 30 дней</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Продление возможно ещё на 30 дней через иммиграционную службу</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Паспорт должен быть действителен не менее 6 месяцев</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Храм Улувату на скале и закаты с видом на океан</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вулкан Батур — восходы и термальные источники</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Убуд: лес обезьян, террасы Тегалаланг, водопад Тегенунган</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Храм Тана-Лот — один из самых красивых в мире</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Нуса-Пенида: пляжи Kelingking и Broken Beach</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Водопады Секумпул и Баньюмаля на севере острова</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Бали — остров уважения и кармы: ведите себя спокойно и уважительно</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В храмах обязательно прикрывайте плечи и ноги (дают саронг)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Алкоголь продаётся не везде, лучше покупать в duty free</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Движение левостороннее, осторожнее на байке</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Воду пейте только бутилированную</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Уважайте местные традиции и религиозные церемонии — они часть жизни острова</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Заранее скачайте карты и офлайн-приложения: интернет может пропадать в горах</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Заезжать на байке в храмовые или закрытые зоны</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Фотографировать церемонии без разрешения</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Трогать или кормить диких животных</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Игнорировать правила аренды байков (штрафы и конфискация возможны)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Вывозить песок, камни или кораллы</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Оскорблять религию, делать провокационные фото у храмов</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Участвовать в спорах с местными — лучше сохранять спокойствие</div>'
    },
    sochi: {
        image: 'images/jpg/sochi.jpg',
        name: 'Сочи',
        flag: '🇷🇺',
        description: 'Главный курорт России — море, горы и субтропический климат в одном месте. Здесь можно отдыхать круглый год: купаться летом, кататься на лыжах зимой и наслаждаться природой Кавказа в любое время года.',
        regions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Центральный Сочи</strong> — набережная, парки, пляжи, рестораны и шопинг</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Адлер</strong> — семейный отдых, близость аэропорта, Олимпийский парк</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Красная Поляна</strong> — горнолыжный курорт, СПА, казино, панорамные виды</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Хоста и Мацеста</strong> — санаторное лечение, тишина и зелень</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Лазаревское</strong> — уютный район с длинными пляжами и умеренными ценами</div>',
        climate: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Май–сентябрь</strong> — купальный сезон, море +24…+27°C</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Октябрь–ноябрь</strong> — бархатный сезон: мягкое солнце и спокойный отдых</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Декабрь–март</strong> — горнолыжный сезон в Красной Поляне</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span><strong>Апрель–май</strong> — цветущие склоны и комфортные прогулки по набережным</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Сочи идеально подходит для отпуска в любое время года</div>',
        currency: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Валюта — российский рубль (RUB)</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>💳 Все банковские карты работают без ограничений</div>',
        food: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кавказская кухня: шашлык, хачапури, сациви, долма</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Черноморская рыба — барабулька, дорадо, ставрида</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Домашнее вино, чача и гранатовый сок</div>',
        gifts: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Адыгейский сыр, мёд и варенье из фейхоа</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Кавказские специи, чай и лавровый лист из Сочинских плантаций</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Сувениры с символикой Олимпиады и местной природы</div>',
        visa: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Гражданам РФ виза не требуется</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Внутренний паспорт РФ — достаточный документ для поездки</div>',
        attractions: '<div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Олимпийский парк и Сочи-Парк — развлечения для всей семьи</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Красная Поляна: канатные дороги, пикники в горах, термальные источники</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Дендрарий и парк Ривьера — символы Сочи</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>33 водопада, Ахштырская пещера, Агурские водопады</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Скайпарк — подвесной мост и экстремальные аттракционы</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Прогулки вдоль Черноморской набережной — обязательный ритуал отдыха 😉</div>',
        highlight: '<div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💡 Советы туристу</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Для поездок в горы лучше надевать кроссовки и брать воду</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Купальный сезон начинается в мае, но вода прогревается к июню</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Покупать экскурсии выгоднее у официальных операторов, а не "у пляжа"</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В горах температура может резко меняться — держи с собой ветровку</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>В сезон бронируй отель заранее — особенно в июле и августе</div><div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🚫 Что нельзя делать</span></div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Курить и пить алкоголь на пляжах и в общественных местах (штраф)</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Оставлять мусор в горах и у водопадов — за этим строго следят</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Разводить костры вне специально отведённых зон</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Купаться в море во время шторма — сильные подводные течения</div><div class="mb-1.5"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Сорить на набережной и в парках — видеокамеры фиксируют нарушения</div><div class="mb-3"><span class="inline-block w-2 h-2 bg-pink-400 rounded-full mr-2 mt-2"></span>Оставлять машину в неположенных местах — эвакуируют быстро</div>'
    }
};

// Modal Functionality
const modal = document.getElementById('countryModal');
const modalBody = document.getElementById('modalBody');
const modalOverlay = document.querySelector('.modal-overlay');

function openModal(countryKey) {
    const data = countryData[countryKey];
    if (!data) return;
    
    modalBody.innerHTML = `
        <div class="sticky top-4 z-30 flex justify-end pr-6">
            <button class="close-btn w-10 h-10 rounded-full transition flex items-center justify-center shadow-lg text-white" style="background: linear-gradient(135deg, #FFB9D4, #FFADD8);">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>

        <img src="${data.image}" alt="${data.name}" class="w-full h-96 object-cover">
        
        <div class="p-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-6">${data.name}</h2>
            <p class="text-xl text-gray-700 mb-6">${data.description}</p>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🏝 Популярные курорты</span></div>
                    <p class="text-gray-600 mb-4">${data.regions}</p>
                    
                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">☀️ Климат и сезоны</span></div>
                    <p class="text-gray-600 mb-4">${data.climate}</p>
                    
                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🍜 Что попробовать</span></div>
                    <p class="text-gray-600 mb-4">${data.food}</p>

                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🎁 Что привезти</span></div>
                    <p class="text-gray-600 mb-4">${data.gifts || data.tips.match(/Что привезти.*?(?=<div class="mb-2 mt-4"|<\/div>$)/s)?.[0] || ''}</p>

                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">💰 Валюта и обмен</span></div>
                    <p class="text-gray-600 mb-4">${data.currency}</p>
                </div>
                
                <div>
                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🛂 Виза и въезд</span></div>
                    <p class="text-gray-600 mb-4">${data.visa || data.tips.match(/Виза и въезд.*?(?=<div class="mb-2 mt-4"|<\/div>$)/s)?.[0] || ''}</p>
                    
                    <div class="mb-2 mt-4"><span class="text-pink-600 font-semibold">🕌 Ключевые достопримечательности</span></div>
                    <p class="text-gray-600 mb-4">${data.attractions || data.tips.match(/Ключевые достопримечательности.*?(?=<div class="mb-2 mt-4"|<\/div>$)/s)?.[0] || ''}</p>
                    
                    <p class="text-gray-600">${data.highlight}</p>
                </div>
            </div>
            
            <div class="mt-8 text-center">
                <a href="https://t.me/iskra_tour_bot" target="_blank" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-base font-semibold shadow-md text-white transition-all duration-300 hover:scale-105 hover:shadow-xl" style="background: linear-gradient(135deg, #FFB9D4, #FFADD8); text-decoration: none; width: 298.75px; margin-left: auto; margin-right: auto;">
                    Написать менеджеру
                </a>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    lockBodyScroll();
    
    // Add event listeners
    modalBody.querySelector('.close-btn').addEventListener('click', closeModal);
}

function closeModal() {
    modal.classList.add('hidden');
    unlockBodyScroll();
}

// Open modal when clicking on country cards
document.querySelectorAll('.direction-card').forEach(card => {
    card.addEventListener('click', () => {
        const countryKey = card.getAttribute('data-country');
        if (countryKey && countryData[countryKey]) {
            openModal(countryKey);
        }
    });
});

// Close modal when clicking on overlay
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// Form Handling
// === FORM HANDLER: heroForm (Cloudflare Pages prod) ===

(function () {

  const form = document.getElementById('heroForm');

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const messageEl = document.getElementById('heroFormMessage');
  // Время начала заполнения формы (anti-bot таймер)
  const formStartTime = Date.now();



  const serializeUTM = () => {

    const params = new URLSearchParams(window.location.search);

    const utm = {};

    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => {

      if (params.get(k)) utm[k] = params.get(k);

    });

    return utm;

  };



  form.addEventListener('submit', async (e) => {

    e.preventDefault();
    
    // Проверка чекбокса согласия
    const consentCheckbox = document.getElementById('heroFormConsent');
    if (!consentCheckbox || !consentCheckbox.checked) {
      if (messageEl) {
        messageEl.textContent = 'Необходимо дать согласие на обработку персональных данных';
        messageEl.classList.remove('hidden', 'form-message-success');
        messageEl.classList.add('form-message-error');
      }
      return;
    }
    
    if (submitBtn) {

      submitBtn.disabled = true;

      submitBtn.textContent = 'Отправка...';

    }

    if (messageEl) {
      messageEl.classList.add('hidden');
    }



    try {

      const formData = new FormData(form);

      const now = Date.now();

      const payload = {

        name: String(formData.get('name') || '').trim(),

        contact_method: String(formData.get('contact_method') || '').trim(),

        contact: String(formData.get('contact') || '').trim(),

        wishes: String(formData.get('wishes') || '').trim(),

        page: window.location.href,

        utm: serializeUTM(),

        // Honeypot и таймер заполнения
        website: String(formData.get('website') || '').trim(),
        filled_in_ms: now - formStartTime

      };



      const res = await fetch('/api/telegram.php', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(payload)

      });



      let json = {};
      try {
        const text = await res.text();
        json = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Ошибка парсинга ответа:', e);
        json = { ok: false, error: 'Ошибка обработки ответа сервера' };
      }

      if (!res.ok || json?.ok === false) {
        const msg = json?.error || json?.message || `Ошибка отправки (${res.status})`;
        console.error('Ошибка отправки формы:', msg, json);
        
        if (messageEl) {
          messageEl.textContent = `Не удалось отправить заявку: ${msg}`;
          messageEl.classList.remove('hidden', 'form-message-success');
          messageEl.classList.add('form-message-error');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Узнать про тур';
        }
        return;
      }

      form.reset();

      if (messageEl) {
        messageEl.textContent = 'Заявка отправлена! Я свяжусь с вами в ближайшее время.';
        messageEl.classList.remove('hidden', 'form-message-error');
        messageEl.classList.add('form-message-success');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Узнать про тур';
      }

    } catch {

      alert('Сетевая ошибка. Попробуйте ещё раз.');

    } finally {

      if (submitBtn) {

        submitBtn.disabled = false;

        submitBtn.textContent = 'Узнать про тур';

      }

    }

  });



  // UX: плейсхолдер в зависимости от способа связи

  const contactMethod = document.getElementById('heroContactMethod');

  const contactInput = document.getElementById('heroContact');

  if (contactMethod && contactInput) {

    const updatePlaceholder = () => {

      const m = contactMethod.value;

      contactInput.style.display = m ? 'block' : 'none';

      contactInput.placeholder =

        m === 'phone' ? 'Телефон' :

        m === 'whatsapp' ? 'WhatsApp' :

        m === 'telegram' ? 'Логин в Telegram' :

        m === 'email' ? 'E-mail' : 'Контакт';

    };

    contactMethod.addEventListener('change', updatePlaceholder);

    updatePlaceholder();

  }

})();

// === FORM HANDLER: ctaForm (Cloudflare Pages prod) ===

(function () {

  const form = document.getElementById('ctaForm');

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const messageEl = document.getElementById('ctaFormMessage');
  // Время начала заполнения формы (anti-bot таймер)
  const formStartTime = Date.now();



  const serializeUTM = () => {

    const params = new URLSearchParams(window.location.search);

    const utm = {};

    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => {

      if (params.get(k)) utm[k] = params.get(k);

    });

    return utm;

  };



  form.addEventListener('submit', async (e) => {

    e.preventDefault();

    // Проверка чекбокса согласия
    const consentCheckbox = document.getElementById('ctaFormConsent');
    if (!consentCheckbox || !consentCheckbox.checked) {
      if (messageEl) {
        messageEl.textContent = 'Необходимо дать согласие на обработку персональных данных';
        messageEl.classList.remove('hidden', 'form-message-success');
        messageEl.classList.add('form-message-error');
      }
      return;
    }

    if (submitBtn) {

      submitBtn.disabled = true;

      submitBtn.textContent = 'Отправка...';

    }

    if (messageEl) {
      messageEl.classList.add('hidden');
    }



    try {

      const formData = new FormData(form);

      const now = Date.now();

      const payload = {

        name: String(formData.get('name') || '').trim(),

        contact_method: String(formData.get('contact_method') || '').trim(),

        contact: String(formData.get('contact') || '').trim(),

        wishes: String(formData.get('wishes') || '').trim(),

        page: window.location.href,

        utm: serializeUTM(),

        // Honeypot и таймер заполнения
        website: String(formData.get('website') || '').trim(),
        filled_in_ms: now - formStartTime

      };



      const res = await fetch('/api/telegram.php', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(payload)

      });



      let json = {};
      try {
        const text = await res.text();
        json = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Ошибка парсинга ответа:', e);
        json = { ok: false, error: 'Ошибка обработки ответа сервера' };
      }

      if (!res.ok || json?.ok === false) {
        const msg = json?.error || json?.message || `Ошибка отправки (${res.status})`;
        console.error('Ошибка отправки формы:', msg, json);
        
        if (messageEl) {
          messageEl.textContent = `Не удалось отправить заявку: ${msg}`;
          messageEl.classList.remove('hidden', 'form-message-success');
          messageEl.classList.add('form-message-error');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Узнать про тур';
        }
        return;
      }

      form.reset();

      if (messageEl) {
        messageEl.textContent = 'Заявка отправлена! Я свяжусь с вами в ближайшее время.';
        messageEl.classList.remove('hidden', 'form-message-error');
        messageEl.classList.add('form-message-success');
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Узнать про тур';
      }

    } catch {

      alert('Сетевая ошибка. Попробуйте ещё раз.');

    } finally {

      if (submitBtn) {

        submitBtn.disabled = false;

        submitBtn.textContent = 'Узнать про тур';

      }

    }

  });



  // UX: плейсхолдер в зависимости от способа связи

  const contactMethod = document.getElementById('ctaContactMethod');

  const contactInput = document.getElementById('ctaContact');

  if (contactMethod && contactInput) {

    const updatePlaceholder = () => {

      const m = contactMethod.value;

      contactInput.style.display = m ? 'block' : 'none';

      contactInput.placeholder =

        m === 'phone' ? 'Телефон' :

        m === 'whatsapp' ? 'WhatsApp' :

        m === 'telegram' ? 'Логин в Telegram' :

        m === 'email' ? 'E-mail' : 'Контакт';

    };

    contactMethod.addEventListener('change', updatePlaceholder);

    updatePlaceholder();

  }

})();

// Open form button
const openFormBtn = document.getElementById('openFormBtn');
if (openFormBtn) {
    openFormBtn.addEventListener('click', () => {
        // Find CTA section by text content
        const sections = document.querySelectorAll('section');
        let ctaSection = null;
        
        for (let section of sections) {
            if (section.textContent.includes('Начните планировать')) {
                ctaSection = section;
                break;
            }
        }
        
        if (ctaSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = ctaSection.offsetTop - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Contact method handling
function setupContactMethodHandler(selectId, contactInputId) {
    const select = document.getElementById(selectId);
    const contactInput = document.getElementById(contactInputId);
    
    if (select && contactInput) {
        select.addEventListener('change', (e) => {
            const value = e.target.value;
            if (value) {
                contactInput.style.display = 'block';
                contactInput.required = true;
                const placeholders = {
                    'phone': '+7 (___) ___-__-__',
                    'whatsapp': 'WhatsApp номер',
                    'telegram': '@username',
                    'max': '@username',
                    'email': 'email@example.com'
                };
                contactInput.placeholder = placeholders[value] || 'Контакт';
            } else {
                contactInput.style.display = 'none';
                contactInput.required = false;
                contactInput.value = '';
            }
        });
    }
}

// Setup contact method handlers for both forms
setupContactMethodHandler('heroContactMethod', 'heroContact');
setupContactMethodHandler('ctaContactMethod', 'ctaContact');

// Privacy Policy Modal
const privacyModal = document.getElementById('privacyModal');
const privacyLink = document.getElementById('privacyPolicyLink');
const openPrivacyFromHero = document.getElementById('openPrivacyFromHero');
const openPrivacyFromCta = document.getElementById('openPrivacyFromCta');
const closePrivacyModal = document.getElementById('closePrivacyModal');

function openPrivacyModalFunc() {
    if (privacyModal) {
        privacyModal.classList.remove('hidden');
        lockBodyScroll();
    }
}

function closePrivacyModalFunc() {
    if (privacyModal) {
        privacyModal.classList.add('hidden');
        unlockBodyScroll();
    }
}

if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        openPrivacyModalFunc();
    });
}

if (openPrivacyFromHero) {
    openPrivacyFromHero.addEventListener('click', (e) => {
        e.preventDefault();
        openPrivacyModalFunc();
    });
}

if (openPrivacyFromCta) {
    openPrivacyFromCta.addEventListener('click', (e) => {
        e.preventDefault();
        openPrivacyModalFunc();
    });
}

if (closePrivacyModal) {
    closePrivacyModal.addEventListener('click', closePrivacyModalFunc);
}

if (privacyModal) {
    privacyModal.addEventListener('click', (e) => {
        if (e.target === privacyModal) {
            closePrivacyModalFunc();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && privacyModal && !privacyModal.classList.contains('hidden')) {
        closePrivacyModalFunc();
    }
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
    
    lastScroll = currentScroll;
});

// Phone input masking
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            value = '+7 (' + value.substring(1);
            if (value.length > 8) value = value.substring(0, 8) + ') ' + value.substring(8);
            if (value.length > 14) value = value.substring(0, 14) + '-' + value.substring(14);
            if (value.length > 17) value = value.substring(0, 17) + '-' + value.substring(17, 21);
        }
        e.target.value = value || '+7 (';
    });
});

// Lazy load images
const images = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Benefits Carousel
let currentSlide = 0;
let visualPosition = 0; // Визуальная позиция для анимации (всегда движется слева направо)
const totalSlides = 3; // Number of slides (3 rectangles)
let carouselInterval;

function updateCarousel() {
    const carousel = document.getElementById('benefitsCarousel');
    if (!carousel) return;
    
    // Всегда используем визуальную позицию для плавного движения слева направо
    const translateX = -visualPosition * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    const indicators = document.getElementById('carouselIndicators');
    if (indicators) {
        indicators.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            if (i === currentSlide) {
                dot.className = 'h-2 rounded-full transition-all duration-300';
                dot.style.width = '24px';
                dot.style.background = '#ffb9d2';
            } else {
                dot.className = 'w-2 h-2 rounded-full transition-all duration-300';
                dot.style.background = '#ffb9d2';
                dot.style.opacity = '0.4';
            }
            indicators.appendChild(dot);
        }
    }
}

window.nextSlide = function() {
    // Всегда переход вперед (слева направо)
    const targetSlide = (currentSlide + 1) % totalSlides;
    currentSlide = targetSlide;
    visualPosition = targetSlide;
    updateCarousel();
    resetCarouselInterval();
}

window.prevSlide = function() {
    // Всегда двигаемся слева направо, даже при "предыдущем" слайде
    // Для перехода к предыдущему слайду всегда делаем обход вперед через все слайды
    const targetSlide = (currentSlide + totalSlides - 1) % totalSlides;
    
    // Чтобы всегда было движение слева направо, проходим вперед через все слайды
    // Например: 
    // - С 1 на 0: идем 1->2->0 (но визуально это сложно)
    // - С 2 на 1: идем 2->0->1 (обход через начало)
    // - С 0 на 2: идем 0->1->2 (просто вперед)
    
    // Всегда идем вперед на (totalSlides - 1) шагов, чтобы попасть на предыдущий
    // Визуально: увеличиваем visualPosition на (totalSlides - 1), что создаст движение вперед
    const stepsForward = totalSlides - 1;
    visualPosition = currentSlide + stepsForward;
    currentSlide = targetSlide;
    updateCarousel();
    
    // После завершения анимации синхронизируем визуальную позицию
    setTimeout(() => {
        visualPosition = currentSlide;
        const carouselEl = document.getElementById('benefitsCarousel');
        if (carouselEl) {
            // Временно убираем transition для мгновенного перехода к правильной позиции
            carouselEl.style.transition = 'none';
            carouselEl.style.transform = `translateX(${-currentSlide * 100}%)`;
            // Возвращаем transition
            setTimeout(() => {
                if (carouselEl) {
                    carouselEl.style.transition = '';
                }
            }, 50);
        }
        // Обновляем индикаторы
        const indicators = document.getElementById('carouselIndicators');
        if (indicators) {
            indicators.innerHTML = '';
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                if (i === currentSlide) {
                    dot.className = 'h-2 rounded-full transition-all duration-300';
                    dot.style.width = '24px';
                    dot.style.background = '#ffb9d2';
                } else {
                    dot.className = 'w-2 h-2 rounded-full transition-all duration-300';
                    dot.style.background = '#ffb9d2';
                    dot.style.opacity = '0.4';
                }
                indicators.appendChild(dot);
            }
        }
    }, 1000);
    
    resetCarouselInterval();
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarouselInterval();
}

function startCarouselInterval() {
    carouselInterval = setInterval(() => {
        // Автоматический переход вперед (слева направо)
        const targetSlide = (currentSlide + 1) % totalSlides;
        currentSlide = targetSlide;
        visualPosition = targetSlide;
        updateCarousel();
    }, 7000); // Change slide every 7 seconds
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCarousel();
    startCarouselInterval();
});

console.log('iSKRA Tour website loaded successfully!');

// Testimonials Carousel
const testimonialsCarousel = document.getElementById('testimonialsCarousel');
const testimonialsIndicators = document.getElementById('testimonialsIndicators');
const totalTestimonials = testimonialsCarousel ? testimonialsCarousel.children.length : 0;
let currentTestimonial = 0;
let testimonialsInterval;

function renderTestimonialsIndicators() {
    if (!testimonialsIndicators) return;
    testimonialsIndicators.innerHTML = '';
    for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('div');
        if (i === currentTestimonial) {
            dot.className = 'h-2 rounded-full transition-all duration-300';
            dot.style.width = '26px';
            dot.style.background = '#ffb9d2';
        } else {
            dot.className = 'w-2 h-2 rounded-full transition-all duration-300';
            dot.style.background = '#ffb9d2';
            dot.style.opacity = '0.4';
        }
        dot.addEventListener('click', () => {
            goToTestimonial(i);
        });
        testimonialsIndicators.appendChild(dot);
    }
}

function updateTestimonialsCarousel() {
    if (!testimonialsCarousel) return;
    const translateX = -currentTestimonial * 100;
    testimonialsCarousel.style.transform = `translateX(${translateX}%)`;
    renderTestimonialsIndicators();
}

function goToTestimonial(index) {
    currentTestimonial = (index + totalTestimonials) % totalTestimonials;
    updateTestimonialsCarousel();
    resetTestimonialsInterval();
}

window.nextTestimonial = function () {
    goToTestimonial(currentTestimonial + 1);
};

window.prevTestimonial = function () {
    goToTestimonial(currentTestimonial - 1);
};

function startTestimonialsInterval() {
    if (!totalTestimonials) return;
    testimonialsInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialsCarousel();
    }, 7000);
}

function resetTestimonialsInterval() {
    clearInterval(testimonialsInterval);
    startTestimonialsInterval();
}

document.addEventListener('DOMContentLoaded', () => {
    if (totalTestimonials > 0) {
        updateTestimonialsCarousel();
        startTestimonialsInterval();
    }
});

// About Modal Elements
const aboutModal = document.getElementById('aboutModal');
const aboutModalOverlay = document.getElementById('aboutModalOverlay');
const aboutModalClose = document.getElementById('aboutModalClose');
const aboutModalTriggers = document.querySelectorAll('[data-open-about-modal]');

let bodyScrollLockCount = 0;

const lockBodyScroll = () => {
    const root = document.documentElement;
    if (bodyScrollLockCount === 0) {
        document.body.dataset.prevOverflow = document.body.style.overflow || '';
        root.dataset.prevOverflow = root.style.overflow || '';

        document.body.style.overflow = 'hidden';
        root.style.overflow = 'hidden';
    }
    bodyScrollLockCount += 1;
};

const unlockBodyScroll = () => {
    const root = document.documentElement;
    if (bodyScrollLockCount > 0) {
        bodyScrollLockCount -= 1;
    }
    if (bodyScrollLockCount === 0) {
        const previousBody = document.body.dataset.prevOverflow;
        const previousRoot = root.dataset.prevOverflow;

        document.body.style.overflow = previousBody || '';
        root.style.overflow = previousRoot || '';

        delete document.body.dataset.prevOverflow;
        delete root.dataset.prevOverflow;
    }
};

function openAboutModal() {
    if (!aboutModal) return;
    aboutModal.classList.remove('hidden');
    lockBodyScroll();
}

function closeAboutModal() {
    if (!aboutModal) return;
    aboutModal.classList.add('hidden');
    unlockBodyScroll();
}

if (aboutModalTriggers.length) {
    aboutModalTriggers.forEach((trigger) => {
        trigger.addEventListener('click', openAboutModal);
    });
}

if (aboutModalClose) {
    aboutModalClose.addEventListener('click', closeAboutModal);
}

if (aboutModal) {
    aboutModal.addEventListener('click', (event) => {
        const content = document.querySelector('.about-modal-content');
        if (content && !content.contains(event.target)) {
            closeAboutModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && aboutModal && !aboutModal.classList.contains('hidden')) {
        closeAboutModal();
    }
});

