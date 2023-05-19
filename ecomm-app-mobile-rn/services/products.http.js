import { baseUrl } from "../common/constants.js";

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/v1/products`);
    const json = await response.json();
    console.log(" fetchAllProducts json: ", json);
    return json.data;
  } catch (error) {
    console.error(error);
  }
};

// export const fetchAllCoursesByDepartmentCode = async (deptCode) => {
//   try {
//     const response = await fetch(
//       hostUrl + "/departments/" + deptCode + "/courses"
//     );
//     const json = await response.json();
//     console.log("fetchAllCoursesByDepartmentCode json: ", json);
//     return json[0].courses;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const addCourse = async (deptCode, newCourse) => {
//   try {
//     const url = hostUrl + "/departments/" + deptCode + "/courses";
//     console.log("url: ", url, ", new course: ", newCourse);

//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newCourse),
//     });
//     const json = await response.json();
//     console.log(" add course json: ", json);
//     return true;
//   } catch (error) {
//     console.error(error);
//   }
//   return false;
// };

// /*

// (async () => {
//   const rawResponse = await fetch('https://httpbin.org/post', {
//     method: 'POST',
//     body: JSON.stringify({a: 1, b: 'Textual content'})
//   });
//   const content = await rawResponse.json();

//   console.log(content);
// })();
// */

// export const deleteCourseByCode = async (deptCode, courseCode) => {
//   try {
//     const response = await fetch(
//       hostUrl + "/departments/" + deptCode + "/courses/" + courseCode,
//       { method: "DELETE" }
//     );
//     const json = await response.json();
//     console.log(" delete json: ", json);
//     return true;
//   } catch (error) {
//     console.error(error);
//   }
//   return false;
// };

// export const addReviewInCourse = async (deptCode, courseCode, newReview) => {
//   try {
//     const url =
//       hostUrl +
//       "/departments/" +
//       deptCode +
//       "/courses/" +
//       courseCode +
//       "/reviews";
//     console.log("url: ", url, ", new revew: ", newReview);
//     const res = await fetch(url, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newReview),
//     });
//     const json = await res.json();
//     return json;
//   } catch (error) {
//     console.log(error);
//   }
// };
