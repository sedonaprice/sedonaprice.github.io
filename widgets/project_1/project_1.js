
/* implementation heavily influenced by http://bl.ocks.org/1166403 */

// define dimensions of graph
var m = [80, 80, 80, 80]; // margins
var w = 400 - m[1] - m[3]; // width
var h = 400 - m[0] - m[2]; // height

// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)

        

//var datax = [0,1,2,3,4,5,6,7,8,9,10];
var datax = []

var Sdata = []
var angle = Math.PI/4.
var slope = Math.tan(angle)
var dline;

var nPlotPoints = 10

var xrange = [0,10]
var yrange = [0,10]

// X scale will fit all values from data[] within pixels 0-w
var x = d3.scale.linear().domain(xrange).range([0, w]);
// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
var y = d3.scale.linear().domain(yrange).range([h, 0]);
    // automatically determining max range can work something like this
    // var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);


// create a line function that can convert data[] into x and y points
var line = d3.svg.line()
    // assign the X function to plot our line as we wish
    .x(function(d) {
        // return the X coordinate where we want to plot this datapoint
        return x(d[0]); 
    })
    .y(function(d) { 
        // return the Y coordinate where we want to plot this datapoint
        return y(d[1]); 
    })

// create yAxis
var xAxis = d3.svg.axis().scale(x).ticks(4).orient('bottom').tickSubdivide(true);
// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left").tickSubdivide(true);

var graph

$(function() {
    $("#angle-range").slider({
        orientation: "horizontal", 
        range: "min", 
        min: 0., 
        max: Math.PI/2., 
        step: 0.05, 
        value: angle,
        slide: function(event, ui) {
            $("#angle-range").val("" + ui.value);
            $("#angle").val("" + ui.value);
            slope = Math.tan(ui.value)
            if (Math.abs(ui.value - Math.PI/2.) < 0.05) {
                            slope = -99.
                        }
            //console.log("value="+slope)
            update();
        }
    });
    $("#angle-range").val(+$("#angle-range").slider("values"));
    $("#angle").val("" + angle)
    $("#slope").val("" + slope)
});


function simple_script() {
    // Add an SVG element with the desired dimensions and margin.
    graph = d3.select("#graph").append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
          .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
          


    // Add the x-axis.
    graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis);

    // Add the y-axis to the left
    graph.append("svg:g")
          .attr("class", "y axis")
          .attr("transform", "translate(0,0)")
          .call(yAxisLeft);
          
    graph.append("clipPath")
        .attr("id", "circle1")
        .append("circle")
        .attr("cx", 0)
        .attr("cy", h)
        .attr("r", h)
        
    graph.append("clipPath")
        .attr("id", "boxaxis")
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h);
        //.attr("transform", "translate(" + m[3] + "," + m[0] + ")");
        
    graph.append("svg:g")
        .attr("class", "circleline")
        .append("circle")
        .attr("cx", 0)
        .attr("cy", h)
        .attr("r", h)
        .attr("stroke-dasharray", ("10,10"))
        .attr("clip-path", "url(#boxaxis)");
        
};

function update() {
        if (Sdata) {
            Sdata = []
            datax = []
        }
        if (dline) {
            dline.remove()
        }
        
        
        datax = new Array(nPlotPoints)
        
        // Make this more sophisticated so you don't have to have a bounding circle to 
        //      enforce a constant radius???
        
        for (var i = 0; i < datax.length; i++) {
            //if slope*datax[i] <= h
            datax[i] = i * (xrange[1]-xrange[0])/(datax.length-1)
            if (slope != -99.) {
                Sdata.push( [datax[i], slope*datax[i]] )
            } else {
                Sdata.push( [0, datax[i]] )
            }
            
        }
        
        // Add the line by appending an svg:path element with the data line we created above
        // do this AFTER the axes above so that the line is above the tick-lines
        dline = graph.append("svg:path").data([Sdata]).attr("d", line)
                .attr("class", "plotline")
                .attr("clip-path", "url(#circle1)");
            
};
