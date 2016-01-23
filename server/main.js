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

    if (!Requests.findOne()){// no publishers
        Requests.insert( { userId: 'xdG4nYCAs27DMXK2n', title: 'Sandman', publisher: 'Vertigo', type: 'Buy', minIssue: 1, maxIssue: 75, minGrade: 'VFN', maxGrade: 'Mint', fillType: 'Full', matches:[] } );
        Requests.insert( { userId: 'xdG4nYCAs27DMXK2n', title: 'Amazing Spiderman', publisher: 'Marvel', type: 'Sell', minIssue: 24, maxIssue: 25, minGrade: 'NM', maxGrade: 'NM', fillType: 'Any', matches: [] } );
    }

});