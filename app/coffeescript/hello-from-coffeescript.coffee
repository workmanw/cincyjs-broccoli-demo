sayHello = () ->
  $('body').append '<span>Hello from Coffescript!</span></br>'

$(document).ready sayHello
