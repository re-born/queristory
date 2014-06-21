last_query = ''

function parseUrl( url ) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

function post_query(query) {
  console.log('query:' + query)
  console.log('last_query:' + query)
  if(query != last_query){
    $.ajax({
      url: 'http://0.0.0.0:1984/query/create',
      type: 'post',
      data: query, // => {'?q': 'hoge', ...}
    })
    console.log('posted:' + query)
  }
  last_query = query
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
        console.log('hash: '+parsed_url.hash)
        post_query(parsed_url.hash.slice(1))
      }
    }
  }
})