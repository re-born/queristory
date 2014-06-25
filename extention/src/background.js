const SESSION_INTERVAL = 1800000
var last_query = ''
var latest_session_date = new Date()
var session_id = generate_session_id()

function post_query(query) {
  if (new Date() - latest_session_date > SESSION_INTERVAL) {
    session_id = generate_session_id()
  }
  query = query + '&session_id=' + session_id
  if(query != last_query){
    $.ajax({
      url: 'http://0.0.0.0:1984/query/create',
      type: 'post',
      data: query, // => 'q=hoge&safe=off&...&session_id=30e108d2...'
    })
  }
  last_query = query
  latest_session_date = new Date()
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    parsed_url = parseUrl(tab.url)
    hostname_condition = parsed_url.hostname == 'www.google.co.jp'
                      || parsed_url.hostname == 'www.google.com'
    pathname_condition = parsed_url.pathname == '/search'
                      || parsed_url.pathname == '/webhp'

    if (hostname_condition && pathname_condition){
      if (parsed_url.hash == '') {
        post_query(parsed_url.search.slice(1))
      } else {
        post_query(parsed_url.hash.slice(1))
      }
    }
  }
})