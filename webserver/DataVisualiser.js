console.log("running")


function parseData(createGraph) {
<<<<<<< HEAD
    Papa.parse("emotion_data.csv", {
        download: true,
        complete: function(results) {
            Graph(results.data);
        }
    });
}

function Graph(data) {
    var datetime = [];
    var angry = ["Angry"];
    var disgust = ["Disgust"];
    var happy = ["Happy"];
    var sad = ["Sad"];
    var surprise = ["Surprise"];
    var maximumpredictedemotion = ["Maxium Predicted Emotion"];
=======
	Papa.parse("emotion_data.csv", {
    download: true,
		complete: function(results) {
         createGraph(results.data);
		}
	});
}

function createGraph(data) {
  var datetime = [];
  var angry = ["Angry"];
  var disgust = ["Disgust"];
  var happy = ["Happy"];
  var sad = ["Sad"];
  var surprise = ["Surprise"];
  var maximumpredictedemotion = ["Maxium Predicted Emotion"];
>>>>>>> parent of dc889c0... change to chart.js

  for (var i = data.length-101; i < data.length-1; i++) {
    datetime.push(data[i][1]);
    angry.push(data[i][2]);
    disgust.push(data[i][3]);
    happy.push(data[i][4]);
    sad.push(data[i][5]);
    surprise.push(data[i][6]);
    maximumpredictedemotion.push(data[i][8])
    console.log(data[i][8]);
  }
  var chart = c3.generate({
       bindto: '#chart',
       data: {
         columns: [
           datetime
         ]
       },
       axis: {
         x: {
           type: 'category',
           categories: angry
         }
       }
   });
}

parseData(createGraph);
