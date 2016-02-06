Meteor.startup(function () {
    // code to run on server at startup

    Titles.rawCollection().createIndex( { name: 1, publisher: 1 }, function(error) {
        if (error) {
            console.log('Error Creating index: ' + error);
        }});;

    // Create test users
    var freeranger, user1, user2, user3
    if (!Meteor.users.findOne()) {
        console.log('Adding test users');
        freeranger = Accounts.createUser({
            username: 'freeranger',
            email:    'tony@test.com',
            password: 'tonytony'
        });

        user1 = Accounts.createUser({
            username: 'user1',
            email:    'user1@test.com',
            password: 'user1user1'
        });

        user2 = Accounts.createUser({
            username: 'user2',
            email:    'user2@test.com',
            password: 'user2user2'
        });
        user3 = Accounts.createUser({
            username: 'user3',
            email:    'user3@test.com',
            password: 'user3user3'
        });
    }
    else {
        console.log('Finding existing users');
        freeranger = Meteor.users.findOne({username: 'freeranger'})._id;
        user1 = Meteor.users.findOne({username: 'user1'})._id;
        user2 = Meteor.users.findOne({username: 'user2'})._id;
        user3 = Meteor.users.findOne({username: 'user3'})._id;
    }

    console.log('freeranger: ' + freeranger + ', user1: ' + user1 + ', user2: ' + user2);

    // Add sample publisers
    if (!Publishers.findOne()){
        Publishers.insert( { name: 'Marvel' } );
        Publishers.insert( { name: 'DC' } );
        Publishers.insert( { name: 'Avatar' } );
        Publishers.insert( { name: 'Vertigo' } );
        Publishers.insert( { name: 'Dark Horse' } );
        Publishers.insert( { name: 'Image Comics' } );
        Publishers.insert( { name: 'Eclipse Comics' } );
    }

    // Add sample titles
    if (!Titles.findOne()) {
        Titles.insert( { name: 'Amazing Spiderman', publisher: 'Marvel' } );
        Titles.insert( { name: 'Uncanny X-Men', publisher: 'Marvel' } );
        Titles.insert( { name: 'Sandman', publisher: 'Vertigo' } );
        Titles.insert( { name: 'Detective Comics', publisher: 'DC' } );
        Titles.insert( { name: 'Action Comics', publisher: 'DC' } );
        Titles.insert( { name: 'Crossed', publisher: 'Avatar' } );
        Titles.insert( { name: 'Saga', publisher: 'Image Comics' } );
        Titles.insert( { name: 'Aliens', publisher: 'Dark Horse' } );
        Titles.insert( { name: 'Miracleman', publisher: 'Eclipse Comics' } );
        Titles.insert( { name: 'Miracleman', publisher: 'Marvel Comics' } );
    }

    // Add sample requests
    if (!Requests.findOne()) {
        Requests.insert({ userId: user1, type: 'Sell', title: 'Miracleman', publisher: 'Eclipse Comics', volume:1, minIssue: 9, maxIssue: 9, minGrade: 2.0, maxGrade:9.4, isActive: true});
        Requests.insert({ userId: freeranger, type: 'Sell', title: 'Amazing Spiderman', publisher: 'Marvel', volume:1, minIssue: 1, maxIssue: 10, minGrade: 4.0, maxGrade:8.0, isActive: true});
        Requests.insert({ userId: freeranger, type: 'Sell', title: 'Saga', publisher: 'Image Comics', volume:1, minIssue: 1, maxIssue: 15, minGrade: 8.0, maxGrade:9.9, isActive: true});
        Requests.insert({ userId: freeranger, type: 'Buy', title: 'Detective Comics', publisher: 'DC', volume:1, minIssue: 20, maxIssue: 40, minGrade: 0.5, maxGrade:8.0, isActive: true});
        Requests.insert({ userId: user1, type: 'Buy', title: 'Amazing Spiderman', publisher: 'Marvel', volume:1, minIssue: 5, maxIssue: 5, minGrade: 6.0, maxGrade:6.0, isActive: true});
        Requests.insert({ userId: user1, type: 'Buy', title: 'Saga', publisher: 'Image Comics', volume:1, minIssue: 1, maxIssue: 1, minGrade: 9.4, maxGrade:9.4, isActive: true});
        Requests.insert({ userId: user1, type: 'Buy', title: 'Miracleman', publisher: 'Eclipse Comics', volume:1, minIssue: 9, maxIssue: 9, minGrade: 6.0, maxGrade:9.4, isActive: true});
        Requests.insert({ userId: user1, type: 'Buy', title: 'Miracleman', publisher: 'Marvel Comics', volume:2, minIssue: 1, maxIssue: 1, minGrade: 6.0, maxGrade:6.0, isActive: true});
        Requests.insert({ userId: user2, type: 'Buy', title: 'Saga', publisher: 'Image Comics', volume:1, minIssue: 1, maxIssue: 10, minGrade: 1.0, maxGrade:8.0, isActive: true});
        Requests.insert({ userId: user2, type: 'Sell', title: 'Detective Comics', publisher: 'DC', volume:1, minIssue: 27, maxIssue: 27, minGrade: 8.0, maxGrade:8.0, isActive: true});
        Requests.insert({ userId: user2, type: 'Sell', title: 'Amazing Spiderman', publisher: 'Marvel', volume:2, minIssue: 1, maxIssue: 10, minGrade: 4.0, maxGrade:8.0, isActive: true});
        Requests.insert({ userId: user2, type: 'Buy', title: 'Miracleman', publisher: 'Eclipse Comics', volume:1, minIssue: 4, maxIssue: 9, minGrade: 1.0, maxGrade:9.4, isActive: true});
        Requests.insert({ userId: user3, type: 'Buy', title: 'Miracleman', publisher: 'Eclipse Comics', volume:1, minIssue: 9, maxIssue: 12, minGrade: 6.0, maxGrade:8.0, isActive: true});

    }
});
