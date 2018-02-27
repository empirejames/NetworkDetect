          
          var start_time, end_time, result;
          function downloadFile(stations){
            var station = stations;
            var speedResult;
            //alert("station : " + station);
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
              start_time = new Date().getTime();
              var url = 'http://'+station+'.myluxhome.com/speedtest/zero.data';
              fs.root.getFile('zero.data', { create: true, exclusive: false },
              function (fileEntry) {
                  download(fileEntry, url);
              }, onErrorCreateFile);
            }, onErrorLoadFs);

          }
 
          //下载文件
          function download(fileEntry, uri) {
            var fileTransfer = new FileTransfer();
            var fileURL = fileEntry.toURL();
            fileTransfer.download(
                uri,
                fileURL,
                function (entry) {
                  //alert("文件保存位置: " + entry.toURL());
                  end_time = new Date().getTime();
                  var pass_time = (end_time - start_time)  /1000;
                  result = 1024 / pass_time * 8;
                  var myEl =angular.element(document.querySelector( '#speedTest' ));
                  myEl.text("Speed : " + Math.round(result) + " Kb/s");
                  return Math.round(result) + " Kb/s";
                },
                function (error) {
                  alert("下載失敗！" + station);
                    console.log("下載失敗！");
                    console.log("error source " + error.source);
                    console.log("error target " + error.target);
                    console.log("error code" + error.code);
                },
                null, // or, pass false
                {
                    //headers: {
                    //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                    //}
                }
            );
          }
 
          //文件创建失败回调
          function  onErrorCreateFile(error){
            console.log("文件創建失敗！")
          }
 
          //FileSystem加载失败回调
          function  onErrorLoadFs(error){
            console.log("文件載入失敗！")
          }