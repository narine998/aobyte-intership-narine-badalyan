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
        this.fulfilledHandlers.forEach((f) => f());
      }
    };

    const reject = (error) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.result = error;
        this.rejectedHandlers.forEach((f) => f());
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
      const resolveHandler = () => {
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
      };

      const rejectHandler = () => {
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
      };

      if (this.state === "pending") {
        this.fulfilledHandlers.push(resolveHandler);
        this.rejectedHandlers.push(rejectHandler);
      } else if (this.state === "fulfilled") {
        resolveHandler();
      } else {
        rejectHandler();
      }
    });
  }

  catch(onError) {
    return this.then(null, onError);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        try {
          onFinally();
          return value;
        } catch (err) {
          throw err;
        }
      },
      (reason) => {
        try {
          onFinally();
          throw reason;
        } catch (err) {
          throw err;
        }
      }
    );
  }

  static resolve(value) {
    return new MyPromise((res) => res(value));
  }

  static reject(err) {
    return new MyPromise((res, rej) => rej(err));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let counter = 0;
      const result = [];
      promises.forEach((promise, index) => {
        if (!(promise instanceof MyPromise)) {
          result[index] = promise;
          counter++;
          if (counter === promises.length) {
            resolve(result);
          }
        } else {
          promise.then(
            (res) => {
              result[index] = res;
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
      });
    });
  }
}

// *************************//
//Homework 1//
// *************************//

function ajax(url, config) {
  const { method = "GET", headers = {}, data = {} } = config;

  return new MyPromise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
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
  method: "POST",
  headers: {},
  data: { name: "Narine", surName: "Badalyan" },
};

ajax(url, config)
  .then((resp) => console.log("Success: ", resp))
  .catch((err) => console.log("Error", err));
