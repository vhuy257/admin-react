export const AUTHENTICATED    = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";

export const auth = auth => ({
  type: AUTHENTICATED,
  payload: {auth}
});

export const not_auth = auth => ({
  type: NOT_AUTHENTICATED
});
