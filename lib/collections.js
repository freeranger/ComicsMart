this.Publishers = new Mongo.Collection("publishers");
this.Publishers.attachSchema(this.Schemas.Publisher);

this.Titles = new Mongo.Collection("titles");
this.Titles.attachSchema(this.Schemas.Title);

this.Requests = new Mongo.Collection("requests");
this.Requests.attachSchema(this.Schemas.Request);
