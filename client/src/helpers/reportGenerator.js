const dashboardReports = (tweetData, loginData) => {    
    let users = []
    let events = []
    let tweetIds = []
    let tweetContents = []
    let replies = []

    // MOST ACTIVE USER
    for(let login of loginData) {
        let user = login.user.firstName + ' ' + login.user.lastName;
        let userStoredIndex = users.findIndex(userStored => userStored == user);
        if(userStoredIndex == -1) {
            users.push(user);
            events.push(1);
        } else {
            events[userStoredIndex] = events[userStoredIndex] + 1
        }
    }
    for(let tweet of tweetData) {
        let user = tweet.user.firstName + ' ' + tweet.user.lastName;
        let userStoredIndex = users.findIndex(userStored => userStored == user);
        if(userStoredIndex == -1) {
            users.push(user);
            events.push(1);
        } else {
            events[userStoredIndex] = events[userStoredIndex] + 1
        }
    }
    let maxEvent = Math.max.apply(0, events);
    let mostActiveUser = users[events.indexOf(maxEvent)];
    
    // TWEET WITH THE MOST REPLIES
    for(let tweet of tweetData) {
        if(tweet.replyToTweetId == null) {
            tweetIds.push(tweet.id);
            tweetContents.push(tweet.content);
            replies.push(0);
        }
    }
    for(let tweet of tweetData) {
        if(tweet.replyToTweetId != null) {
            let tweetId = tweet.replyToTweetId;
            let tweetStoredIndex = tweetIds.indexOf(tweetId);
            if(tweetStoredIndex != -1) {
                replies[tweetStoredIndex] = replies[tweetStoredIndex] + 1
            }
        }
    }

    let maxReplies = Math.max.apply(0, replies);
    let mostIntrestingTweet = tweetContents[replies.indexOf(maxReplies)];

    // TOTAL USERS
    let totalUsers = users.length;

    return {"mostActiveUser": mostActiveUser, "mostIntrestingTweet": mostIntrestingTweet, "totalUsers": totalUsers}
}

module.exports = { dashboardReports }