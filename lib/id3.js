/*
 * JavaScript ID3 Tag Reader 0.1.2
 * Copyright (c) 2008 Jacob Seidelin, cupboy@gmail.com, http://blog.nihilogic.dk/
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 *
 * Extended by António Afonso (antonio.afonso@opera.com), Opera Software ASA
 * Modified by António Afonso <antonio.afonso gmail.com>
 */

var fs = require("fs");
var BinaryFile = require("./binaryfile");
var ID4 = require("./id4");
var ID3v2 = require("./id3v2");
var ID3v1 = require("./id3v1");

var ID3 = {};
var _files = {};
// location of the format identifier
var _formatIDRange = [0, 7];

/**
 * Finds out the tag format of this data and returns the appropriate
 * reader.
 */

function getTagReader(data) {
    // FIXME: improve this detection according to the spec
    return data.getStringAt(4, 7) == "ftypM4A" ? ID4 :
        (data.getStringAt(0, 3) == "ID3" ? ID3v2 : ID3v1);
}

function readTags(reader, data, url, tags) {
    var tagsFound = reader.readTagsFromData(data, tags);
    //console.log("Downloaded data: " + data.getDownloadedBytesCount() + "bytes");
    var tags = _files[url] || {};
    for (var tag in tagsFound)
        if (tagsFound.hasOwnProperty(tag)) {
            tags[tag] = tagsFound[tag];
        }
    _files[url] = tags;
}

ID3.clearTags = function(url) {
    delete _files[url];
};

ID3.clearAll = function() {
    _files = {};
};

ID3.getAllTags = function(url) {
    if (!_files[url]) return null;

    var tags = {};
    for (var a in _files[url]) {
        if (_files[url].hasOwnProperty(a))
            tags[a] = _files[url][a];
    }
    return tags;
};

ID3.getTag = function(url, tag) {
    if (!_files[url]) return null;

    return _files[url][tag];
};
ID3.localTags = function(file, cb, options) {
    options = options || {};

    fs.readFile(file, {
        encoding: 'binary'
    }, function(err, fileStr) {
        if (err) {
            throw err;
        } else {
            var data = new BinaryFile(fileStr);
            data.loadRange(_formatIDRange, function() {
                var reader = getTagReader(data);
                reader.loadData(data, function() {
                    readTags(reader, data, file, options["tags"]);
                    if (cb) cb();
                });
            });
        }
    });
};

// Export functions for closure compiler
ID3["getAllTags"] = ID3.getAllTags;
ID3["getTag"] = ID3.getTag;
ID3["clearTags"] = ID3.clearTags;
ID3["clearAll"] = ID3.clearAll;
ID3["localTags"] = ID3.localTags;

module.exports = ID3;