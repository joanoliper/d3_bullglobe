/*
*    main.js
*    Mastering Data Visualization with D3.js
*    3.7 - D3 min, max, and extent
*/

var margin = { left:100, right:10, top:10, bottom:120 };

var width = 600 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")")

g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 100)
    .attr("font-size","25px")
    .attr("text-anchor", "middle")
    .text("Dale Papito");

g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height / 2))
    .attr("y", -70)
    .attr("font-size","25px")
    .attr("text-anchor", "middle")
    .attr("transform","rotate (-90)")
    .text("Dale Papito");

d3.json("data/revenues.json").then(function(data){
    console.log(data);

    data.forEach(d => {
        d.revenue = +d.revenue;
    });

    var x = d3.scaleBand()
        .domain(data.map(function(d){ return d.month })) // INPUT
        .range([0, width]) // OUTPUT
        .paddingInner(0.2)
        .paddingOuter(0.2);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.revenue;
        })])
        .range([height, 0]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y","10")
            .attr("x","0")
            .attr("text-anchor", "middle");

    var yAxisCall = d3.axisLeft(y)
        .ticks(6)
        .tickFormat(function(d){
            return "$ " + d;
        });
    g.append("g")
        .attr("class","y-axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)
        
    rects.enter()
        .append("rect")
            .attr("y", function(d){return y(d.revenue);})
            .attr("x", function(d){return x(d.month);})
            .attr("width", x.bandwidth)
            .attr("height", function(d){return height - y(d.revenue);})
            .attr("fill", "grey");
}).catch(function(error){
	console.log(error);
});