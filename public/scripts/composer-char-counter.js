$(document).ready(function() {
  console.log('test the jQuery')


  $('#tweet-text').keyup(function() {
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

