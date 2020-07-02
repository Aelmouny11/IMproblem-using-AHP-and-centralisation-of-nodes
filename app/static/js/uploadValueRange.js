var PM = {};

const sliderR = (number)=>{
    const id_input = "Range"+number;
    const id_output = "valueRange"+number
    var slider = document.getElementById(id_input);
    var output = document.getElementById(id_output);
    var val;
    if (slider.value < 1 ) {
    		val = -1*slider.value+2
    		val = "1/"+val;
    	} 
    	else val = slider.value;

    output.innerHTML = val;

    slider.oninput = function() {
    	var val ;
    	if (this.value < 1 ) {
    		val = -1*this.value+2
    		val = "1/"+val;
    	} 
    	else val = this.value;

      	output.innerHTML = val;
    }
}

$(function() {
    $('#CR').click(function() {
    	for (var i = 1; i <=6; i++) {
			var id = 'Range'+i;
    		PM[i]=+document.getElementById(id).value;
    	}
        $.ajax({
                type: "POST",
                url: "/ConsistencyRatio",
                contentType: "application/json",
                data: JSON.stringify(PM),
                dataType: "json",
                success: function(response) {
                    // console.log(response["CR"] );
                    $('#valueCR').html(response["CR"]);  
                    if(response["CR"] >= 0.1 ){
                    	$('#valueCR').css("color","red")
                        alldone.CR=false;
                        $('#btngetR').hide()
                    }
                    else{
                     	$('#valueCR').css("color","green")
                        alldone.CR=true;
                        if (alldone.file * alldone.CR) {
                            $('#btngetR').show()
                        }
                    }

                },
                error: function(err) {
                	// console.log("err")
                    console.log(err);  
                    alldone.CR=false;
                    $('#btngetR').hide()             
                }
            });
        return false;
    });
});
sliderR(1);
sliderR(2);
sliderR(3);
sliderR(4);
sliderR(5);
sliderR(6);