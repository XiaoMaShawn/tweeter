/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweetData) {
  tweetData.forEach((tweet) => {
    $('#post-board').append(createTweetElement(tweet));
  })
}

const createTweetElement = (tweet) => {
  const time = timeago.format(`${tweet.created_at}`);
  const result = `
  <section class="all-new-container">
    <header>
      <div><img src="${tweet.user.avatars}">${tweet.user.name}</div>
      <div>${tweet.user.handle}</div>
    </header>

    <article>${escapeStr(tweet.content.text)}</article>

    <footer>
      <span>
        ${time}
      </span>
      <span class="tweet-interaction">
        <i class="fas fa-flag fl"></i>
        <i class="fas fa-retweet rt"></i>
        <i class="fas fa-heart he"></i>
      </span>
    </footer>
  </section>
  `;
  return result;
}

const escapeStr = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(() => {


  $('#submit-form').submit(function(event) {
    event.preventDefault();
    $('#validation-message').empty();
    if (!$('#tweet-text').val().length) {
      const message1 = `
      <p> 
      <i class="fas fa-exclamation-triangle"></i>
      Please Share Something!(can't be empty)</p>
      `;
      $('#validation-message').append(message1);
      $('#validation-message').slideDown('slow');
    } else if ($('#tweet-text').val().length > 140) {
      const message2 = `
      <p> 
      <i class="fas fa-exclamation-triangle"></i>
      Maybe you need to short it a little(under 140)
      </p>
      `;
      $('#validation-message').append(message2);
      $('#validation-message').slideDown('slow');

    } else {
      $('#post-board').empty();
      const newTweet = $(this).serialize();
      $.ajax('/tweets', { data: newTweet, method: 'POST' }).then(function() {
        console.log('successfully send:' + newTweet);
        loadTweets();
      });
      $('#tweet-text').val('');
    }

  })

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' }).then(function(tweetData) {
      renderTweets(tweetData.reverse());
    })
  }
}
)

