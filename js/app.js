$.ajax({
	
 	url: 'https://randomuser.me/api/?results=12',
  	dataType: 'json',

	success: function(data) {

  		let users = data.results;

  		var cards = `<ul id="users" style="list-style: none;">
  					<div id="header">
  						<h2>AWESOME STARTUP EMPLOYEE DIRECTORY</h2>
  						<input id="searchBar" type="text" class="form-control col-md-2" name="searchBox" placeholder="Search by name...">
  					</div>`;
  		var i = 0;

  		$.each(users, function( index, value ) {

	  		cards  +=  `<li class="card" id="${i++}">
	  		 			<img class ="image" src="${users[index].picture.large}"> 
	  		 			 <div class="info">
			  		 		<p class= "fullName propper-noun"><i>${users[index].name.first} ${users[index].name.last}</i></p>			  		 		
							<p><i>${users[index].email}</i></p>
		  		 			<p class="propper-noun">${users[index].location.city}, ${users[index].nat}</p>
		  		 		 </div>
		  		 	    </li>`;	
  		});

  		cards += "</ul>";
    	$("#profiles").html(cards);

			var overlay = $('<div id="overlay">');
			$("body").append(overlay)

		 	$('.card').on("click", function (e) {

		 	var thisCard =  parseInt($(this).attr('id'));

		 	function updateModal(cardToShow) {
		 	$("#modal").html(`<div class="modal-image">
							<img src="${users[cardToShow].picture.large}"> 
						</div>
						<div class = "modal-info">
							<p class="propper-noun fullName">${users[cardToShow].name.first}  ${users[cardToShow].name.last}</p>
							<p>${users[cardToShow].email}</p>
							<p class="propper-noun">${users[cardToShow].location.city}</p>
							<hr>
							<p>${users[cardToShow].phone}</p>
							<div id="address">
								<p class="propper-noun">${users[cardToShow].location.street}</p>
								<p class="propper-noun">${users[cardToShow].location.city}</p>
								<p class="propper-noun">${users[cardToShow].location.state}</p> 
								<p>${users[cardToShow].location.postcode}</p>		 						
							</div>
							<p>Birthday: ${users[cardToShow].dob}</p>
							<div id="arrows">
								<a href="#" class="fa prev" id="prev" >&#xf060;</a>&nbsp&nbsp&nbsp<a href="#"  class="fa next" id="next">&#xf061;</a>	
							</div>	  
						</div>`);
			}

			 updateModal(thisCard);
			 $("#modal").slideDown();
			 
			 overlay.show();
			$("#modal").on('click', '#next', function () {
		
				if  (thisCard !== users.length-1) {
					thisCard ++;
					updateModal(thisCard);	
					
				} else {
					thisCard = 0;
					updateModal(thisCard);			 
				}	
			});

			
			$("#modal").on('click', '#prev', function () {  

				if (thisCard !== 0)	{	
					thisCard --;
					updateModal(thisCard);	

				} else {
					thisCard = users.length-1;
					updateModal(thisCard)
				}							 
			}); 	


		 	$(document).keyup(function(e) {
		 		if (e.keyCode == 39) { 

					if  (thisCard !== users.length-1) {
						thisCard ++;
						updateModal(thisCard);

					} else {0
						thisCard = 0;
						updateModal(thisCard);			 
					}	
				}	
			});

			$(document).keyup(function(e) {  

				if (e.keyCode == 37) { 

					if (thisCard !== 0)	{	
						thisCard --;
						updateModal(thisCard);	

					} else {
						thisCard = users.length-1;
						updateModal(thisCard)
					}
				}							 
			}); 
		 });	
		

		overlay.click(function(){
			
			overlay.hide();
		
			$("#modal").hide();
		});

		
		$(document).keyup(function(e) {

	    	 if (e.keyCode == 27) { 
		     	overlay.hide();
				$("#modal").hide();
    		}
		});

		var search = function() {

			
		   var filter = $('#searchBar').val().toLowerCase();
		   var li = $("#profiles li");

		    for (i = 0; i < li.length; i++) {
		        var seachItemsName = li[i].getElementsByTagName("i")[0];
		        var seachItemsUser = li[i].getElementsByTagName("i")[1];

		        if ((seachItemsName.innerHTML.toLowerCase().indexOf(filter) > -1) || (seachItemsUser.innerHTML.toLowerCase().indexOf(filter) > -1)) {
		            li[i].style.display = "";

		        } else {
		            li[i].style.display = "none";
		        }
		    }
		}

		$('#searchBar').on('keyup', search);

  	}	
});
