
const numbRows = 11;
const numbMin = 30;

var cycle = [];
var matches = [];

window.onload = function () {
    for(i = 0; i < numbMin; i++){
        cycle.push(i);
        matches.push(i+1);
    }
    cycle = cycle.shuffle();
    var tmp = [];
    for(var i = 0; i<cycle.length; i++) {
        tmp[cycle[i]] = cycle[(i+1)%cycle.length];
    }
    cycle = tmp;
    console.log(cycle);

    var table = document.getElementById('matches');
    for (i = 0; i < numbMin; i++) {
        var row = table.insertRow(-1);
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1);
    }
    splitTable();
}

function makeMatches() {
    var tables = document.getElementsByClassName("tableOfMatches");
    for(var i = 0; i<tables.length; i++){
        tables[i].style.visibility = 'visible';
    }
    matches = matches.move(cycle);
    console.log(matches);
    for(var i = 0; i<tables.length; i++){
        for(var k  = 1; k<tables[i].rows.length; k++){
            tables[i].rows[k].cells[1].innerHTML = matches[i*numbRows + k-1];
        }
    }

}

Array.prototype.move = function(cycle){
    var tmp = new Array(this);
    for(var i = 0; i<cycle.length; i++){
        tmp[cycle[i]] = this[i];
    }
    return tmp;

}

Array.prototype.shuffle = function() {
    var result = [];
    while( this.length ) {
        var index = Math.floor( this.length * Math.random() );
        result.push( this[ index ] );
        this.splice(index, 1);
    }
    return result;
};

function splitTable() {
    var $main = $('#matches'),
        $head = $main.find('tr:first'),
        $extraRows = $main.find('tr:gt('+numbRows+')');

    for (var i = 0; i < $extraRows.length; i = i + numbRows) {
        $('<table class="tableOfMatches">').append($head.clone(), $extraRows.slice(i, i + numbRows)).appendTo($main.parent());
    }
}
