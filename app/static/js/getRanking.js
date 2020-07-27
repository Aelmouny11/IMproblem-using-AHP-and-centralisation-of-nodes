const objtChart = (xlab,ylab,typechart) =>{
	const obj = {
                        type: typechart,
                        data: {
                            labels: xlab,
                            datasets: [{
                                label: ' Score',
                                data: ylab,
                                backgroundColor: 
                                    'rgba(169, 170, 171)',
                                borderColor: 
                                    'rgba(84, 84, 84)',
                                borderWidth: 1
                            }]
					}
				};
	return obj;
}
var mychart ;
$(function(){
    $('#getR').click(function() {
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
                    $('#contentRank').show()
                    $table.bootstrapTable('refreshOptions', {
                        showColumns: true,
                        search:true,
                        data: response
                    })
                    var xs = response["xs"];
                    var ys = response["ys"];
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
                    $('#contentRank').hide()
                    alert("Make sure your CSV in the right format and make sure to tick the options related to your network (weighted and/or directed graph)")             
                }
            });
        return false;
    });
});

function numtofixed(value) {
    return value.toFixed(3);
}