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
$(function() {
    $('#getR').click(function() {
        $.ajax({
                type: "GET",
                url: "/DoIt",
                success: function(response) {
                    // console.log(response );
                    var xs = [];
                    var ys = [];
                    for (const property in response) {
					  xs.push(property);
					  ys.push(response[property]);
					}
                    var ctx = document.getElementById('Ranking_Chart').getContext('2d');
			        mychart = new Chart(ctx,objtChart(xs,ys,'bar'));
			        
                },
                error: function(err) {
                    // console.log("err")
                    console.log(err);                
                }
            });
        return false;
    });
});


