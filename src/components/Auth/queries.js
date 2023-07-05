import {DEFAULT_PAGE_SIZE} from "../../layout/api.js";

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
              shop {
                id
                shop_name
                shop_sku
              }
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
              shop {
                id
                shop_name
                shop_sku
                }
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

export const USER_UPDATE_QUERY = () => {
    return `
        mutation UserUpdate($id: ID!, $input: UserUpdateInput!) {
          userUpdate(id: $id, input: $input) {
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
                shop {
                    id
                    shop_name
                    shop_sku
                }
            }
          }
        }
    `;
};

export const USER_ONE_QUERY = () => {
    return `
        query UserOne($id: ID!) {
          userOne(id: $id) {
            createdAt
            email
            id
            name
            photo
            role
            updatedAt
            username
            shop {
                id
                shop_name
                shop_sku
            }
          }
        }
    `;
};

export const USER_MANY_QUERY = () => {
    return `
        query UserMany($page: Int) {
          userMany(limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
            totalCount
            pageInfo {
              currentCountPerPage
              currentPage
              range
              totalPage
              hasMore
            }
            next {
              limit
              page
            }
            previous {
              limit
              page
            }
            data {
                createdAt
                email
                id
                name
                photo
                role
                updatedAt
                username
                shop {
                    id
                    shop_name
                    shop_sku
                }
            }
          }
        }
    `;
};