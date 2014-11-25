document.body.onload = function() {
  chrome.storage.sync.get('teams_source_url', function(item) {
    $('#teams_list_source').val(item.teams_source_url)
    get_teams_list()
  })
  chrome.storage.sync.get('team_info', function(item) {
    $('#team_password').val(item.team_info.team_password)
  })
}

$('#team_info').submit(function(){
  event.preventDefault();
  set_team_info()
  check_auth()
})

$('#get_teams_list').submit(function(){
  event.preventDefault();
  get_teams_list()
  set_teams_source_url()
})

function set_teams_source_url() {
  chrome.storage.sync.set({
    teams_source_url: $('#teams_list_source').val()
  })
}

function set_team_info() {
  chrome.storage.sync.set({
    team_info: {
      team_name: $('#teams_list').val(),
      team_password: $('#team_password').val(),
    }
  })
}

function get_teams_list() {
  $('#teams_list > option').remove();
  $.ajax({
    url: $('#teams_list_source').val() + '/teams',
    type: 'get',
    headers: {
      'X-HTTP-Method-Override': 'get',
      'Content-Type': 'application/json'
    },
    dataType: 'json'
  }).done(function(res) {
    $.each(res, function(i, team_name) {
      $('#teams_list').append($('<option>').html(team_name).val(team_name));
    })
    chrome.storage.sync.get('team_info', function(item) {
      $('#teams_list').val(item.team_info.team_name)
    })
    if ( $('#team_password').val() != '' ) {
      check_auth() // passが入力されているときに認証確認
    }
  })
}

function check_auth() {
  var team_info_for_auth = {
    team_name: $('#teams_list').val(),
    team_password: $('#team_password').val(),
  }
  $.ajax({
    url: $('#teams_list_source').val() + '/auth',
    type: 'get',
    headers: {
      'X-HTTP-Method-Override': 'get',
      'Content-Type': 'application/json'
    },
    dataType: 'json',
    data: team_info_for_auth,
  }).done(function(res) {
    if (res)
      $('#auth_success').text('Queristory is now active!!')
    else
      $('#auth_success').text('something went wrong...')
  })
}
