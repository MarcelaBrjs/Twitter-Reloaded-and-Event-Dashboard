const { Tweet } = require("../src/entities/tweet");

test('build tweet and return json', () => {
    let tweet = new Tweet.Builder()
            .setContent("This is a tweet!")
            .setReplyToTweetId(1)
            .setUserId(1)
            .withStatusDeleteFalse()
            .build();

    expect(tweet.toJSON()).toEqual({
        "content": "This is a tweet!",
        "replyToTweetId": 1,
        "userId": 1,
        "statusDelete": false
    });
});