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
    var img = "DirectoryData/KingsGatePeoplePhotos/";
    for (var i=0; i<ph.length; i++)
    {
        var re = new RegExp("^" + row["KG Number"], "g");
        if (ph[i].match(re))
        {
            img += ph[i];
            break;
        }
    }
    return img;
}

function getUnitPhoto(ph, row)
{
    var img = "DirectoryData/KingsGateUnitPhotos/";
    for (var i=0; i<ph.length; i++)
    {
        var re = new RegExp("^" + row["KG Number"], "g");
        if (ph[i].match(re))
        {
            img += ph[i];
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
        re = new RegExp(".*"+value+".*", "gi");
        if (db[i][field].match(re))
            results.push(db[i]);
    }
    return results;
}

function PersonPage(container, previous, dbfield)
{
    var cont = $("#"+container),
        image = document.createElement("div"),
        infocontainer = document.createElement("div"),
        info = document.createElement("div"),
        hobbies = document.createElement("div"),
        unit = document.createElement("div"),
        namespan = document.createElement("div"),
        backButton = document.createElement("div"),
        fullname = dbfield["First"] +" "+ dbfield["Last"];

    $(cont).empty();
    $(image).attr("id","person_image");
    $(image).addClass("shadow");
    $(info).attr("id","person_info");
    $(infocontainer).attr("id","info_container");
    $(namespan).attr("id","name_header");
    $(hobbies).attr("id","person_hobbies");
    $(unit).attr("id","person_unit");

    $(unit).html("Go to Unit page");
    $(unit).click(function(){
        var u = new UnitPage("unit_page", cont, dbfield);
        $(cont).hide();
        $(u).show();
    });

    $(image).html("<img id=\"person_photo\" src=\"" + getPersonPhoto(personPhotos, dbfield) +"\"/>");

    $(image).appendTo($(cont));
    $(namespan).appendTo($(infocontainer));

    $(backButton).html("Back");
    $(backButton).attr("id", "person_back");
    $(backButton).css({height: "40px", width: "60px", position: "relative", top: "100px"});
    $(backButton).appendTo($(cont));
    (function(bu, prev)
     {
         $(bu).click(function(){
             $(cont).hide();
             $(prev).show();
         });
     })(backButton, previous);

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

    return $(cont);

    function getAddress(row)
    {
        address = ["KG Number", "KG street"];
        regAddr = [];
        for (var i=0; i<address.length; i++)
        {
            if (row[address[i]] == null || row[address[i]].match(/^\s*$/g))
                continue;
            else
                regAddr.push(row[address[i]]);
        }
        return regAddr.join(", ");
    }

    function getSummerAddr(row)
    {
        summer_address = ["Summer Address", "Summer City", "Summer State", "Summer Zip"];
        sumAddr = [];
        for (var i=0; i<summer_address.length; i++)
        {
            var tmp = row[address[i]];
            if (tmp == null || tmp.match(/^\s*$/g))
                continue;
            else
                sumAddr.push(tmp);
        }
        return sumAddr.join(", ");
    }

    function getInfo(row)
    {
        var infoList = document.createElement("ul"),
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

function UnitPage(container, previous, dbfield)
{
    var cont = $("#"+container),
        image = document.createElement("div"),
        img = document.createElement("img"),
        title = document.createElement("div"),
        info = document.createElement("div"),
        back = document.createElement("div"),
        forward = document.createElement("div");

    $(image).addClass("shadow");
    $(img).attr("src", getUnitPhoto(unitPhotos, dbfield));
    $(img).appendTo($(image));
    $(image).appendTo($(cont));
    $(title).addClass("name_header");
    $(title).html("Lot #" + dbfield["KG Number"]);
    $(title).appendTo($(cont));

    //info

    $(back).html("Previous Unit");
    $(back).appendTo($(cont));
    $(forward).html("Next Unit");
    $(forward).appendTo($(cont));

    return $(cont);
}

function UnitResultPage(container, db, field, value)
{

}

function PeopleResultPage(container, db, field, value)
{
    var cont = $("#"+container),
        results = search(db, field, value),
        query = document.createElement("div"),
        fields = ["First", "Last"];

    for (var i in results)
    {
        var thumb = document.createElement("img"),
            name = document.createElement("div"),
            item = document.createElement("div");
        $(thumb).attr("src", getPersonPhoto(personPhotos, results[i]));
        $(thumb).attr({height: "40px", width: "40px"});
        $(thumb).css({float: "left"});
        $(thumb).appendTo($(item));
        $(name).html(results[i]["First"] + " " + results[i]["Last"]);
        $(name).addClass("result_name");
        $(name).appendTo($(item));
        $(item).addClass("result_item");
        $(item).appendTo($(cont));
        (function(it, res){
            $(it).click(function(){
                var p = new PersonPage("person_container", container, res);
                $(cont).hide();
                $(p).show();
            });
        })(item, results[i]);
    }
    return $(cont);
}
