import ajax from "./ajax"

export default {
  //http://127.0.0.1:7001
  url: "http://127.0.0.1:7001",

  //增方法
  /*
  * params:新增发送的参数
  * vueComponent:this对象
  * */
  create(params) {
    return new Promise((resolve, reject) => {
      let url = this.url + "/save";

      ajax.post(url, params, responsedata => {
        console.log(responsedata);
        if (responsedata.code == 200) {
          resolve();

        }

        else if (responsedata.code == 201) {

          reject("增方法失败");

        }
      });

    })

  },
  //单个id删
  delete(params) {
    return new Promise((resolve, reject) => {
      let url = this.url + "/del";
      // let params={id:id};


      ajax.post(url, params, responsedata => {
        console.log(responsedata.code);
        if (responsedata.code == 200) {
          console.log(responsedata.data);
          resolve(responsedata.data);

        }

        else if (responsedata.code == 201) {

          reject("删方法失败");

        }
      });

    })


  },

  //批量删
  deleteMultiple(params) {
    return new Promise((resolve, reject) => {
      let url = this.url + "/delAll";
      // let params={id:id};


      ajax.post(url,params,responsedata => {
        // console.log(responsedata.code);
        if (responsedata.code == 200) {
          console.log("批量删执行成功");
          console.log(responsedata.data);
          resolve(responsedata.data);

        }

        else if (responsedata.code == 201) {

          reject("批量删方法失败");

        }
      });

    })


  },

  //改
  update(params) {
    return new Promise((resolve, reject) => {
      let url = this.url + "/update";


      ajax.post(url, params, responsedata => {
        console.log(responsedata);
        if (responsedata.code == 200) {
          resolve();

        }

        else if (responsedata.code == 201) {

          reject("改方法失败");

        }
      });

    })
  },
  //查：所有
  retrieve() {
    return new Promise((resolve, reject) => {
      let url = this.url + "/findAll";

      ajax.get(url, responsedata => {

        if (responsedata.code == 200) {

          console.log(`返回的数据：${responsedata}`);
          resolve(responsedata.data);
        }

        else if (responsedata.code == 201) {

          reject("查方法失败")
        }
      });


    })

  },
  //查：模糊查
  retrieveLike(data) {
    return new Promise((resolve, reject) => {
      let url = this.url + "/like";
      let params={name:data};

      ajax.post(url, params,responsedata => {

        if (responsedata.code == 200) {
          console.log(responsedata.data);
          resolve(responsedata.data);
        }

        else if (responsedata.code == 201) {

          reject("模糊查方法失败")
        }
      });


    })

  }

}
