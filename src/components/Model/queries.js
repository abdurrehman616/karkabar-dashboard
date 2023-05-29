import {DEFAULT_PAGE_SIZE} from '../../layout/api';

export const MODEL_MANY_QUERY = () => {
    return `
        query ModelMany($page: Int) {
          modelMany(limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
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
              model_name
            }
          }
        }
    `;
};

export const MODEL_ONE_QUERY = () => {
    return `
        query ModelOne($id: ID!) {
          modelOne(id: $id) {
            id
            model_name
          }
        }
    `;
};

export const MODEL_CREATE_MUTATION = () => {
    return `
      mutation ModelCreate($input: ModelCreateInput!) {
        modelCreate(input: $input) {
          id
          model_name
        }
      }
    `;
};

export const MODEL_UPDATE_MUTATION = () => {
    return `
        mutation ($id: ID!, $input: ModelUpdateInput!) {
            modelUpdate(id: $id, input: $input) {
                id
                model_name
            }
        }
    `;
};

export const MODEL_DELETE_MUTATION = () => {
    return `
        mutation Mutation($id: ID!) {
            modelDelete(id: $id) {
                id
                model_name
            }
        }
    `;
};
