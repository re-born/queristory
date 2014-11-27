var latest_url = ''

function add_binding_to_page() {
  $.each($('.g h3 a[onmousedown]'), function(i, dom) {
    $(this).click(function () {
      var clicked_url = this.attributes['data-href'].value
      var clicked_title = this.text
      var parsed_url = parseUrl(location.href)

      if(clicked_url != latest_url){
        var page_data = extract_query_from(parsed_url)
                      + '&url=' + clicked_url
                      + '&title=' + encodeURIComponent(clicked_title)
                      + '&rank=' + i
        chrome.extension.sendRequest({command: 'post_page',
                                         data: page_data })
        latest_url = clicked_url
      }
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
