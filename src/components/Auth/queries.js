export const USER_LOGIN_QUERY = () => {
    return `
        mutation LoginUser($input: UserLoginInput!) {
          loginUser(input: $input) {
            access_token
            status
            user {
              createdAt
              email
              id
              name
              photo
              role
              updatedAt
              username
            }
          }
        }
    `;
};

export const USER_REGISTER_QUERY = () => {
    return `
        mutation RegisterUser($input: UserRegisterInput!) {
          registerUser(input: $input) {
            status
            user {
              createdAt
              email
              id
              name
              photo
              role
              updatedAt
              username
            }
          }
        }
    `;
};

export const USER_FORGET_PASSWORD_QUERY = () => {
    return `
        mutation ForgetPassword($email: String!) {
          forgetPassword(email: $email) {
            status
          }
        }
    `;
};

export const USER_RESET_PASSWORD_QUERY = () => {
    return `
        mutation ResetPassword($input: UserResetPasswordInput!) {
          resetPassword(input: $input) {
            status
          }
        }
    `;
};

export const USER_ONE_QUERY = () => {
    return `
        query UserOne($userId: ID!) {
          userOne(id: $userId) {
            createdAt
            email
            id
            name
            photo
            role
            updatedAt
            username
          }
        }
    `;
};