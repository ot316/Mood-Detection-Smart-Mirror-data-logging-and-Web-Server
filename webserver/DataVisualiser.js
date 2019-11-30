console.log("running")
var chart = new Chart('chart', {
  type: 'horizontalBar',
  data: {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        data: [10, 20, 30]
      }
    ]
  }
});

d3.csv('emotion_data.csv')
  .then(makeChart);

function makeChart(players) {
  // players is an array of objects where each object represents a player
}
