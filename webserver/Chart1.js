console.log("running");
var ctx = document.getElementById('Chart1').getContext('2d');

setup1();

window.setInterval(function() {
    setup1();
}, 3000);

function setup1() {
    var datapoints = parseFloat(document.getElementById("userinput1").value);
    if (typeof datapoints == 'undefined') {
        var datapoints = 100;
    }
    console.log(datapoints);
    graph(datapoints);
}

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
function graph(datapoints) {
    console.log(datapoints)
    Papa.parse("emotion_data.csv", {
        download: true,
        complete: function(results) {

            console.log("data parsed");

            var data = results.data
            var datetime = [];
            var angry = [];
            var disgust = [];
            var happy = [];
            var sad = [];
            var surprise = [];
            var maximumpredictedemotion = ["Maxium Predicted Emotion"];


            //push data to empty arrays

            for (var i = data.length - datapoints - 1; i < data.length - 1; i++) {
                //for (var i = 1000; i < data.length - 1; i++) {
                datetime.push(data[i][1]);
                angry.push(data[i][2]);
                disgust.push(data[i][3]);
                happy.push(data[i][4]);
                sad.push(data[i][5]);
                surprise.push(data[i][6]);
                maximumpredictedemotion.push(data[i][8]);
            }



            console.log("data processed");

            // strip datetime of seconds and format 
            for (var i = 0; i < datetime.length; i++) {
                datetime[i] = datetime[i].substring(10, datetime[i].length - 3);
                datetime[i] = datetime[i].replace('-', '/');
                //console.log(datetime[i])
            }
            //normalise data
            angry = normalise(angry);
            disgust = normalise(disgust);
            happy = normalise(happy);
            sad = normalise(sad);
            surprise = normalise(surprise);
            console.log("data normalised");

            var Chart1 = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: datetime,
                    datasets: [{
                        fill: false,
                        label: 'Happy',
                        data: happy,
                        borderColor: [
                            'rgba(200, 30, 212, 0.5)',
                        ],
                        borderWidth: 2.5
                    }, {
                        fill: false,
                        label: 'Surprise',
                        data: surprise,
                        borderColor: [
                            'rgba(255, 255, 12, 0.5)',
                        ],
                        borderWidth: 2.5
                    }, {
                        fill: false,
                        label: 'Sad',
                        data: sad,
                        borderColor: [
                            'rgba(12, 32, 255, 0.5)',
                        ],
                        borderWidth: 2.5
                    }, {
                        fill: false,
                        label: 'Disgust',
                        data: disgust,
                        borderColor: [
                            'rgba(70, 255, 2, 0.5)',
                        ],
                        borderWidth: 2.5
                    }, {
                        fill: false,
                        label: 'Anger',
                        data: angry,
                        borderColor: [
                            'rgba(255, 0, 0, 0.5)',
                        ],
                        borderWidth: 2.5
                    }]
                },

                options: {
                    animation: false,
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMin: 0
                            }
                        }]
                    }
                }
            });
        }
    });

}