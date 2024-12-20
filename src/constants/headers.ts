export const getHeaders = () => ({
  "x-user-id": "923e4567-e89b-12d3-a456-426614174003",
  "x-user-role": "323e4567-e89b-12d3-a456-426614174003",
  "x-user-active": "2",
  authorization: `Bearer ${localStorage.getItem("authToken")}`,
});
