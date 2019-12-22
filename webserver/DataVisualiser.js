console.log("running");
var ctx = document.getElementById('myChart').getContext('2d');
var datapoints = 100


// min max scaler normalisation function
function normalise(array) {
    var i;
    var max = Number.MIN_VALUE;
    var min = Number.MAX_VALUE;
    for (i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    for (i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }

    for (i = 0; i < array.length; i++) {
        var norm = (array[i] - min) / (max - min);
        array[i] = norm;
    }

    max = Number.MIN_VALUE;
    min = Number.MAX_VALUE;
    for (i = 0; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
        }
    }

    for (i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }

    return (array)
}

// parse data from csv
Papa.parse("emotion_data.csv", {
    download: true,
    complete: function(results) {

        console.log("data parsed");

        var data = results.data
        var datetime = [];
        var angry = ["Angry"];
        var disgust = ["Disgust"];
        var happy = ["Happy"];
        var sad = ["Sad"];
        var surprise = ["Surprise"];
        var maximumpredictedemotion = ["Maxium Predicted Emotion"];


        //push data to empty arrays

        for (var i = data.length - 101; i < data.length - 1; i++) {
            datetime.push(data[i][1]);
            angry.push(data[i][2]);
            disgust.push(data[i][3]);
            happy.push(data[i][4]);
            sad.push(data[i][5]);
            surprise.push(data[i][6]);
            maximumpredictedemotion.push(data[i][8]);
        }
        console.log("data processed");

        // strip datetime of milliseconds
        for (var i = 0; i < datetime.length; i++) {
            datetime[i] = datetime[i].substring(0, datetime[i].length - 7);
            //console.log(datetime[i])
        }

        //normalise data
        angry = normalise(angry);
        disgust = normalise(disgust);
        happy = normalise(happy);
        sad = normalise(sad);
        surprise = normalise(surprise);
        console.log("data normalised");

        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datetime,
                datasets: [{
                    label: 'Percentage Value',
                    data: angry,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
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
    }
});