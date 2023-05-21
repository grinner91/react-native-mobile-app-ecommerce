import { getSecureHttp } from "./base.http.js";

export const fetchAllProducts = async () => {
  try {
    const response = await getSecureHttp().get("/api/v1/products");
    const json = response;
    //console.log(" fetchAllProducts json: ", json.data);
    return json.data;
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
    const json = response;
    //console.log(" fetchAllProducts json: ", json.data);
    return json.data;
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
