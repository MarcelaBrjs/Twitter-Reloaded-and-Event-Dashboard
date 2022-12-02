class Tweet {
    #content = null;
    #replyToTweetId = null;
    #userId = null;
    #statusDelete = null;

    static Builder = class {
        #content = null;
        #replyToTweetId = null;
        #userId = null;
        #statusDelete = null;

        setContent(content) {
            this.#content = content;
            return this;
        };
    
        setReplyToTweetId(replyToTweetId) {
            this.#replyToTweetId = replyToTweetId;
            return this;
        };
    
        setUserId(userId) {
            this.#userId = userId;
            return this;
        };
    
        withStatusDeleteFalse() {
            this.#statusDelete = false;
            return this;
        };

        build() {
            const tweet = new Tweet(
                this.#content,
                this.#replyToTweetId,
                this.#userId,
                this.#statusDelete)
            return tweet
        };
    };

    constructor(content, replyToTweetId, userId, statusDelete) {
        this.#content = content;
        this.#replyToTweetId = replyToTweetId;
        this.#userId = userId;
        this.#statusDelete = statusDelete;
    };

    toJSON() {
        return {
            content: this.#content,
            replyToTweetId: this.#replyToTweetId,
            userId: this.#userId,
            statusDelete: this.#statusDelete
        }
    };
};

module.exports = { Tweet }