const sliderR = (number)=>{
    const id_input = "Range"+number;
    const id_output = "valueRange"+number
    var slider = document.getElementById(id_input);
    var output = document.getElementById(id_output);
    output.innerHTML = slider.value;

    slider.oninput = function() {
      output.innerHTML = this.value;
    }
}
 sliderR(1);
 sliderR(2);
 sliderR(3);
 sliderR(4);
 sliderR(5);
 sliderR(6);