var fileInput = document.getElementById('user_group_logo');
const button = document.getElementById('uploadFile');
var fullPath ;
const file = fileInput.files[0];
fileInput.onchange = function(e){
    

    fullPath = fileInput.value;
    console.log(fullPath)
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        $('#user_group_label').text(filename);
    }
};
$(function() {
    $('#uploadFileBtn').click(function() {
      if(fullPath){
        var form_data = new FormData($('#uploadFile')[0]);
        $.ajax({
            type: 'POST',
            url: '/uploadfile',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                console.log('Success!');
            }
        });
        return false;
      }else{alert("No file selected !!");return false;}
    });
});