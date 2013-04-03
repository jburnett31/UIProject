/*function createTabs(){
    var st = "abcdefghijklmnopqrstuvwxyz";
    for (var i=0; i<st.length; i++){
        var d = document.createElement('div');
        var name = "names-" + st.charAt(i);
        $(d).attr("id", name);
        $(d).html("someone's name");
        $(d).css("display", "block");
        $(d).appendTo($("#names"));
        var l = document.createElement('li');
        var a = document.createElement('a');
        $(a).attr("href", "#" + name);
        $(a).html(st.charAt(i));
        $(a).appendTo($(l));
        $(l).appendTo($("#tab-list"));
    }
    $("#names").tabs();
}*/
