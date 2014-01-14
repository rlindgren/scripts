

var fs = fs || require('fs');
var util = util || require('util');
var path = path || require('path');
var uu = require('lodash');

// --------------------------------
// arity: 2 || 3
// --------------------------------
// dirList : list : 
// 	-	[ basePathA, basePathB, ... ]
// stringsList : matrix : list
// 	-	[ [ currentA, replacementA ], [ currentB, replacementB ], ... ]
// 	-	OR
// 	-	[ actualA, actualB, ... ]
// replacementList : list (optional)
// 	-	[ replacementA, replacementB, ... ]
// 	
module.exports.recursiveReplace = function recursiveReplace (dirList, stringsMatrix, replacementList) {

	for (var i = 0; i < dirList.length; i++) {
		var startDir = path.resolve(dirList[i]);

		(function walk (start) {
			fs.readdirSync(start).forEach(function (f) {


				var filePath = path.join(start, f);

				for (var y = 0; y < stringsList.length; y++) {
					var oldString = stringsList[y][0];
					var newString = stringsList[y][1];

					if (!fs.lstatSync(filePath).isDirectory()) 
						fs.writeFileSync(filePath, fs.readFileSync(filePath).toString().replace(oldString, newString));
					else walk(filePath);

				}


			});
		})(startDir);
		console.log('string replace complete.');
	}
};

// --------------------------------
// arity: 1 || 5
// --------------------------------
// takes 5 parameters || takes one list || takes one object with 5 named properties
// 
// filePath : string : list : object
// 	-	path of the file to read
// newPath : bool : 
// 	-	overwrite file
// start : string
// 	-	block begins
// end : string
// 	-	block ends
// content : string
// 	-	replacement content
// 	
module.exports.replaceBlockComment = function (filePath, newPath, start, end, content) {

	if (Array.isArray(filePath))
		uu.extend(this, uu.zipObject(['filePath', 'newPath', 'start', 'end', 'content'], filePath));

	if (typeof filePath === 'object')
		uu.extend(this, filePath);

	if (newPath) filePath = newPath;

	console.log(arguments, filePath, newPath, start, end, content, this['newPath']);

	var fileContentString = fs.readFileSync(this['filePath']).toString();
	var block = fileContentString.substring(fileContentString.indexOf(this['start']) + 1, fileContentString.indexOf(this['end']));

	console.log(fileContentString.replace(block, this['content']));

	fs.writeFileSync(this['filePath'], fileContentString.replace(block, this['content']));
};

// --------------------------------
// arity: 2 || 3 || 4
// --------------------------------
// basePath : string
// 	-	base directory
// exts : string : list
// 	-	file extensions to capture
// relativeBase : string (optional)
// 	-	relative base directory
// leadingSlash : bool (optional)
// 	-	has leading slash
// 	
module.exports.recursiveCollectPaths = function (basePath, exts, relativeBase, leadingSlash) {

	basePath = path.resolve(basePath);


	return uu.flatten(Array.prototype.concat(exts).map(function (ext) {

		var pathList = [];

		(function walk (start) {
			fs.readdirSync(start).forEach(function (f) {


				var filePath = path.join(start, f);

				
				if (path.extname(filePath).split('.').pop() === ext)
					pathList.push(filePath.slice(
						filePath.indexOf(relativeBase || filePath) + (relativeBase ? relativeBase.length : 0) + (leadingSlash ? 0 : 1), 
						filePath.length
					));
				else if (fs.lstatSync(filePath).isDirectory()) walk(filePath);


			});
		})(basePath);

		return pathList;
		
	}));
};

