console.log("running")


function parseData(createGraph) {
	Papa.parse("emotion_data.csv", {
    download: true,
		complete: function(results) {
         createGraph(results.data);
		}
	});
}

function createGraph(data) {
  var datetime = [];
  var angry = [];
  var disgust = [];
  var happy = [];
  var sad = [];
  var surprise = [];
  var maximumpredictedemotion = [];

  for (var i = data.length-100; i < data.length; i++) {
    datetime.push(data[i][1]);
    angry.push(data[i][2]);
    disgust.push(data[i][3]);
    happy.push(data[i][4]);
    sad.push(data[i][5]);
    surprise.push(data[i][6]);
    maximumpredictedemotion.push(data[i][8])
    console.log(data[i][8]);
  }
  // var chart = c3.generate({
  //     bindto: '#chart',
  // })
}

parseData(createGraph);
