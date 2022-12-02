class User {
    #firstName = null;
    #lastName = null;
    #email = null;
    #password = null;
    #isAdmin = null;

    static Builder = class {
        #firstName = null;
        #lastName = null;
        #email = null;
        #password = null;
        #isAdmin = null;

        setFirstName(firstName) {
            this.#firstName = firstName;
            return this;
        };

        setLastName(lastName) {
            this.#lastName = lastName;
            return this;
        };
    
        setEmail(email) {
            this.#email = email;
            return this;
        };
    
        setPassword(password) {
            this.#password = password;
            return this;
        };

        withAverageUser() {
            this.#isAdmin = false;
            return this;
        };

        build() {
            const user = new User(
                this.#firstName,
                this.#lastName,
                this.#email,
                this.#password,
                this.#isAdmin)
            return user
        };
    };

    constructor(firstName, lastName, email, password, isAdmin) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = password;
        this.#isAdmin = isAdmin;
    };

    toJSON() {
        return {
            firstName: this.#firstName,
            lastName: this.#lastName,
            email: this.#email,
            password: this.#password,
            isAdmin: this.#isAdmin
        }
    };
};

module.exports = { User }