console.log("running");
var ctx2 = document.getElementById('Chart2').getContext('2d');
var timescale = 10; //7 = seconds, 10 = minutes, 13 = hours, 16 = days
var datapoints = 100;
graph2(timescale, datapoints);

function choose(choice) {
    timescale = choice;
    console.log(timescale);
    graph2(timescale, datapoints);
}

function setup2() {
    var datapoints = document.getElementById("userinput2").value;
    console.log(datapoints)
    graph2(timescale, datapoints)
}



// min max scaler normalisation function
function normalise(array) {
    var max = Math.max.apply(null, array);
    var min = Math.min.apply(null, array);
    for (var i = 0; i < array.length; i++) {
        array[i] = (array[i] - min) / (max - min)
    }
    return (array)
}

// parse data from csv
function graph2(timescale, datapoints) {
    Papa.parse("emotion_data.csv", {
        download: true,
        complete: function(results) {

            console.log("data parsed");


            //initialise 2D array
            var data = results.data
            var array = new Array(7)

            for (var i = 0; i < data.length; i++) {
                array[i] = [];
            }

            //append data to array
            for (var i = 0; i < data.length; i++) {
                array[i][0] = data[i][1];
                array[i][1] = parseFloat(data[i][2]);
                array[i][2] = parseFloat(data[i][3]);
                array[i][3] = parseFloat(data[i][4]);
                array[i][4] = parseFloat(data[i][5]);
                array[i][5] = parseFloat(data[i][6]);
                array[i][6] = parseFloat(data[i][8]);
            }

            // strip time of seconds and format 
            for (var i = 1; i < array.length - 1; i++) {
                array[i][0] = array[i][0].substring(5, array[i][0].length - parseFloat(timescale));
                array[i][0] = array[i][0].replace('-', '/');

            }

            //create an array of unique times
            var uniquetimes = [];
            for (var i = 1; i < data.length; i++) {
                if (!(uniquetimes.includes(array[i][0]))) {
                    if (typeof(array[i][0]) === 'string') {
                        uniquetimes.push(array[i][0]);
                    }
                }
            }
            console.log(uniquetimes);

            //create an array of the number of readings per timescale

            var countarray = [];
            countarray.push(1);
            var counter = 0;
            for (var i = 0; i < uniquetimes.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (uniquetimes[i] == array[j][0]) {
                        counter += 1;
                    }
                }
                countarray.push(counter);
                counter = 0;
            }


            //average readings taken in the same timescale

            //create a cumulative count array for indexing
            var cumulativecountarray = [];
            countarray.reduce(function(a, b, i) { return cumulativecountarray[i] = a + b; }, 0);

            console.log(cumulativecountarray);

            // create empty 2d average array
            var average = new Array(6)
            for (var i = 0; i < uniquetimes.length; i++) {
                average[i] = [];
            }

            for (var i = 0; i < uniquetimes.length; i++) {
                for (var j = 0; j < 6; j++) {
                    average[i][j] = 0;
                }
            }

            //take averages and save them to average database
            for (var i = 0; i < uniquetimes.length; i++) {
                for (var j = cumulativecountarray[i]; j < cumulativecountarray[i + 1]; j++) {
                    for (var k = 1; k < 6; k++) {
                        average[i][k] += parseFloat(array[j][k]);
                        average[i][k] = average[i][k] / countarray[i + 1];
                    }
                }
            }

            for (var i = 0; i < uniquetimes.length; i++) {
                average[i][0] = uniquetimes[i];
            }

            console.log(average);

            //transform averge database into arrays ready for plotting
            var datetime = uniquetimes;
            var angry = [];
            var disgust = [];
            var happy = [];
            var sad = [];
            var surprise = [];

            for (var i = 0; i < uniquetimes.length; i++) {
                angry[i] = average[i][1];
                disgust[i] = average[i][2];
                happy[i] = average[i][3];
                sad[i] = average[i][4];
                surprise[i] = average[i][5];
            }

            console.log("data processed");

            //normalise data
            angry = normalise(angry);
            disgust = normalise(disgust);
            happy = normalise(happy);
            sad = normalise(sad);
            surprise = normalise(surprise);
            console.log("data normalised");

            //choose how much data to show
            datetime = datetime.slice(uniquetimes.length - datapoints, uniquetimes.length);
            angry = angry.slice(uniquetimes.length - datapoints, uniquetimes.length);
            disgust = disgust.slice(uniquetimes.length - datapoints, uniquetimes.length);
            happy = happy.slice(uniquetimes.length - datapoints, uniquetimes.length);
            sad = sad.slice(uniquetimes.length - datapoints, uniquetimes.length);
            surprise = surprise.slice(uniquetimes.length - datapoints, uniquetimes.length);

            // plot chart
            var Chart2 = new Chart(ctx2, {
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
                    scales: {
                        yAxes: [{
                            stacked: false,
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    });
}