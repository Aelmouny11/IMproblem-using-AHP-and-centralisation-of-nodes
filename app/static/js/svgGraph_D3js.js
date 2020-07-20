const height = 600;
var width = screen.width;
if(width > 1000)
width-=20;
var svg = d3.select('.content').append('svg')
            .attr("viewBox", [0, 0, width, height])
            .attr("style","position: absolute;")
            .append('g').attr('transform', 'translate(' + [20, 20] + ')') ;

const drag = simulation => {
      
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
                
    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
                
    return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
}
const scale = d3.scaleOrdinal(d3.schemeCategory10);
d3.json("/static/json/data.json").then((response)=>{
    const nodes = response.nodes;
    const links = response.links; 
    // console.log(links)
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2))
    ;

    const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

    ;

    const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("fill",d=>scale(d.group)) 
    .call(drag(simulation));



    node.append("title")
    .text(d => d.id);
    simulation.on("tick", () => {
        link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

        node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });
            //updateDownloadURL(svg1.node(), document.getElementById('download'));
});
   


/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////     
const graphchart = (file,xs,ys)=>{
    // var width = screen.width, height = 500;

    // if(width > 1000)
    //     width-=20

    const color = d3.scaleSequential(d3.interpolateRdYlBu).domain(d3.extent(ys));
    const reduis = d3.scaleLinear().domain(d3.extent(ys)).range([3,9]);

    d3.select('#GraphRank svg').remove();
    var svg = d3.select("#GraphRank").append('svg')
        .attr("viewBox", [0, 0, width, height]);

    d3.csv(file).then(links=>{
        var nodesByName = {};

          // Create nodes for each unique source and target.
        links.forEach(link=>{
            link.source = nodeByName(link.source);
            link.target = nodeByName(link.target);
        });

        // Extract the array of nodes .
        const nodes = d3.values(nodesByName);
        const simulation = d3.forceSimulation(nodes)
                            .force("link", d3.forceLink(links).id(d => d.name))
                            .force("charge", d3.forceManyBody())
                            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg.append("g")
                        .attr("stroke", "#999")
                        .attr("stroke-opacity", 0.6)
                        .selectAll("line")
                        .data(links)
                        .enter()
                        .append("line")
                        //.attr("stroke-width", d => Math.sqrt(d.value))
                        ;
        const node = svg.append("g")
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 1.5)
                        .selectAll("circle")
                        .data(nodes)
                        .enter()
                        .append("circle")
                        .attr("r", d=>reduis(ys[xs.indexOf(d.name)]))
                        .attr("fill",d=>color(ys[xs.indexOf(d.name)])) 
                        .call(drag(simulation));

        node.append("title").text(d => d.name);
        simulation.on("tick", () => {
            link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

            node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        });
        // Start the force layout.
        function nodeByName(name) {
            return nodesByName[name] || (nodesByName[name] = {name: name});
        }
    });
}