console.log("running")
var ctx = document.getElementById('myChart').getContext('2d');

Papa.parse("emotion_data.csv", {
    worker: true,
    step: function(results) {
        var data = results.data;
    }
});

console.log(data);
var datetime = [];
var angry = ["Angry"];
var disgust = ["Disgust"];
var happy = ["Happy"];
var sad = ["Sad"];
var surprise = ["Surprise"];
var maximumpredictedemotion = ["Maxium Predicted Emotion"];

for (var i = data.length - 101; i < data.length - 1; i++) {
    datetime.push(data[i][1]);
    angry.push(data[i][2]);
    disgust.push(data[i][3]);
    happy.push(data[i][4]);
    sad.push(data[i][5]);
    surprise.push(data[i][6]);
    maximumpredictedemotion.push(data[i][8])
    console.log("data processed");
}

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});