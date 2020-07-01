var fileInput = document.getElementById('user_group_logo');
const button = document.getElementById('uploadFile');
var fullPath ;

fileInput.onchange = function(e){
    fullPath = fileInput.value;
    if (fullPath) {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
        }
        $('#user_group_label').text(filename);
        $('#uploadFileBtn').show()
        $('#fileDone').hide()
    }
};
$(function() {
    $('#uploadFileBtn').click(function() {
        if(fullPath){
            $('#svgwait').show();
            var form_data = new FormData($('#uploadFile')[0]);
            $.ajax({
                type: 'POST',
                url: '/uploadfile',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function(data) {
                    if(+data){
                        $('#svgwait').hide()
                        $('#fileDone').show()
                        $('#uploadFileBtn').hide()
                    }
                    else console.log("nothing");
                }
            });
        }return false;
    });
});