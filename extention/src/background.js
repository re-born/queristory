const SESSION_INTERVAL = 10 * 60 * 1000
var last_query = ''
var latest_session_date = new Date()
var session_id = generate_session_id()

function post_query(query, session_id, auth_info) {
  query = query + '&session_id=' + session_id
  query = query + '&team_name=' + auth_info.team_name
  query = query + '&team_password=' + auth_info.team_password
  if(query != last_query){
    $.ajax({
      url: 'http://0.0.0.0:1984/query/create',
      type: 'post',
      data: query, // => 'q=hoge&safe=off&...&session_id=30e108d2...'
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
    var parsed_url = parseUrl(tab.url)
    hostname_condition = parsed_url.hostname == 'www.google.co.jp'
                      || parsed_url.hostname == 'www.google.com'
    pathname_condition = parsed_url.pathname == '/search'
                      || parsed_url.pathname == '/webhp'

    if (hostname_condition && pathname_condition){
      post_query_with_auth(parsed_url)
    }
  }
})

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == 'get_session_id')
      sendResponse({session_id: session_id})
    else
      sendResponse({}) // snub them.
  }
)

function post_query_with_auth(parsed_url) {
  chrome.storage.sync.get('team_info', function(item) {
    var auth_info = { team_name: item.team_info.team_name,
                  team_password: item.team_info.team_password }

    var query = parsed_url.hash == '' ? parsed_url.search.slice(1)
                                      : parsed_url.hash.slice(1)
    post_query(query, check_session_id(), auth_info)
  })
}
