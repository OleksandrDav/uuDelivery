module.exports = class UserDto {
   email;
   id;
   roles;
   name;
   surname;

   constructor(model) {
      this.email = model.email;
      this.id = model._id;
      this.roles = model.roles;
      this.name = model.name;
      this.surname = model.surname;
   }
}