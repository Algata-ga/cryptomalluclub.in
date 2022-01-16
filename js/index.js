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
                "CRYPTO MALLU CLUB's participation and reactions are solid and prompt, and I see a lot of promise in working with them in the long run. I'm hoping that its community will grow greatly in the future.",
        },

        {
            source: "Team Bigone Exchangel",
            content:
                "CMC is a fantastic community for introducing any crypto platform.And, yes, this is a really active and wonderful community. Wishes for them to have a great reputation and to keep their reputation, activity, and growth.",
        },

        {
            source: "Team Shoefy",
            content:
                "It was an incredible experience to do the AMA with CMC. The real enthusiasm of the community, the substance we were able to provide, and, most all, the hosts' extremely professional approach to preparing the AMA gives me every reason to conduct additional AMAs with them in the future. It is worthwhile to promote CMC to others.",
        },

        {
            source: "Team GHI",
            content:
                "So the AMA with the CRYPTO MALLU CLUB was fantastic! First and foremost, I'd want to emphasise how active and knowledgeable their community is. We were asked a terrific set of questions by both the team and the community, and the AMA went off without a hitch with no interruptions and a fantastic reaction from the community! They've been spreading all of our blogs and important developments throughout their networks, as promised. I would enthusiastically recommend them for any assignment.",
        },
        {
            source: "Team Crypto",
            content:
                "The people group is exceptionally dynamic and the inquiries coming from the CMC people group are truly noteworthy. This definitely  the  people group we've without exception needed to do AMAs with",
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

    const copyright = document.getElementById("copyright");
    const date = new Date();
    const year = date.getFullYear();
    const copyright_str = `<i class="far fa-copyright"></i> ${year} <a href="#">CMC</a> All Rights Reserved`;
    copyright.innerHTML = copyright_str;

    document.getElementById("submit-form").addEventListener(
        "submit",
        function (e) {
            const google_script_url =
                "https://script.google.com/macros/s/AKfycbxSDYjtSJ4ZxDEP8dhk-DSLRs5whtA-K9ISosLt_IZ5p5EAKUaHds4iKfSg89z7UrdY/exec";

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
