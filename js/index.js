function ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}
HTMLElement.prototype.serialize = function () {
    var res = "";
    var elements = this.querySelectorAll("input, select, textarea");
    for (let i = 0; i < elements.length; i++) {
        const e = elements[i];
        if (e.name) {
            res = res + `${e.name}=${e.value}&`;
        }
    }
    console.log(res);
    return res;
};

const accordian = document.getElementsByClassName("contents");

for (i = 0; i < accordian.length; i++) {
    accordian[i].addEventListener("click", function () {
        this.classList.toggle("active");
    });
}

function testimonials() {
    const testimonials_data = [
        {
            source: "Team MEXC Global",
            content:
                " The collaboration and responses from CRYPTO CHALLENGERS is firm and swift, I can see there are a lot of potential of staying with them for long term. Hope its community will expand tremendously and more to come ",
        },

        {
            source: "Team Bigone Exchangel",
            content:
                " Crypto challengers is a Great Community To Intruduce Any Platform On Crypto World . And, Yeah Very Active and Great Community. Wishes To Be a Great Reputation for them and Wish to Maintain Their Reputation, Activeness, Growth As well As ",
        },

        {
            source: "Team Shoefy",
            content:
                " Doing the AMA with Crypto Challengers was an amazing experience. The genuine passion of the community, the contents we were able to present and above all, the very professional way of organizing the AMA by the hosts, gives me all the reasons to do more future AMAs them. Crypto Challengers is worth recommending to others",
        },

        {
            source: "Team GHI",
            content:
                "The collaboration and responses from CRYPTO CHALLENGERS is firm and swift, I can see there are a lot of p",
        },
    ];

    const testimonials_source = document.getElementById("testimonial_source");
    const testimonials_content = document.getElementById("testimonial_content");
    const testimonial_box = document.getElementById("testimonial_box");

    let i = 0;

    testimonials_source.innerHTML = testimonials_data[0].source;
    testimonials_content.innerHTML = testimonials_data[0].content;

    function next() {
        testimonial_box.classList.toggle("hide");

        setTimeout(() => {
            testimonial_box.classList.toggle("hide");
            i++;
            const testimonial = testimonials_data[i % testimonials_data.length];
            testimonials_source.innerHTML = testimonial.source;
            testimonials_content.innerHTML = testimonial.content;
        }, 420);
    }

    return next;
}
ready(function () {
    document.getElementById("hamburger").addEventListener(
        "click",
        function () {
            document.getElementById("nav-links").classList.toggle("open");
        },
        false
    );

    document.getElementById("submit-form").addEventListener(
        "submit",
        function (e) {
            const google_script_url =
                "https://script.google.com/macros/s/AKfycbx8P9tgMBuI27gVchzeM6Yj2oxlZnJulQdqPKhjtNbW8Y4iq-uGQW0tYYJowDgRmlrB/exec";

            const request = new XMLHttpRequest();
            request.open("POST", google_script_url, true);
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            const data = document.getElementById("submit-form").serialize();
            try {
                request.send(data);
                alert("Sent successfully!");
                document.getElementById("submit-form").reset();
                e.preventDefault();
            } catch (err) {
                alert("Sending failed.");
                window.location.reload();
            }
        },
        false
    );

    const next = testimonials();
    setInterval(() => next(), 2500);
});
