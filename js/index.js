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
    for (var i = 0; i < elements.length; ++i) {
        var element = elements[i];
        var name = element.name;
        var value = element.value;

        if (name) {
            res = res + `${name}=${value}&`;
        }
    }
    return res;
};

ready(function () {
    document.getElementById("hamburger").addEventListener(
        "click",
        function () {
            document.getElementById("nav-links").classList.toggle("open");
        },
        false
    );
});

const accordian = document.getElementsByClassName("contents");

for (i = 0; i < accordian.length; i++) {
    accordian[i].addEventListener("click", function () {
        this.classList.toggle("active");
    });
}

ready(function () {
    document.getElementById("submit-form").addEventListener(
        "submit",
        function (form) {
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
            } catch (err) {
                alert("Sending failed.");
                window.location.reload();
            }
        },
        false
    );
});
