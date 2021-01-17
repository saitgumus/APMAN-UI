export default class User {
  userId;
  userName;
  email;
  firstName;
  lastName;
  password;
  MemberId;
  token;
  expiration;
  //üyelik paketi
  subscription;
  //bildirim
  inboxNotificationCount;
  generalNotificationCount;
  //kaynak
  resourceActionList;

  //parola değişikliği gerekiyor!
  shouldNewPassword;

  // kurumsal
  isCorporateUser;
  company;
}

export class Subscription {
  subscriptionId;
  userId;
  startDate;
  endDate;
  memberLimit;
  apartmentLimit;
}
