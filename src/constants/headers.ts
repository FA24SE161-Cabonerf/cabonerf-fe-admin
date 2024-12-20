// const authorization = localStorage.getItem("authToken");

export const headers = {
  "x-user-id": "923e4567-e89b-12d3-a456-426614174003",
  "x-user-role": "323e4567-e89b-12d3-a456-426614174003",
  "x-user-active": "2",
  gatewayToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUyMTE4NmI3ZjRhNmM3YzBhZjllNWQ2YzZkY2NmNmRhXG4iLCJpYXQiOjE3Mjk1NzU3Njl9.RblWbflm4C3ZMW7kp4Xw3WNznd2OX38fdK-6FVSD768",
  authorization: `Bearer ${localStorage.getItem("authToken")}`,
};
  