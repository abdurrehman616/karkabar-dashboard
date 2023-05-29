import {DEFAULT_PAGE_SIZE} from '../../layout/api';

export const CATEGORY_MANY_QUERY = () => {
    return `
        query CategoryMany($page: Int) {
          categoryMany(limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
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
              category_name
            }
          }
        }
    `;
};

export const CATEGORY_ONE_QUERY = () => {
    return `
        query CategoryOne($id: ID!) {
          categoryOne(id: $id) {
            id
            category_name
          }
        }
    `;
};

export const CATEGORY_CREATE_MUTATION = () => {
    return `
      mutation CategoryCreate($input: CategoryCreateInput!) {
        categoryCreate(input: $input) {
          id
          category_name
        }
      }
    `;
};

export const CATEGORY_UPDATE_MUTATION = () => {
    return `
        mutation ($id: ID!, $input: CategoryUpdateInput!) {
            categoryUpdate(id: $id, input: $input) {
                id
                category_name
            }
        }
    `;
};

export const CATEGORY_DELETE_MUTATION = () => {
    return `
        mutation Mutation($id: ID!) {
            categoryDelete(id: $id) {
                id
                category_name
            }
        }
    `;
};
