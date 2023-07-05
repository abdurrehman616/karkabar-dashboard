import {DEFAULT_PAGE_SIZE} from "../../layout/api.js";

export const SALE_BY_SHOP_QUERY = () => {
    return `
        query Query($shopId: ID!, $page: Int) {
          saleByShop(shop_id: $shopId, limit: ${DEFAULT_PAGE_SIZE}, page: $page) {
            next {
              limit
              page
            }
            pageInfo {
              currentCountPerPage
              currentPage
              hasMore
              range
              totalPage
            }
            previous {
              limit
              page
            }
            totalCount
            data {
              amount
              date
              id
              quantity
              products {
                category_id
                chasis_number
                description
                from
                id
                name
                price
                selling_status
                status
                sku
                shop_id
                to
              }
            }
          }
        }
    `;
};