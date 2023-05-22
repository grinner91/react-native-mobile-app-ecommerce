import { getSecureHttp } from "./base.http.js";

export const fetchAllProducts = async () => {
  try {
    const response = await getSecureHttp().get("/api/v1/products");
    //console.log(" fetchAllProducts json: ", res);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addProductReview = async (product, review) => {
  try {
    const url = `/api/v1/products/${product._id}/review/feedbacks`;
    const response = await getSecureHttp().put(url, {
      stars: review.rating,
      comment: review.comment,
    });
    //console.log(" fetchAllProducts json: ", json.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const saveProductRequest = async (product) => {
  try {
    console.log("saveProductRequest product: ", product);
    let url = `/api/v1/products`;
    let response = {};
    if (product._id) {
      url = `/api/v1/products/${product._id}`;
      response = await getSecureHttp().put(url, {
        ...product,
      });
    } else {
      response = await getSecureHttp().post(url, {
        ...product,
      });
    }
    console.log("saveProductRequest response: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProductRequest = async (productId) => {
  try {
    const url = `/api/v1/products/${productId}`;
    const response = await getSecureHttp().delete(url);
    //console.log(" deleteProductRequest : ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

/*
{
                _id: ObjectId
                stars: Number,//1, 2, 3, 4, 5
                comment: String
            }
 */
