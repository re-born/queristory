chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

})

function add_binding_to_page() {
  $.each($('.g h3 a[onmousedown]'), function(i, dom) {
    $(this).click(function () {
      var clicked_url = this.attributes['data-href'].value
      var parsed_url = document.createElement('a')
      parsed_url.href = location.href
      if (parsed_url.hash == '') {
        var query = parsed_url.search.slice(1)
      } else {
        var query = parsed_url.hash.slice(1)
      }
      var page_data = query + '&url=' + clicked_url + '&rank=' + i
      $.ajax({
        url: 'http://0.0.0.0:1984/page/create',
        type: 'post',
        data: page_data,
      })
    })
  })
}

add_binding_to_page()

// for ajax
var timeout = null;
document.addEventListener("DOMSubtreeModified", function() {
  if(timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(add_binding_to_page, 500)
}, false)
