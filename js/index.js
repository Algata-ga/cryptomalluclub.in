function ready(fn) {
    if (document.readyState != "loading") {
        fn();
    } else {
        document.addEventListener("DOMContentLoaded", fn);
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
            const request = new XMLHttpRequest();
            request.open(
                "POST",
                "https://script.google.com/macros/s/AKfycbznIGAyNRAIHVwpDmU6GGwm4k9uehMjJnJrZ5k9YMKoQwgquB3mpu1IiQPuqqwn5xJ_/exec",
                true
            );
            request.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded; charset=UTF-8"
            );
            const data = document.getElementById("submit-form").serialize();
            try {
                request.send(data);
                alert("Sent successfully!");
                window.location.reload();
            } catch (err) {
                alert("Sending failed.");
                window.location.reload();
            }
        },
        false
    );
});
