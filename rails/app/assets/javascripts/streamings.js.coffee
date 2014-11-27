#= require websocket_rails/main

team_name = location.pathname.match(/([^\/]*)\/*$/)[1]

dispatcher = new WebSocketRails("#{location.host}/websocket")
channel = dispatcher.subscribe(team_name)
channel.bind 'query', (html) ->
  $(html).prependTo('.queries').hide().fadeIn()
channel.bind 'page', (data) ->
  $(data.html).appendTo("#item_#{data.query_id} .content").hide().fadeIn()
