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

function format_query(query, session_id, auth_info) {
  query += '&session_id=' + session_id
  query += '&team_name=' + auth_info.team_name
  query += '&team_password=' + auth_info.team_password
  return query
}
