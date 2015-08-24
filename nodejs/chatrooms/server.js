/**
 * Created by kangxiongwei on 2015/8/23.
 */

//http服务器和客户端功能
var http = require("http");
//提供文件系统的相关功能
var fs = require("fs");
//与文件路径系统相关的功能
var path = require("path");
//根据文件扩展名得到相应MIME类型的能力
var mime = require("mime");
//缓存文件内容的对象
var cache = {};


function send404(response){
    response.writeHead(404,{"Content-Type":"text/plain"});
    response.write("Error 404: resource not found.");
    response.end();
}

function sendFile(response,filePath,fileContents){
    response.writeHead(200,{
        "Content-Type":mime.lookup(path.basename(filePath))
    });
    response.end(fileContents);
}

function serveStatic(response,cache,absPath){
    if(cache[absPath]){
        sendFile(response,absPath,cache[absPath]);
    } else {
        fs.exists(absPath,function(exist){
            if(exist){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    } else {
                        cache[absPath] = data;
                        sendFile(response,absPath,data);
                    }
                })
            } else {
                send404(response);
            }
        })
    }
}

var server = http.createServer(function(request, response) {
    var filePath = false;
    if (request.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }
    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(3000,function(){
    console.log("Server listening on port 3000");
});

var chatServer = require("./lib/chat_server");
chatServer.listen(server);