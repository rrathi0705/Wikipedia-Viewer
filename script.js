$(document).ready(function(){
	var searchString="";
	var url = "";
	var liIndex = 0;
	$("#autocomplete").hide();
	
	$("#searchbox").keyup(function(e){

		// Enter is Pressed
		if(e.keycode == 13){

			//add active autocomplete li item to textbox
			if($("li").hasClass("active")){
				searchString = $(".active").text();
				$("#searchbox").val(searchString);
				$("#autocomplete").empty();
				$("#autocomplete").hide();
			}
			else{

				$.getJSON(getUrl(),function(data){
            getResultHTML(data);
            liIndex = 0;
				});
			}	
		}
		// Escape Key
		else if(e.keycode == 27){
			$("#autocomplete").hide();
		}
		// Downkey pressed  
		else if(e.keycode == 40){
			liIndex ++;
			if(liIndex>10)
				liIndex = 1;	
      $("li").removeClass("active");
      $("#list" + liIndex).addClass("active");
		}
		// up key pressed
		else if(e.keycode == 38){
			liIndex--;
			if(liIndex<1)
				liIndex = 10; 
      $("li").removeClass("active");
      $("#list" + liIndex).addClass("active");
		}
		// get other set of autocomplete suggestion if some other key presses
		else {
			$.getJSON(getUrl(),function(data){
      getAutoCompleteHTML(data);
            liIndex = 0;
			});
		}
	});

	//if search button clicked

	$("#search-btn").click(function(){
		$.getJSON(getUrl(),function(data){
      console.log(data);
			getResultHTML(data);
		});
	});
	// add li item to search box when clicked
	$(document).on('click','.suggestion',function(){
		searchString = $(this).text();
		$("#searchbox").val(searchString);
		$("#autocomplete").empty();
		$("#autocomplete").hide();
	});
	// if searchbox empty
	if($("#searchbox").val() === ""){
		$("#autocomplete").hide();
	}
function getUrl(){
  searchString = $("#searchbox").val();
		url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + searchString + "&namespace=0&limit=10&callback=?";
		return url;
}
	function getResultHTML(data){
      $("#autocomplete").empty();
      $("#autocomplete").hide();
    $("#results").empty();
    for(var i = 0;i<data[3].length;i++){
      var resultHTML = "<a class='link' href='" + data[3][i] + "'><div class='result'><div class='title'>" + data[1][i] + "</div><div class='info'>" + data[2][i] +"</div></div></a>";
      $("#results").append(resultHTML);
      liIndex = 0;
    }
	}
  function getAutoCompleteHTML(data){
    $("#autocomplete").empty();
    $("#autocomplete").show();
    var suggestionList = data[1];
    for(var i =0;i<suggestionList.length;i++){
      $("#autocomplete").append($('<li class="suggestion" id="list' + (i+1) + '">' + suggestionList[i] + '</li>'));
    }
  }
});