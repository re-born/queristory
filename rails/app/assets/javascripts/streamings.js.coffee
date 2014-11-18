#= require websocket_rails/main

dispatcher = new WebSocketRails('0.0.0.0:1984/websocket')
channel = dispatcher.subscribe('streaming')
channel.bind 'create', (html) ->
  $(html).prependTo('.queries').hide().fadeIn()
