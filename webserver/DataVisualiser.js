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
  var time = [];
  var emotions = [];

  for (var i = 1; i < data/length; i++) {
    console.log(data[i][1]);
  }
  // var chart = c3.generate({
  //     bindto: '#chart',
  // })
}

parseData(createGraph);
