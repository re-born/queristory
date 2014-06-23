var last_query = ''
var latest_session_date = new Date()

function parseUrl( url ) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

function post_query(query) {
  console.log('query:' + query)
  console.log('last_query:' + query)
  console.log('new Date():' + new Date())
  console.log('latest_session_date:' + latest_session_date)
  console.log('diff:' + (new Date() - latest_session_date))
  if (new Date() - latest_session_date > 30000000) {
    session_id = generate_session_id()
  }
  query = query + '&session_id=' + session_id
  if(query != last_query){
    $.ajax({
      url: 'http://0.0.0.0:1984/query/create',
      type: 'post',
      data: query, // => 'q=hoge&safe=off&...&session_id=30e108d2...'
    })
    console.log('posted:' + query)
  }
  last_query = query
  latest_session_date = new Date()
}

var generate_session_id = (function() {
  function random_id() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return random_id() + random_id() + '-' + random_id() + '-' + random_id() + '-' +
           random_id() + '-' + random_id() + random_id() + random_id();
  };
})();

var session_id = generate_session_id()

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
        console.log('hash: '+parsed_url.hash)
        post_query(parsed_url.hash.slice(1))
      }
    }
  }
})