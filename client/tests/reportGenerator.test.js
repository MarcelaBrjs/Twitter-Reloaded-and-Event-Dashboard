const { dashboardReports } = require('../src/helpers/reportGenerator');

test('dashboard report returns correct statistics', () => {
    tweetData = [
        {
            "id": 3,
            "content": "This is not my first tweet!",
            "replyToTweetId": null,
            "userId": 1,
            "statusDelete": false,
            "createdAt": "2022-12-02T02:59:23.538Z",
            "user": {
                "firstName": "Marcela",
                "lastName": "Barajas"
            }
        },
        {
            "id": 2,
            "content": "And this is my first comment!",
            "replyToTweetId": 1,
            "userId": 2,
            "statusDelete": false,
            "createdAt": "2022-12-02T02:58:28.037Z",
            "user": {
                "firstName": "John",
                "lastName": "Doe"
            }
        },
        {
            "id": 4,
            "content": "Hello John!",
            "replyToTweetId": 1,
            "userId": 1,
            "statusDelete": false,
            "createdAt": "2022-12-02T02:59:36.050Z",
            "user": {
                "firstName": "Marcela",
                "lastName": "Barajas"
            }
        },
        {
            "id": 1,
            "content": "This is my first tweet!",
            "replyToTweetId": null,
            "userId": 2,
            "statusDelete": false,
            "createdAt": "2022-12-02T02:58:15.262Z",
            "user": {
                "firstName": "John",
                "lastName": "Doe"
            }
        }
    ]
    loginData = [
        {
            "userId": 1,
            "createdAt": "2022-12-02T07:20:05.249Z",
            "user": {
                "firstName": "Marcela",
                "lastName": "Barajas"
            }
        },
        {
            "userId": 2,
            "createdAt": "2022-12-02T06:27:01.285Z",
            "user": {
                "firstName": "John",
                "lastName": "Doe"
            }
        },
        {
            "userId": 1,
            "createdAt": "2022-12-02T06:25:46.433Z",
            "user": {
                "firstName": "Marcela",
                "lastName": "Barajas"
            }
        }
    ]

    expect(dashboardReports(tweetData, loginData)).toEqual({
        mostActiveUser: 'Marcela Barajas',
        mostIntrestingTweet: 'This is my first tweet!',
        totalUsers: 2
      });
});