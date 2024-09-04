exports.GetAPI = async function (url, query) {

  return new Promise(function (res, rej) {
    let params = new URLSearchParams(query);
    var oReq = new XMLHttpRequest();
    oReq.open("GET", `${url}?${params}`);
    oReq.send();

    oReq.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let resData = JSON.parse(this.responseText);
        res(resData)
      } else if (this.readyState === 4 && this.status === 400) {
        rej({
          status: this.status,
          msg: this.responseText
        })
      }
    }

    oReq.onerror = function () {
      rej({
        status: this.status,
        mas: this.responseText
      })
    }
  })
}

exports.PostAPI = async function (url, data) {

  return new Promise(function (res, rej) {
    var oReq = new XMLHttpRequest();
    oReq.open("POST", url);
    oReq.setRequestHeader('Content-type', "application/json")
    let Strdata = JSON.stringify(data);
    oReq.send(Strdata);

    oReq.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        let resData = JSON.parse(this.responseText);
        res(resData)
      } else if (this.readyState === 4 && this.status === 400) {
        rej({
          status: this.status,
          msg: this.responseText
        })
      }
    }

    oReq.onerror = function () {
      rej({
        status: this.status,
        mas: this.responseText
      })
    }
  })
}