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

function parseUrl( url ) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}

function format(query_or_page, session_id, auth_info) {
  query_or_page += '&session_id=' + session_id
  query_or_page += '&team_name=' + auth_info.team_name
  query_or_page += '&team_password=' + auth_info.team_password
  return query_or_page
}

function extract_query_from(url) {
  return url.hash == '' ? url.search.slice(1)
                        : url.hash.slice(1)
}
