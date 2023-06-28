// *************************//
//Homework 2//
// *************************//

class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.result = undefined;
    this.fulfilledHandlers = [];
    this.rejectedHandlers = [];

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.result = value;
        this.fulfilledHandlers.forEach((f) => f(value));
      }
    };

    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.result = error;
        this.rejectedHandlers.forEach((f) => f(error));
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onSuccess, onFailure) {
    return new MyPromise((res, rej) => {
      if (this.state === "pending") {
        this.fulfilledHandlers.push(() => {
          try {
            if (typeof onSuccess === "function") {
              const returnedFromOnFulfilled = onSuccess(this.result);
              if (returnedFromOnFulfilled instanceof MyPromise) {
                returnedFromOnFulfilled.then(res, rej);
              } else {
                res(returnedFromOnFulfilled);
              }
            } else {
              res(this.result);
            }
          } catch (err) {
            rej(err);
          }
        });

        this.rejectedHandlers.push(() => {
          try {
            if (typeof onFailure === "function") {
              const returnedFromOnRejected = onFailure(this.result);
              if (returnedFromOnRejected instanceof MyPromise) {
                returnedFromOnRejected.then(res, rej);
              } else {
                res(returnedFromOnRejected);
              }
            } else {
              rej(this.result);
            }
          } catch (err) {
            rej(err);
          }
        });
      } else if (this.state === "fulfilled") {
        try {
          if (typeof onSuccess === "function") {
            const returnedFromOnFulfilled = onSuccess(this.result);
            if (returnedFromOnFulfilled instanceof MyPromise) {
              returnedFromOnFulfilled.then(res, rej);
            } else {
              res(returnedFromOnFulfilled);
            }
          } else {
            res(this.result);
          }
        } catch (err) {
          rej(err);
        }
      } else {
        try {
          if (typeof onFailure === "function") {
            const returnedFromOnRejected = onFailure(this.result);
            if (returnedFromOnRejected instanceof MyPromise) {
              returnedFromOnRejected.then(res, rej);
            } else {
              res(returnedFromOnRejected);
            }
          } else {
            rej(this.result);
          }
        } catch (err) {
          rej(err);
        }
      }
    });
  }

  catch(onError) {
    return this.then(null, onError);
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let counter = 0;
      const result = [];
      for (let promise of promises) {
        if (!(promise instanceof MyPromise)) {
          result.push(promise);
          counter++;
          if (counter === promises.length) {
            resolve(result);
          }
        } else {
          promise.then(
            (res) => {
              result.push(res);
              counter++;
              if (counter === promises.length) {
                resolve(result);
              }
            },
            (err) => {
              reject(err);
            }
          );
        }
      }
    });
  }
}

// *************************//
//Homework 1//
// *************************//

function ajax(url, config) {
  const { type = "GET", headers = {}, data = {} } = config;

  return new MyPromise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open(type.toUpperCase(), url);

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.send(setCorrectRequestData(data));

    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function () {
      reject(new Error("Network error! Request failed"));
    };
  });
}

function setCorrectRequestData(data) {
  const contentType = headers["Content-Type"];

  if (contentType === "application/json") {
    return JSON.stringify(data);
  } else if (contentType === "multipart/form-data") {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    return formData;
  } else {
    return data;
  }
}

const url = "/article/xmlhttprequest/post/user";
const config = {
  type: "POST",
  headers: {},
  data: { name: "Narine", surName: "Badalyan" },
};

ajax(url, config)
  .then((resp) => console.log("Success: ", resp))
  .catch((err) => console.log("Error", err));
