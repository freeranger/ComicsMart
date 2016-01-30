this.Publishers = new Mongo.Collection("publishers");
this.Publishers.attachSchema(this.Schemas.Publisher);

this.Titles = new Mongo.Collection("titles");
this.Titles.attachSchema(this.Schemas.Title);

this.Requests = new Mongo.Collection("requests");
this.Requests.attachSchema(this.Schemas.Request);

this.Requests.before.insert(function (userId, request) {

    if (!Publishers.findOne({name: request.publisher})) {
        Publishers.insert( { name: request.publisher } );
    }
    if (!Titles.findOne({name: request.title, publisher: request.publisher})) {
        Titles.insert({name: request.title, publisher: request.publisher});
    }
    return true;
});

Requests.after.insert(function (userId, request) {
    console.log('after insert');
});