/* function getDownloadURL(svg, callback) {
    var canvas;
    var source = svg.parentNode.innerHTML;
    //console.log(source);
    var image = d3.select('body').append('img')
    .style('display', 'block')
    .attr('width', width)
    .attr('height', height)
    .node();
  
    
    image.onload = function() {
        canvas = d3.select('body').append('canvas')
            .style('display', 'none')
            .attr('width', width)
            .attr('height', height)
            .node();
    
        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        var url = canvas.toDataURL('image/png');
    
        //d3.selectAll([ canvas, image ]).remove();
    
        callback(null, url);
    };
    image.src = 'data:image/svg+xml,' + encodeURIComponent(source);
    image.onerror = function() {
        callback(new Error('An error occurred while attempting to load SVG'));
    };
  }
  
  function updateDownloadURL(svg, link) {
    getDownloadURL(svg, function(error, url) {
    if (error) {
        console.error(error);
    } else {
        link.href = url;
    }
    });
  }
 */



/* d3.select('.ff').append('svg').attr('version', 1.1)
    .attr('xmlns', 'http://www.w3.org/2000/svg')    
    .attr('xmlns:xlink',"http://www.w3.org/1999/xlink").attr('width',500+'px').attr('height',500+'px');

const svg2 = d3.select('.ff svg');
svg2.append('circle').attr('r',5);
*/
const chart = (num)=>{

    const height = 600;
    var width = screen.width;
    if(width > 1000)
        width-=20;

    var svg1 = d3.select('.content #svg'+num).attr("viewBox", [0, 0, width, height]);
            /* .attr('version', 1.1)
            .attr('xmlns', 'http://www.w3.org/2000/svg')    
            .attr('xmlns:xlink',"http://www.w3.org/1999/xlink") */    
            /* .style('width', width + 'px')
            .style('height',height+'px'); */

    const svg = svg1.append('g')
            .attr('transform', 'translate(' + [20, 20] + ')') ;
    
       
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
       /*  const color = ()=>{
            const scale = d3.scaleOrdinal(d3.schemeCategory10);
            console.log(scale(d.group))
            return d => scale(d.group);
        } */
        d3.json("/static/json/data.json").then((response)=>{
            const nodes = response.nodes;
            const links = response.links; 
            /* data.links.map(d => links.push(d));
            const nodes = data.nodes.map(d =>d);*/
            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2))
                ;

           /*  const svg = d3.select('.content svg')
                .attr("viewBox", [0, 0, width, height]);*/
            
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
           // console.log(simulation.nodes());
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

}
chart(1);
//chart(1);