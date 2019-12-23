d3.text("emotion_data.csv", function(data) {
    var parsedCSV = d3.csv.parseRows(data);

    var container = d3.select("tablediv")
        .append("table")

    .selectAll("tr")
        .data(parsedCSV).enter()
        .append("tr")

    .selectAll("td")
        .data(function(d) {
            return d;
        }).enter()
        .append("td")
        .text(function(d) {
            return d;
        });
});