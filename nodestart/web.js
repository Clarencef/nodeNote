'use strict';

const http = require('http');
const url = require('url');
const zlib = require('zlib');

// demo #1 - including path and file system modules
const path = require('path');
const fs = require('fs');

const defaultFile = 'index.html';
const logFile = 'web.log';
const port = 8500;

// demo #5: rotate log file

// demo #4: append to log file

const server = http.createServer((req, res) => {

	req.originalUrl = req.url;
	req.url = url.parse(req.url, true);
	req.path = req.url.pathname === '/' ? defaultFile : req.url.pathname;

	// demo #2: using path functions to create requested file name

  // 聯合路徑 path.join([path1], [path2], [...])：將所有參數用path.seq串連起来，然後用normailze格式化 
	// ex: path.join('///foo', 'bar', '//baz/asdf', 'quux', '..');  
  // returns '/foo/bar/baz/asdf' 

	// 相對路境 path.relative(from, to)：返回某個路徑下相對於另一個路徑的相對位置串，
	// 相當於：path.resolve(from, path.relative(from, to)) == path.resolve(to) 

	// 路徑導航 path.resolve([from ...], to)：相當於不断的調用系统的cd命令
	// path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
	// cd foo/bar -> cd /tmp/file/ -> cd .. -> cd a/../subfile -> pwd

	// 格式化路徑  path.normalize(p): 將不符合規範的路徑格式化，簡化處理各種複雜的路境判斷
	// path.normalize('/foo/bar//baz/asdf/quux/..');  
  // returns '/foo/bar/baz/asdf'

	// 文件夾名稱 path.dirname(p): 返回路徑的所在的文件夾名稱
	// path.dirname('/foo/bar/baz/asdf/quux')  
  // returns '/foo/bar/baz/asdf'

	// 文件名稱 path.basename(p, [ext])： 返回指定的文件名，返回结果可排除[ext]後缀字符串 
  // path.basename('/foo/bar/baz/asdf/quux.html')  
  // returns 'quux.html'  
  // path.basename('/foo/bar/baz/asdf/quux.html', '.html')  
  // returns 'quux'

  let dirName = path.dirname(req.path);
	
	if(dirName.endsWith('/')) {
		dirName = dirName.slice(0,dirName.length-1);
	}

	const reqFileName = path.format({
		dir: path.join(__dirname, 'www', dirName),
		base: path.basename(req.path)
	});

	console.log(reqFileName);

	const processBody = new Promise(resolve => {

		resolve();

		// demo #6: process request body data

	});

	const processFile = new Promise(resolve => {

		resolve();

		res.writeHead(200);
		res.end('Hello World!');

		// demo #3: read request file

		// demo #7: compressing response

	});

	processBody.then(() => processFile);

});

server.listen(port, err => console.log(err || `web server started on port ${port}`));