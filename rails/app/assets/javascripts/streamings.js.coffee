#= require websocket_rails/main

team_name = location.pathname.match(/([^\/]*)\/*$/)[1]

dispatcher = new WebSocketRails("#{location.host}/websocket")
channel = dispatcher.subscribe(team_name)
channel.bind 'create', (html) ->
  $(html).prependTo('.queries').hide().fadeIn()
