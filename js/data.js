//want an object that encompasses creation of records from a file
function Dataset(fileString){ //expects a tab delimited string
    var inString = fileString;
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

function getFieldNames(db)
{
    return Object.keys(db[0]);
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

function getHobbies(db)
{
    var arr = [];
    for (var i=0; i<db.length; i++)
    {
       var tmp = db[i]["Hobbies/Interests"].split(",");
       for (var j=0; j<tmp.length; j++)
        {
            var s = tmp[j].toLowerCase();
            arr.push(s.replace(/(^\s+|\")+/g, ''));
        }
    }

    arr = $.grep(arr, function(v, k){
        return $.inArray(v ,arr) === k;
    });
    arr.sort();
    return arr;
}

function search(db, field, value)
{
    results = [];
    for (var i=0; i<db.length; i++)
    {
        re = new RegExp(value, "gi");
        if (db[i][field].match(re))
            results.push(db[i]);
    }
    return results;
}

function PersonPage(container, dbfield)
{
    var cont = $("#"+container);

}
