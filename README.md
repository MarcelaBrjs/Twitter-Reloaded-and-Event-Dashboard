# Twitter-Reloaded-and-Event-Dashboard
Final project for the course "TC3049. Software Design and Architecture", centered around the development of the app Twitter Reloaded and Event Dashboard.

## How do you run the project?
### Locally
#### Twitter-Reloaded-and-Event-Dashboard: API
1. At the root of the project:

    >cd api
 
2. Within the api folder:

    >npm install
    >npm run dev

#### Twitter-Reloaded-and-Event-Dashboard: Client

1. At the root of the project:

    >cd api
 
2. Within the client folder:

    >npm install
    >npm run dev

## SOLID Practices and Design Patterns
### The Single Responsibility Principle
Example. Each function serves a separate and individual purpose. getTweets is used for TwitterReloaded, getDailyTweets is used for the Event Dashboard. Therefore, they do not affect each other.

https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/api/src/services/tweetServicesDB.js#L9-L67

### The Open-Closed Principle
Example. New formats for the Event Date class can be added without modifying the existing types.

https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/client/src/helpers/dateFormatter.js#L1-L31

### The Liskov Substitution Principle
Example. Subclasses are substitutable.

https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/client/src/helpers/dateFormatter.js#L11-L31

### The Dependency Inversion Principle
Example. The generateAccessToken function does not depend on the type of user or login method.

https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/api/src/middleware/auth.js#L17-L21

### Builder Pattern

#### Tweet Builder
https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/api/src/entities/tweet.js#L1-L48

#### User Builder
https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/api/src/entities/user.js#L1-L57

![My Image](/designPatternsDiagrams/builder.png)

### Decorator Pattern

https://github.com/MarcelaBrjs/Twitter-Reloaded-and-Event-Dashboard/blob/5c9a630459bd9f01106b5e257b585020c8a8b307/client/src/helpers/dateFormatter.js#L1-L31

![My Image](/designPatternsDiagrams/decorator.png)
