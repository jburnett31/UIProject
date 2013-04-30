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

personPhotos = personPhotos.split(", ");
unitPhotos = unitPhotos.split(", ");

function getPersonPhoto(ph, row)
{
    var img = "";
    for (var i=0; i<ph.length; i++)
    {
        var re = new RegExp("^" + row["KG Number"], "g");
        if (ph[i].match(re))
        {
            img = ph[i];
            break;
        }
    }
    return img;
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
    var cont = $("#"+container),
        image = document.createElement("div"),
        infocontainer = document.createElement("div"),
        info = document.createElement("div"),
        hobbies = document.createElement("div"),
        unit = document.createElement("div"),
        namespan = document.createElement("div"),
        fullname = dbfield["First"] +" "+ dbfield["Last"];

    $(cont).empty();
    $(image).attr("id","person_image");
    $(image).addClass("shadow");
    $(info).attr("id","person_info");
    $(infocontainer).attr("id","info_container");
    $(namespan).attr("id","name_header");
    $(hobbies).attr("id","person_hobbies");
    $(unit).attr("id","person_unit");

    $(image).html("<img id=\"person_photo\" src=\"DirectoryData/KingsGatePeoplePhotos/" + getPersonPhoto(personPhotos, dbfield) +"\"/>");

    $(image).appendTo($(cont));
    $(namespan).appendTo($(infocontainer));
    $(info).appendTo($(infocontainer));
    $(unit).appendTo($(infocontainer));
    $(infocontainer).appendTo($(cont));
    $(hobbies).appendTo($(cont));
    if (dbfield["Approval"] != "declined")
    {
        $(namespan).html(fullname + "<hr />");
        $(info).html(getInfo(dbfield));

        $(hobbies).html();

    } else {
    }

    function getInfo(row)
    {
        var infoList = document.createElement("ul"),
            address = ["KG Number", "KG street"],
            summer_address = ["Summer Address", "Summer City", "Summer State", "Summer Zip"],
            contact_info = ["KG phone", "cell phone", "e-mail", "Summer phone"],
            fields = ["Education", "Occupation/Profession", "Military Service", "Hobbies/Interests", "Volunteer Activities", "children", "Grandchildren", "Great Grandchildren", "KingsGate History", "Other Information"];

        $(infoList).addClass("info_list");

        for (var i=0; i<fields.length; i++)
        {
            if (row[fields[i]] == null || row[fields[i]].match(/^\s*$/g))
                continue;
            else
            {
                var item = document.createElement("li");
                $(item).addClass("info_item");
                var tmp = fields[i] + ": " + row[fields[i]];
                $(item).html(tmp);
                $(item).appendTo($(infoList));
            }
        }
        return infoList;
    }
}
