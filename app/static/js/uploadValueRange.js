
const PM = {1:"1",2:"1",3:"1",4:"1",5:"1",6:"1"};

const sliderR = (number)=>{
    const id_input = "Range"+number;
    const id_output = "valueRange"+number
    var slider = document.getElementById(id_input);
    var output = document.getElementById(id_output);
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
      PM[number]=slider.value;
      console.log(PM[number]);
    }
}
console.log(PM);
$(function() {
    $('#CR').click(function() {
    	var RC=[]
        $.ajax({
                type: "POST",
                url: "/ConsistencyRatio",
                contentType: "application/json",
                data: JSON.stringify(PM),
                dataType: "json",
                success: function(response) {
                    console.log(response);              
                },
                error: function(err) {
                    console.log(err);                }
            });
        console.log(PM)
        return false;
    });
});
sliderR(1);
sliderR(2);
sliderR(3);
sliderR(4);
sliderR(5);
sliderR(6);