$(document).ready(function() {

  $('#tweet-text').on('input', function() {
    let num = this.value.length;
    $('.counter').html(function() {
      let result = 140 - num;
      if (result < 0) {
        $('.counter').addClass('turnRed');
      } else {
        $('.counter').removeClass('turnRed');
      }
      return result;
    })
  })

})

