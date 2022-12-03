const { User } = require("../src/entities/user");

test('build user and return json', () => {
    let user = new User.Builder()
        .setFirstName("Marcela")
        .setLastName("Barajas")
        .setEmail("marcela@email.com")
        .setPassword("password")
        .withAverageUser()
        .build();

    expect(user.toJSON()).toEqual({
            "firstName": "Marcela",
            "lastName": "Barajas",
            "email": "marcela@email.com",
            "password": "password",
            "isAdmin": false
        });
});