import {DEFAULT_PAGE_SIZE} from '../../layout/api';

export const MAKE_MANY_QUERY = () => {
    return `
        query MakeMany($page: Int) {
          makeMany(limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
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
              make_name
            }
          }
        }
    `;
};

export const MAKE_ONE_QUERY = () => {
    return `
        query MakeOne($id: ID!) {
          makeOne(id: $id) {
            id
            make_name
          }
        }
    `;
};

export const MAKE_CREATE_MUTATION = () => {
    return `
      mutation MakeCreate($input: MakeCreateInput!) {
        makeCreate(input: $input) {
          id
          make_name
        }
      }
    `;
};

export const MAKE_UPDATE_MUTATION = () => {
    return `
        mutation ($id: ID!, $input: MakeUpdateInput!) {
            makeUpdate(id: $id, input: $input) {
                id
                make_name
            }
        }
    `;
};

export const MAKE_DELETE_MUTATION = () => {
    return `
        mutation Mutation($id: ID!) {
            makeDelete(id: $id) {
                id
                make_name
            }
        }
    `;
};
