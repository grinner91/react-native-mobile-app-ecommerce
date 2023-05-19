export function prepareSuccessResponse(result) {
  return { success: true, data: result };
}

export function prepareFailResponse(result) {
  return { success: false, data: result };
}

export const MONGODB_URI =
  "mongodb+srv://mwagroup4:mwa12345@cluster0.svx6cbk.mongodb.net/mwagroup4?retryWrites=true&w=majority";
export const JWT_SIGN_SECRET =
  "thisisveryverysecretkey!@#$%^&*neverevercracked!!!";
