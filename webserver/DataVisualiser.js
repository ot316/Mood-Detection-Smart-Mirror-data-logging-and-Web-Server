console.log("running")


function parseData(createGraph) {
	Papa.parse("emotion_data.csv", {
    download: true,
		complete: function(results) {
			   console.log(results.data);
         createGraph(results.data);
		}
	});
}

function createGraph(data) {
  var time = [];
  var emotions = [];

  for (var i = 0; i < data/length; i++) {
    console.log(data[i]);
  }
  var chart = c3.generate({
      bindto: '#chart',
  })
}

parseData(createGraph);
