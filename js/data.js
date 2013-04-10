//want an object that encompasses creation of records from a file
function Dataset(filePath){ //mock-up only expects a tab delimited string
    var inString = filePath; // for mock-up data
    var records = [];
    var lines = inString.split('\n');
    var headers = lines[0].split('\t');
    for (var i = 1; i < lines.length; i++) {
        if (lines[i] == "") break;
        var line = lines[i].split('\t');
        var record = {};
        for (var j=0; j<line.length; j++) {
            record[headers[j]] = line[j];
        }
        records.push(record);
    }
    return records;
}

function getNames(data){
    var ab = "abcdefghijklmnopqrstuvwxyz";
    var names = {};
    for (var i=0; i<ab.length; i++){
        names[ab[i]] = [];
        for (var j=0; j<data.length; j++){
            var reg = new RegExp("^" + ab[i], 'i');
            if (data[j].Last.match(reg)){
                names[ab[i]].push(data[j].Last+", "+data[j].First);
            }
        }
        names[ab[i]].sort();
    }
    return names;
}
