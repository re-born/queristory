document.body.onload = function() {
  chrome.storage.sync.get('teams_source_url', function(item) {
    $('#teams_list_source').val(item.teams_source_url)
    reload_teams_list()
  })
  chrome.storage.sync.get('team_info', function(item) {
    $('#team_password').val(item.team_info.team_password)
  })
}

$('#register_team_info').submit(function(){
  event.preventDefault();
  save_team_info_to_storage()
  check_auth()
})

$('#get_teams_list').submit(function(){
  event.preventDefault();
  reload_teams_list()
  save_teams_source_url_to_strage()
})

function save_teams_source_url_to_strage() {
  chrome.storage.sync.set({
    teams_source_url: $('#teams_list_source').val()
  })
}

function save_team_info_to_storage() {
  chrome.storage.sync.set({
    team_info: get_team_info_for_auth()
  })
}

function reload_teams_list() {
  $('#teams_list > option').remove();

  var teams_source_url = $('#teams_list_source').val() + '/teams';
  $.getJSON( teams_source_url, function(teams) {
    $.each(teams, function(i, team_name) {
      $('#teams_list').append($('<option>').html(team_name).val(team_name));
    })

    // focus the team which has already registerd
    chrome.storage.sync.get('team_info', function(item) {
      $('#teams_list').val(item.team_info.team_name)
      if ( $('#team_password').val() != '' ) {
        check_auth() // passが入力されているときに認証確認
      }
    })
  })
}

function check_auth() {
  var auth_url = $('#teams_list_source').val() + '/auth'
  $.getJSON( auth_url, get_team_info_for_auth(), function(res) {
    var message = res ? 'Queristory is now active!' : 'failed';
    $('#auth_success').text(message)
  })
}

function get_team_info_for_auth() {
  return {
    team_name: $('#teams_list').val(),
    team_password: $('#team_password').val(),
    host_url: $('#teams_list_source').val(),
  }
}
