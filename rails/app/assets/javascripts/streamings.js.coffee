#= require websocket_rails/main

team_name = location.pathname.split('/').pop()

dispatcher = new WebSocketRails('0.0.0.0:1984/websocket')
channel = dispatcher.subscribe(team_name)
channel.bind 'create', (html) ->
  $(html).prependTo('.queries').hide().fadeIn()
