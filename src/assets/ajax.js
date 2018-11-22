export default {
  post(url, data, callback) {
    /* post方法*/
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
    //response利用json格式解码
      .then(response => response.json())
      .then((responsedata) => {
        callback(responsedata);
      }).catch((error) => {
      console.log(error);
    })

  },
  /*验证token方法*/
  postToken(url, data,token, callback) {
    /* post方法*/
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization":"Bearer "+token
      },
      body: JSON.stringify(data)
    })
    //response利用json格式解码
      .then(response => response.json())
      .then((responsedata) => {
        callback(responsedata);
      }).catch((error) => {
      console.log(error);
    })

  },

  /*get方法*/
  get(url, callback) {
    fetch(url)
    //response利用json格式解码
      .then(response => response.json())
      .then((responsedata) => {
        callback(responsedata);
      }).catch((error) => {
      console.log(error);
    })
  }

}
