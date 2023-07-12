function CustomPromise(callback) {
  this.value = null;
  this.error = null;
  this.onResolve = [];
  this.onReject = [];
  this.onFinally = null;
  this.state = "pending";

  let resolve = (value) => {
    if (this.state === "pending") {
      this.state = "resolved";
      this.value = value;
      this.onResolve.forEach((callback) => callback(value));
      if (this.onFinally) {
        this.onFinally();
      }
    }
  };

  let reject = (error) => {
    if (this.state === "pending") {
      this.state = "rejected";
      this.error = error;
      this.onReject.forEach((callback) => callback(error));
      if (this.onFinally) {
        this.onFinally();
      }
    }
  };

  try {
    callback(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

CustomPromise.prototype.then = function (onResolve, onReject) {
  const nextPromise = new CustomPromise((resolve, reject) => {
    const resolveHandler = (value) => {
      try {
        const result = onResolve ? onResolve(value) : value;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };

    const rejectHandler = (error) => {
      try {
        /* here if onReject is not a function the promise should pass the error to the 
          next handler not with resolve, but with reject, because if rejectHandler function
          is called it means the promise is rejected. And "then" method without second 
          argument should pass the rejected promise to the next handler.
          */
        //   const result = onReject ? onReject(error) : error;
        //   resolve(result);

        //corrected code (that is why .catch wasn't working)
        if (onReject) {
          const result = onReject(error);
          resolve(result);
        } else {
          reject(error);
        }
      } catch (err) {
        reject(err);
      }
    };

    // this.onResolve.push(resolveHandler);
    // this.onReject.push(rejectHandler);

    /* Above code is changed to below.
       This check is for synchronous resolve and reject handling 
    */

    // (*)
    if (this.state === "pending") {
      this.onResolve.push(resolveHandler);
      this.onReject.push(rejectHandler);
    } else if (this.state === "resolved") {
      resolveHandler(this.value);
    } else {
      rejectHandler(this.error);
    }
  });

  return nextPromise;
};

CustomPromise.prototype.catch = function (onReject) {
  return this.then(null, onReject);
};

CustomPromise.all = function (promises) {
  return new CustomPromise(function (resolve, reject) {
    const results = [];
    let completedPromises = 0;
    const numPromises = promises.length;

    if (numPromises === 0) {
      resolve(results);
    } else {
      promises.forEach(function (promise, index) {
        promise
          .then(function (value) {
            results[index] = value;
            completedPromises++;

            if (completedPromises === numPromises) {
              resolve(results);
            }
          })
          .catch(function (error) {
            // no need to keep this object into results array
            // results[index] = { status: "rejected", reason: error };

            /* no need for this check, because if code execution is here it means
               one of promises is rejected, so  completedPromises !== numPromises
            */
            // if (completedPromises === numPromises) {
            //   resolve(results);
            // } else {
            //   reject(results[index].reason);
            // }

            reject(error);
          });
      });
    }
  });
};

CustomPromise.prototype.finally = function (onFinally) {
  this.onFinally = onFinally;
  return this;
};

function ajax(url, config) {
  return new CustomPromise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open(config.method || "GET", url);

      for (let header in config.headers) {
        if (config.headers.hasOwnProperty(header)) {
          xhr.setRequestHeader(header, config.headers[header]);
        }
      }

      xhr.onload = () => {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          /* When given wrong url the execution comes here as 
               the response is received and status code is 404
            */
          // reject(new Error(xhr.statusText));
          console.log(`rejected because of  ${xhr.status} status`);
          reject(new Error("Error " + xhr.status));
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error"));
      };

      /* No need for try catch because xhr.send() works asynchronous and 
       if error occured we will see it in onerror callback
      */
      //   try {
      //     xhr.send(JSON.stringify(config.data));
      //   } catch (error) {
      //     console.log("Error occurred while sending request:", error);
      //     reject(error);
      //   }
      xhr.send(JSON.stringify(config.data));
    } catch (error) {
      console.log("Hello this is my error.");
    }
  });
}

// test code

const url = "https://api.thecatapi.com/v1/categories";

const config = {
  type: "GET",
  headers: {},
  data: {},
};

const p1 = ajax(url + "ll", config);
const p2 = ajax(url, config);
const p3 = ajax(url, config);

const allPromises = CustomPromise.all([p1, p2, p3]);
allPromises
  .catch((error) => {
    console.log("This is an error in promise.all." + error.message);
    return "Now catch works";
  }) // now catch works
  .then((res) => {
    console.log(res);
    return "Everything is alright!";
  })
  .then((res) => {
    console.log(res);
  });

/* This test case wasnt not working before because here res(5) is called immediately 
    and after that "then" method is called which pushes its callback functions 
    into callback array. The resolve method was called before "then" and at that time 
    the callback array was empty.
    Now after changing (*) row it works as expected.
  */

const p4 = new CustomPromise((res, rej) => {
  res(5); // step 1
});

p4.then((res) => console.log(res)); //step 2
