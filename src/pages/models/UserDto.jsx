export default class UserModel {
  constructor(
    userName,
    userLastName,
    userMotherLastName,
    userEmail,
    userPhone,
    userBirthDate,
    imageData
  ) {
    this.userName = userName;
    this.userMotherLastName = userMotherLastName;
    this.userLastName = userLastName;
    this.userEmail = userEmail;
    this.userPhone = userPhone;
    this.userBirthDate = userBirthDate;
    this.imageData = imageData;
  }

  static fromJson(json) {
    return new UserModel(
      json.userName,
      json.userMotherLastName,
      json.userLastName,
      json.userEmail,
      json.userPhone,
      json.userBirthDate,
      json.imageData
    );
  }

  toJson() {
    return {
      userName: this.userName,
      userMotherLastName: this.userMotherLastName,
      userLastName: this.userLastName,
      userEmail: this.userEmail,
      userPhone: this.userPhone,
      userBirthDate: this.userBirthDate,
      imageData: this.imageData,
    };
  }
}
