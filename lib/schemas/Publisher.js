this.Schemas.Publisher = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 100,
        label: 'Publisher'
    }
});
