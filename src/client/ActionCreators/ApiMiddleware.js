const apiURL = `${window.location.href}api`;
const POST_OPTIONS = {
  method: "POST"
};

console.log("Api url");
console.log(apiURL);

const createPostRequest = (data, isJSON) => {
  const request = { ...POST_OPTIONS };

  if (isJSON) {
    request.body = JSON.stringify(data);
    request.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  } else request.body = data;
  return request;
};

const GETData = (path, params) => {
  const url = new URL(apiURL + path);
  if (params)
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
  return fetch(url);
};

const POSTData = (path, data, isJSON) => {
  const request = createPostRequest(data, isJSON);
  return fetch(apiURL + path, request);
};

export { GETData, POSTData };
