chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.text && (msg.text == 'posting_start')) {
      $("<div id='quiche_posting_animation'>Quiche is baking...</div>").hide().prependTo('body').slideDown();
    }
    else if (msg.text && (msg.text == 'posting_end')) {
      $('#quiche_posting_animation').text('Quiche has baked!')
    }
    else if (msg.text && (msg.text == 'already_posted')) {
      $('#quiche_posting_animation').text('Your Quiche has also baked!')
    }
    else if (msg.text && (msg.text == 'posting_error')) {
      $('#quiche_posting_animation').text('Quiche error')
    }
});
