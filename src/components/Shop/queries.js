import {DEFAULT_PAGE_SIZE} from '../../layout/api';

export const SHOP_MANY_QUERY = () => {
    return `
        query ShopMany($page: Int) {
          shopMany(limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
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
              id
              shop_name
              shop_sku
              status
            }
          }
        }
    `;
};

export const SHOP_ONE_QUERY = () => {
    return `
        query ShopOne($id: ID!) {
          shopOne(id: $id) {
            id
            shop_name
            shop_sku
            status
          }
        }
    `;
};

export const SHOP_CREATE_MUTATION = () => {
    return `
      mutation ShopCreate($input: ShopCreateInput!) {
        shopCreate(input: $input) {
          id
          shop_name
          shop_sku
          status
        }
      }
    `;
};

export const SHOP_UPDATE_MUTATION = () => {
    return `
        mutation ($id: ID!, $input: ShopUpdateInput!) {
            shopUpdate(id: $id, input: $input) {
                id
                shop_name
                shop_sku
                status
            }
        }
    `;
};

export const SHOP_DELETE_MUTATION = () => {
    return `
        mutation Mutation($id: ID!) {
            shopDelete(id: $id) {
                id
                shop_name
                shop_sku
                status
            }
        }
    `;
};
