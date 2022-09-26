var fs = require('fs');

// Handles file reading / writing and merge into file

var queryCount = [false, false, false];

function mergeValues(values, content) {
    var newContent = content;
    for (var key in values) {
        newContent = newContent.replace(`{{${key}}}`, values[key])
    }

    return newContent;
}

function prepare(templateName, values) {
    // read from template
    var fileContents = fs.readFileSync('./client/' + templateName, {encoding: "utf-8"});
    // values to plug'
    fileContents = mergeValues(values, fileContents);
    // response to client
    return fileContents
};


module.exports.prepare = prepare;