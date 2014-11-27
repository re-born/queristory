const SESSION_INTERVAL = 10 * 60 * 1000
var last_query = ''
var latest_session_date = new Date()
var session_id = generate_session_id()

function post_query(query, session_id, auth_info) {
  if(query != last_query){
    post_with_ajax(query, session_id, auth_info, 'query')
  }
  last_query = query
}

function post_page(page, session_id, auth_info) {
  post_with_ajax(page, session_id, auth_info, 'page')
}

function post_with_ajax(data, session_id, auth_info, query_or_page) {
  $.ajax({
    url: auth_info.host_url + '/' + query_or_page + '/create',
    type: 'post',
    data: format(data, session_id, auth_info),
  })
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
      var query = extract_query_from(parsed_url)
      post_query_with_auth(query)
    }
  }
})

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.command == 'post_page') {
      post_page_with_auth(request.data)
    }
  }
)

function post_query_with_auth(query_data) {
  chrome.storage.sync.get('team_info', function(item) {
    post_query(query_data, check_session_id(), get_auth_info(item))
  })
}

function post_page_with_auth(page_data) {
  chrome.storage.sync.get('team_info', function(item) {
    post_page(page_data, check_session_id(), get_auth_info(item))
  })
}

function get_auth_info(item) {
  return { team_name: item.team_info.team_name,
       team_password: item.team_info.team_password,
            host_url: item.team_info.host_url }
}

