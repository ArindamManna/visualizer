import axios from "axios";


let API_URL = "";

let hostname = window.location.hostname;
if (hostname == "localhost" || hostname == "127.0.0.1") {
  // API_URL = "http://localhost:9000/api/v1/";
  API_URL = "http://localhost:4000/api/";
}
export { API_URL };

export const ApiHelperFunction = async (data) => {
  const { urlPath, method, formData } = data;

  var config = {
    method: `${method}`,
    url: `${API_URL}${urlPath}`,
    headers: {
      // Accept: "application/json",
      "Content-Type":  "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    data: formData,
  };

  let responseData = "";

  await axios(config)
    .then(function (response) {
      responseData = response;
    })

    .catch(function (error) {
      console.log(error);
      let temp = error;
      responseData = temp.response.data;
      alert(error?.response?.data?.error)
    });

  return responseData?.data;
};
