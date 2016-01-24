Meteor.startup(function () {
    // code to run on server at startup

    if (!Publishers.findOne()){// no publishers
        Publishers.insert( { name: 'Marvel' } );
        Publishers.insert( { name: 'DC' } );
        Publishers.insert( { name: 'Avatar' } );
        Publishers.insert( { name: 'Vertigo' } );
        Publishers.insert( { name: 'Dark Horse' } );

    }

    if (!Titles.findOne()) { // no publishers
        Titles.insert( { name: 'Amazing Spiderman', publisher: 'Marvel' } );
        Titles.insert( { name: 'Sandman', publisher: 'Vertigo' } );
    }

});