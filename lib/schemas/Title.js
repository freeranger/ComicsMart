this.Schemas.Title = new SimpleSchema({
    name: {
        type: String,
        max: 250,
        label: 'Title'
    },
    publisher: {
        type: String,
        max: 100,
        label: 'Publisher'
    }
});
