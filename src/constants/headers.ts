const authorization = localStorage.getItem("authToken");

export const headers = {
  "x-user-id": "923e4567-e89b-12d3-a456-426614174003",
  "x-user-role": "323e4567-e89b-12d3-a456-426614174003",
  "x-user-active": "2",
  authorization: `Bearer ${authorization}`,
};
  