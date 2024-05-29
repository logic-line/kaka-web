import { InvitedUser, UpdateUser, UserListFilterRequest } from "@/types/user";
import user from "./data/user";

export default class UserMockService {
  FetchCreateUser(createUser: InvitedUser) {
    return new Promise((resolve) => {
      user.User.FirstName = createUser.firstname
      user.User.LastName = createUser.lastname
      user.User.Email = createUser.email
      user.User.Phone = createUser.phonenumber
      resolve(user.User);
    });
  }

  FetchUpdateUser(updateUser: UpdateUser) {
    return new Promise((resolve) => {
      resolve(user.User);
    });
  }

  FetchGetUserByID(id: string) {
    return new Promise((resolve) => {
      resolve(user.User);
    });
  }

  FetchGetUserByEmail(email: string) {
    return new Promise((resolve) => {
      resolve(user.User);
    });
  }

  FetchGetUserList(listfilter: UserListFilterRequest) {
    return new Promise((resolve) => {
      resolve(user.userlist);
    });
  }
 
}


