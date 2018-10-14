const apiURL = `${window.location.href}api`;
const POST_OPTIONS = {
  method: "POST",
  mode: "no-cors"
};

console.log("Api url");
console.log(apiURL);

const createPostRequest = (data, isJSON) => {
  const request = { ...POST_OPTIONS };

  request.body = isJSON ? JSON.stringify(data) : data;
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

const POSTData = (path, data, isJSON) =>
  fetch(apiURL + path, createPostRequest(data, isJSON));

export { GETData, POSTData };
