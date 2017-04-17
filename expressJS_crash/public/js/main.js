$(document).ready(function() {
  $('.deleteUser').on('click',function(){
    var confirmation = confirm('Are You Sure?');
    console.log($(this).data('id'));
    const dataId = $(this).data('id');
    if(confirmation) {
      $.ajax({
        type: 'DELETE',
        url: '/users/delete/' + dataId,
      }).done(function(res){
        window.location.replace('/');
      });
    } else {
      return false;
    }
  })
});