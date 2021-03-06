//initialize function called when the script loads
function initialize() {
	cities();
    jQueryAjax();
    debugAjax();
};

//function to create a table with cities and their populations
function cities(){
	//define two arrays for cities and population
	var cityPop = [
        { 
            city: 'Chicago',
            population: 2716000
        },
        {
            city: 'Minneapolis',
            population: 422331
        },
        {
            city: 'Saint Paul',
            population: 306621
        },
        {
            city: 'Indianapolis',
            population: 872680
        }
    ];

    //append the table element to the div
	$("#mydiv").append("<table>");

	//append a header row to the table
	$("table").append("<tr>");
	
	//add the "City" and "Population" columns to the header row
	$("tr").append("<th>City</th><th>Population</th>");
	
	//loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    }

    addColumns(cityPop);
    addEvents();
};

//add new column city size to the table
function addColumns(cityPop){
    
    $('tr').each(function(i){
        
    	if (i == 0){
    		$(this).append('<th>City Size</th>');
            
    	} else {
    		var citySize;
            //label city size based on city population
    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';
    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';
    		} else {
    			citySize = 'Large';
    		};

    		$(this).append('<td>' + citySize + '</td>');
    	};
    });
};

//add capability to interact with table
function addEvents(){
    //mouseover web page to change the text color randomly
	$(this).mouseover(function(){
        var color = 'rgb(';
        for (var i=0; i<3; i++){
            var random = Math.round(Math.random() * 255);
            color += random;
        if (i<2){
            color += ',';
        } else {
            color += ')';
        }};

        $('table').css('color', color);
    });
    //click the text to create a click alert
	function clickme(){
		alert('Hey, you clicked me!');
	}
	$(this).on('click', clickme);
};


//lesson 3
function jQueryAjax(){
    var mydata;
    
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;
            
            console.log(mydata);
        }
    });
    //logs the megacity data to the console
    console.log(mydata);
};



//call function after initialization
function debugAjax(){
    //define mydata as var
	var mydata;

    //identifies the file to pull data from
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function(response){
            //stringifies the json file under a header
            $(mydiv).append('<br>GeoJSON data:<br>' + JSON.stringify(response));
			//separates the json data from the city table with a break
		}
	});
};



//call the initialize function when the document has loaded
$(document).ready(initialize);