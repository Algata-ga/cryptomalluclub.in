function ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
async function getAMA() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Getting AMAs from medium",
        }),
    };
    const response = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@CryptoMalluC",
        requestOptions
    );
    const data = await response.json();

    return data;
}
async function getTwitterRSS() {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: "Getting AMA announcemnets from twitter",
        }),
    };
    const response = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://nitter.net/CryptomalluC/rss",
        requestOptions
    );
    const data = await response.json();
    return data;
}

function createAMACard(ama) {
    const card_div = document.createElement("div");
    card_div.classList.add("card");

    const card_href = document.createElement("a");
    card_href.href = ama.link;

    const card_img = document.createElement("img");
    card_img.src = ama.thumbnail;
    card_img.alt = "";

    const card_title = document.createElement("h3");
    card_title.innerHTML = ama.title.substring(12);

    const card_date = document.createElement("h4");
    const date = new Date(ama.pubDate);

    card_date.innerHTML = `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
    })} ${date.getFullYear()}`;

    card_href.appendChild(card_img);
    card_href.appendChild(card_title);
    card_href.appendChild(card_date);
    card_div.appendChild(card_href);

    return card_div;
}
async function renderAMARecaps() {
    const amas = await getAMA();

    const amas_container = document.getElementById("amas_container");
    for (let i = 1; i < amas.items.length; i++) {
        const child = createAMACard(amas.items[i]);
        amas_container.appendChild(child);
    }
}

function get_date_from_prettyDate(prettyDate) {
    const parts = prettyDate.split(" ");
    const date = parts[0].substring(0, parts[0].length - 2);
    const month = parts[1].substring(0, 3);
    const year = parts[2];
    return `${date} ${month} ${year}`;
}
function parse_and_reduce(tweets) {
    let upcomingAMAs = [];
    const current_date = new Date();
    for (let i in tweets) {
        const tweet = tweets[i];
        if (tweet.title.search("CRYPTOMALLU CLUB AMA ANNOUNCEMENT") != -1) {
            let parsedtitle = tweet.title.split(/\n/);
            let title = parsedtitle[0].split(":");
            title = title[1];
            let ama_date;
            if (parsedtitle[4] !== undefined) {
                ama_date = parsedtitle[4].split("-");
                ama_date = ama_date[1].substring(1);
                ama_date = new Date(get_date_from_prettyDate(ama_date));
            }

            const pubDate = new Date(tweet.pubDate);
            if (ama_date < pubDate) {
                ama_date.setFullYear(ama_date.getFullYear() + 1);
            }
            if (ama_date > current_date) upcomingAMAs.push(tweet.thumbnail);
        }
    }
    return upcomingAMAs;
}
async function renderUpcomingAMA() {
    const tweets = await getTwitterRSS();
    const upcomingAMAs = parse_and_reduce(tweets.items);
    const main_img = document.createElement("img");
    main_img.src = upcomingAMAs[0];
    main_img.alt = "Most Recent AMA";
    console.log(upcomingAMAs);
    const mainImageAMA = document.getElementById("mainimg_ama");
    mainImageAMA.appendChild(main_img);
}

ready(function () {
    document.getElementById("hamburger").addEventListener(
        "click",
        function () {
            document.getElementById("nav-links").classList.toggle("open");
        },
        false
    );

    const copyright = document.getElementById("copyright");
    const date = new Date();
    const year = date.getFullYear();
    const copyright_str = `<i class="far fa-copyright"></i> ${year} <a href="#">CMC</a> All Rights Reserved`;
    copyright.innerHTML = copyright_str;

    renderUpcomingAMA();
    renderAMARecaps();
});
