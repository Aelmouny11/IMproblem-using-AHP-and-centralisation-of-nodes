const objtChart = (xlab,ylab,typechart) =>{
	const obj = {
                        type: typechart,
                        data: {
                            labels: xlab,
                            datasets: [{
                                label: '# of Votes',
                                data: ylab,
                                backgroundColor: 
                                    'rgba(255, 99, 132, 0.2)',
                                borderColor: 
                                    'rgba(255, 99, 132, 1)',
                                borderWidth: 1
                            }]
					}
				};
	return obj;
}
var mychart ;
$(function(){
    $('#getR').click(function() {
        $('#contentRank').show()
        const inf = {}
        inf[1]=document.getElementById('DiGraph').checked
        inf[2]=document.getElementById('weighted').checked
        $.ajax({
                type: "POST",
                url: "/DoIt",
                contentType: "application/json",
                data:JSON.stringify(inf),
                dataType: "json",
                success: function(response) {
                    console.log(response)
                    $table.bootstrapTable('refreshOptions', {
                        showColumns: true,
                        search:true,
                        data: response
                    })
                    var xs = [];
                    var ys = [];
                    for (const property in response["rows"]) {
                        if (response["rows"][property]["name"]!="source"&&response["rows"][property]["name"]!="target") {
                           xs.push(response["rows"][property]["name"]);
                           ys.push(response["rows"][property]["score"]);
                        }  
					}
                    d3.select('#Ranking_Chart').remove();
                    d3.select('.Ranking').append('canvas').attr('id','Ranking_Chart').attr('height',"120px");
                    var ctx = document.getElementById('Ranking_Chart').getContext('2d');
			        mychart = new Chart(ctx,objtChart(xs,ys,'bar'));
                    const cookies = document.cookie.split(";").map(d=>d.split("="));
                    var secretKey = cookies.filter(d=>d[0]=='CNA_AHP_Key');
                    const namefile = "/static/Data/" +secretKey[0][1]+ ".csv";
                    graphchart(namefile,xs,ys);
                },
                error: function(err) {
                    console.log(err);                
                }
            });
        return false;
    });
});