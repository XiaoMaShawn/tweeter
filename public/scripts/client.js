/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// const tweetData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1643639899091
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1643726299091
//   }
// ]

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

    <article>${tweet.content.text}</article>

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

$(document).ready(() => {

  $('#submit-form').submit(function(event) {
    event.preventDefault();
    if ($('#tweet-text').val().length === 0) {
      alert('Please Share Something!')
    } else if ($('#tweet-text').val().length > 140) {
      alert('Maybe you need to short it a little(under 140)')
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

