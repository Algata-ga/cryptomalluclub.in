function ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

async function getJsonFromRss(url) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Thanks",
        }),
    };
    const response = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=" + url,
        requestOptions
    );
    const data = await response.json();
    return data;
}

function createAMACard(ama) {
    const date = new Date(ama.pubDate);

    const ama_date = `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
    })} ${date.getFullYear()}`;

    const card = `<div class="card"><a href=${ama.link}><img src=${
        ama.thumbnail
    } loading="lazy"></img><h3>${ama.title.substring(
        12
    )}</h3><h4>${ama_date}</h4></a></div>`;

    return card;
}

async function renderAMARecaps() {
    const AMARECAPSURL = "https://medium.com/feed/@CryptoMalluC";
    const amas = await getJsonFromRss(AMARECAPSURL);

    const innerHTML = amas.items.reduce((innerHTML, ama) => {
        const child = createAMACard(ama);
        return innerHTML + child;
    }, "");

    const amas_container = document.getElementById("amas_container");
    amas_container.innerHTML = innerHTML;
}

function get_date_from_prettyDate(prettyDate) {
    const parts = prettyDate.split(" ");
    const date = parts[0].substring(0, parts[0].length - 2);
    const month = parts[1].substring(0, 3);
    const year = parts[2];
    return `${date} ${month} ${year}`;
}

function getUpcomingAMAs(tweets) {
    const AMAnnouncements = tweets.filter((tweet) => {
        return tweet.title.search("CRYPTOMALLU CLUB AMA ANNOUNCEMENT") != -1;
    });
    const upcomingAMAs = AMAnnouncements.filter((ama) => {
        const current_date = new Date();
        let parsedtitle = ama.title.split(/\n/);
        let title = parsedtitle[0].split(":");
        title = title[1];
        let ama_date;
        if (parsedtitle[4] !== undefined) {
            ama_date = parsedtitle[4].split("-");
            ama_date = ama_date[1].substring(1);
            ama_date = new Date(get_date_from_prettyDate(ama_date));
        }
        return ama_date > current_date;
    });

    const upcomingAMACards = upcomingAMAs.map((ama) => {
        return ama.thumbnail;
    });
    return upcomingAMACards;
}

async function renderUpcomingAMA() {
    const TWITTER_URL = "https://nitter.net/CryptomalluC/rss";
    const tweets = await getJsonFromRss(TWITTER_URL);
    const upcomingAMAs = getUpcomingAMAs(tweets.items);

    const innerHTML = upcomingAMAs.reduce((innerHTML, ama) => {
        return (
            innerHTML +
            `<div class="swiper-slide"><div class="mainimg"><img src=${ama} alt="recent ama" loading="eager"></img></div></div>`
        );
    }, "");

    const upcomingAMADOM = document.getElementById("upcomingAMAs");
    upcomingAMADOM.innerHTML = innerHTML;
}
function renderCopyright() {
    const copyright = document.getElementById("copyright");
    const date = new Date();
    const year = date.getFullYear();
    const copyright_str = `<i class="far fa-copyright"></i> ${year} <a href="#">CMC</a> All Rights Reserved`;
    copyright.innerHTML = copyright_str;
}
ready(function () {
    document.getElementById("hamburger").addEventListener(
        "click",
        function () {
            document.getElementById("nav-links").classList.toggle("open");
        },
        false
    );
    renderCopyright();
    new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    renderUpcomingAMA();

    renderAMARecaps();
});
