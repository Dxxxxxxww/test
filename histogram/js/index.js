$(function() {
  $(".bars li .bar").each( function() {
    let percentage = Math.trunc($(this).data('percentage')  * 100 / 300);
    console.log(percentage);
    $(this).animate({
      'width' : percentage + '%'
    }, 1000);
  });
});