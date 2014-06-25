const SESSION_INTERVAL = 1800000
var last_query = ''
var latest_session_date = new Date()
var session_id = generate_session_id()

function post_query(query, session_id) {
  if(query != last_query){
    $.ajax({
      url: 'http://0.0.0.0:1984/query/create',
      type: 'post',
      data: {
        query: query,
        session_id: session_id,
      }
    })
  }
  last_query = query
}

function check_session_id() {
  if (new Date() - latest_session_date > SESSION_INTERVAL) {
    session_id = generate_session_id()
  }
  latest_session_date = new Date()
  return session_id
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
        post_query(parsed_url.search.slice(1), check_session_id())
      } else {
        post_query(parsed_url.hash.slice(1), check_session_id())
      }
    }
  }
})