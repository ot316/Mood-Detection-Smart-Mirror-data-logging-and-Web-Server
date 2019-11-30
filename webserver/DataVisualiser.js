console.log("running")
function parseData(createGraph) {
	Papa.parse("emotion_data.csv", {
		complete: function(results) {
			console.log(results.data);
      createGraph(results.data);
		}
	});
}
