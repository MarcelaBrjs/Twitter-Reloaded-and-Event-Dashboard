class EventDate {
    constructor(date) {
        this.date = new Date(date);
    };

    getDate() {
      return this.date;
    };
}

class EventDateDecorator {
    constructor(date) {
        this.date = new Date(date.date);
    }
    getDate() {
        return this.date;
    }
}

class TimestampEventDateDecorator extends EventDateDecorator {
    getDate() {
        return this.date.toLocaleString('en-US');
    }
}

class HeaderDateDecorator extends EventDateDecorator {
    getDate() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return this.date.toLocaleString('en-US', options);
    }
}

const loginDateFormatter = (loginData) => {
    for(let login of loginData) {
        let date = new EventDate(login.createdAt);
        let formattedDate = new TimestampEventDateDecorator(date);
        login.createdAt = formattedDate.getDate()
    }
    return loginData
};

const tweetDateFormatter = (tweetData) => {
    for(let tweet of tweetData) {
        let date = new EventDate(tweet.createdAt);
        let formattedDate = new TimestampEventDateDecorator(date);
        tweet.createdAt = formattedDate.getDate()
        if (tweet.replies) {
            for(let reply of tweet.replies) {
                let date = new EventDate(reply.createdAt);
                let formattedDate = new TimestampEventDateDecorator(date);
                reply.createdAt = formattedDate.getDate()
            }
        }
    }
    return tweetData
};

const headerDateFormater = (date) => {
    let eventDate = new EventDate(date);
    let formattedDate = new HeaderDateDecorator(eventDate);
    return {"date": formattedDate.getDate()}
};

module.exports = { loginDateFormatter, tweetDateFormatter, headerDateFormater }

