export const validateResponseContent = (content: string) => {
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
};

export const enableInterceptor = (query: string, content: any) => {
  try {
    let originalOpen = XMLHttpRequest.prototype.open;
    let originalSend = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.open = function (method, url) {
      console.log("open", method, url);
      // @ts-ignore
      return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function (req) {
      console.log("send", req);
      const reqPayload = JSON.stringify(req);
      this.addEventListener("readystatechange", function (res: any) {
        console.log("res", res);
        if (this.readyState === 4) {
          // Only modify on readyState 4 (DONE)
          Object.defineProperty(this, "responseText", {
            get: function () {
              console.log("responseText", this);
              debugger;
              return reqPayload?.includes(query) ? content : res?.responseText;
            },
          });
        }
      });
      // @ts-ignore
      return originalSend.apply(this, arguments);
    };
    return true;
  } catch {
    return false;
  }
};

export const disableInterceptor = (query: string) => {
  XMLHttpRequest.prototype.removeEventListener("readystatechange", () => {});
  return true;
};
