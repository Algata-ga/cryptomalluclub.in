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
function createAMACard(ama) {
    const card_div = document.createElement("div");
    card_div.classList.add("card");

    const card_href = document.createElement("a");
    card_href.href = ama.link;

    const card_img = document.createElement("img");
    card_img.src = ama.thumbnail;
    card_img.alt = "";

    card_href.appendChild(card_img);
    card_div.appendChild(card_href);

    return card_div;
}
async function renderAMA() {
    const amas = await getAMA();
    const amas_container = document.getElementById("amas_container");
    for (let i in amas.items) {
        console.log(i);
        console.log(amas.items[i]);
        const child = createAMACard(amas.items[i]);
        amas_container.appendChild(child);
    }
}
ready(function () {
    document.getElementById("hamburger").addEventListener(
        "click",
        function () {
            document.getElementById("nav-links").classList.toggle("open");
        },
        false
    );

    renderAMA();
});
