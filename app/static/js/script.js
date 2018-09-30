// assigning variables to the charts
var myChart = document.querySelector("#myChart").getContext("2d");
var myChart2 = document.querySelector("#myChart2").getContext("2d");
var myChart3 = document.querySelector("#myChart3").getContext("2d");

// assign variables to other display areas for hiding and showing
var legend = document.querySelector("#search").value;
var selector = document.querySelector("#select");
var waiting = document.querySelector("#waiting");
var tweetsBox = document.querySelector("#tweetsBox");
var getData = $.get("/data");

var times = [];
var polarity = [];
var subjectivity = [];
var data = [];
var tweets = [];
var increment = 15;
var timeleft = 500;
var timeout = 1000;

window.onload = function() {
    getData.done(function(results) {
        data = results["twing"];
        if (data.length != 0) {
            for (var i = 0; i < 15; i++) {
                polarity.push(i);
                times.push(data[i][3]);
                subjectivity.push(data[i][4]);
                tweets.push(data[i][2]);
            }
        }
    });
};

var chartLoader = setInterval(function() {
    if (data.length != 0) {
        $("#tweetsBox").hover(
            function() {
                timeout = 100000;
            },
            function() {
                timeout = 1000;
            }
        );
        var chart = selector[selector.selectedIndex].value;
        waiting.classList.add("d-none");
        tweetsBox.classList.remove("d-none");
        times.push(data[increment][3]);
        tweets.push(data[increment][2]);
        subjectivity.push(data[increment][4]);
        polarity.push(increment);
        times = times.splice(1, times.length - 1);
        tweets = tweets.splice(1, tweets.length - 1);
        polarity = polarity.splice(1, polarity.length - 1);
        subjectivity = subjectivity.splice(1, subjectivity.length - 1);

        console.log(chart);
        let sentimentChart = new Chart(myChart, {
            type: chart,
            data: {
                labels: polarity,
                datasets: [
                    {
                        label: "Polarity",
                        data: times,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 132, 0.6)"
                        ]
                    },
                    {
                        label: "Subjectivity",
                        data: subjectivity,
                        backgroundColor: [
                            "rgba(156, 12, 267, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(156, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 156, 1)",
                            "rgba(156, 159, 64, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(156, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 156, 1)",
                            "rgba(156, 159, 64, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(156, 12, 267, 1)"
                        ]
                    }
                ]
            },
            options: {
                animation: false
            }
        });

        let sentimentChart2 = new Chart(myChart2, {
            type: "bar",
            data: {
                labels: polarity,
                datasets: [
                    {
                        label: "Polarity",
                        data: times,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 132, 0.6)"
                        ]
                    },
                    {
                        label: "Subjectivity",
                        data: subjectivity,
                        backgroundColor: [
                            "rgba(156, 12, 267, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(156, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 156, 1)",
                            "rgba(156, 159, 64, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(156, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 156, 1)",
                            "rgba(156, 159, 64, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(156, 12, 267, 1)"
                        ]
                    }
                ]
            },
            options: {
                animation: false
            }
        });

        let sentimentChart3 = new Chart(myChart3, {
            type: "radar",
            data: {
                labels: polarity,
                datasets: [
                    {
                        label: "Polarity",
                        data: times,
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            "rgba(255, 99, 132, 0.6)"
                        ]
                    },
                    {
                        label: "Subjectivity",
                        data: subjectivity,
                        backgroundColor: [
                            "rgba(156, 12, 267, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(156, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 156, 1)",
                            "rgba(156, 159, 64, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(156, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 156, 1)",
                            "rgba(156, 159, 64, 1)",
                            "rgba(156, 12, 267, 1)",
                            "rgba(156, 12, 267, 1)"
                        ]
                    }
                ]
            },
            options: {
                animation: false
            }
        });
        console.log(tweets.length);
        for (var i = 0; i < tweets.length; i++) {
            var tweet = tweets[i];
            var id = "#tweet" + String(i);
            document.querySelector(id).innerHTML = tweet;
        }
    } else {
        var chart = selector[selector.selectedIndex].value;
        tweetsBox.classList.add("d-none");
        waiting.classList.remove("d-none");
        // console.log("waiting");
        // console.log(data);
        // console.log(chart);
    }
    timeleft = --timeleft;
    if (timeleft <= 0) {
        timeleft = 500;
    }
    if (increment >= data.length - 2) {
        increment = 0;
    } else {
        increment++;
    }
}, timeout);
console.log(data);