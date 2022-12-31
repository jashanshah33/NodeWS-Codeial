console.log('working');

let dropDown = false
$('#dropDown_icon').click(function(){
    dropDown = !dropDown;
    // console.log($('#dropDown_icon > i')[0].outerHTML);
    // $('#dropDown_icon > i')[0].html('<i class="fa-solid fa-xmark"></i>')
    if (dropDown) {
        $('#dropDown_icon > i')[0].outerHTML = '<i class="fa-solid fa-xmark"></i>'
        $('#list_container').css('display', 'flex');
   
    }else{
        $('#dropDown_icon > i')[0].outerHTML = '<i class="fa-solid fa-bars"></i>'
        $('#list_container').css('display', 'none');

    }

console.log(dropDown);
})