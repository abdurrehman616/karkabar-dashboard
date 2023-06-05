import {DEFAULT_PAGE_SIZE} from '../../layout/api';

export const PRODUCT_MANY_QUERY = () => {
    return `
        query ProductMany($page: Int) {
          productMany(limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
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
                name
                price
                sku
                chasis_number
                description
                from
                to
                shop_id
                status
            }
          }
        }
    `;
};

export const SHOP_ONE_QUERY = () => {
    return `
        query ProductOne($id: ID!) {
          productOne(id: $id) {
            category {
                category_name
                id
              }
              category_id
              chasis_number
              description
              from
              id
              images {
                id
                featured_image
                image_url
              }
              name
              price
              shop_id
              sku
              status
              to
          }
        }
    `;
};

export const PRODUCT_CREATE_MUTATION = () => {
    return `
      mutation ProductCreate($input: ProductCreateInput!) {
        productCreate(input: $input) {
          category {
            category_name
            id
          }
          category_id
          chasis_number
          description
          from
          id
          images {
            id
            featured_image
            image_url
          }
          name
          price
          shop_id
          sku
          status
          to
        }
      }
    `;
};

export const PRODUCT_UPDATE_MUTATION = () => {
    return `
        mutation ($id: ID!, $input: ProductUpdateInput!) {
            productUpdate(id: $id, input: $input) {
                category {
                    category_name
                    id
                  }
                  category_id
                  chasis_number
                  description
                  from
                  id
                  images {
                    id
                    featured_image
                    image_url
                  }
                  name
                  price
                  shop_id
                  sku
                  status
                  to
                }
        }
    `;
};

export const PRODUCT_DELETE_MUTATION = () => {
    return `
        mutation Mutation($id: ID!) {
            productDelete(id: $id) {
                category {
                    category_name
                    id
                  }
                  category_id
                  chasis_number
                  description
                  from
                  id
                  images {
                    id
                    featured_image
                    image_url
                  }
                  name
                  price
                  shop_id
                  sku
                  status
                  to
            }
        }
    `;
};
