var latest_url = ''

function add_binding_to_page() {
  $.each($('.g h3 a[onmousedown]'), function(i, dom) {
    $(this).click(function () {
      var clicked_url = this.attributes['data-href'].value
      var clicked_title = this.text
      var parsed_url = document.createElement('a')
      parsed_url.href = location.href
      if (parsed_url.hash == '') {
        var query = parsed_url.search.slice(1)
      } else {
        var query = parsed_url.hash.slice(1)
      }
      chrome.extension.sendRequest({greeting: 'get_session_id'}, function(response) {
        var session_id = response.session_id
        var page_data = query
                      + '&url=' + clicked_url
                      + '&title=' + encodeURIComponent(clicked_title)
                      + '&rank=' + i
                      + '&session_id=' + session_id
        if(clicked_url != latest_url){
          $.ajax({
            url: 'http://0.0.0.0:1984/page/create',
            type: 'post',
            data: page_data,
          })
          latest_url = clicked_url
        }
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
