$(document)
		.ready(
				function() {
					$('#uxMemTab')
							.dataTable(
									{
										"ajax" : {
											"url" : "http://aquentuxsociety.apiary-mock.com/members",
											"dataSrc" : ""
										},
										"columns" : [
												{
													"data" : function(data) { 
														return data.firstName
																+ " "
																+ data.middleInitial
																+ " "
																+ data.surname;
													}
												},

												{
													"data" : "occupation"
												}, {
													"data" : "company"
												} ],
										"fnCreatedRow": function( nRow, data, iDataIndex ) {
									        $(nRow).attr('id', data.id);
									    }
									});
					

				});

var clicked=0;
$(document).on('click', '#uxMemTab tr', function(){
    var $rowClicked= $(this);
    var idClicked= $rowClicked.attr("id");
    dataRet="";
    console.log(idClicked);
    console.log("no of times Clicked "+clicked); 
   if(clicked==0){
	   console.log("make ajax call for fetching data ");
	  $.ajax({				  
		type: "GET",		   
		url : "http://aquentuxsociety.apiary-mock.com/members",
		cache: false,
		dataType: "text",
		success: getMemberData
		});
   }else{ 
	   console.log("data alreday avlable");
	   dataRet=JSON.parse(localStorage.getItem("memberData"));
	   getMemberData(dataRet);
   }
  
    
   function getMemberData(data){
	   var returnData="";
	    returnData=  eval('('+data+')');
	    if(clicked==0){
	    	localStorage.setItem("memberData",JSON.stringify(data));
	    	clicked ++;	
	    }else{
	    	console.log("data already avlble");
	    }
	   		
	   /*Take the id selected and find the other details for that user*/
	   getOtherDetails(returnData,idClicked, "id" );
   }
      
});
function  getOtherDetails(returnData,idclicked, value ){
	 var objects = [];  
	$.each(returnData, function(idx, obj) {
			if(idclicked== obj.id){
				console.log("Found Member");
				console.log(obj.email);
				objects.push(obj);
			}
			
		});
	  return populateMemberDetails(objects);
	
}
function populateMemberDetails(detailData){
	console.log("came in with data"+detailData[0].email+" portrait"+detailData[0].portrait);
	$('#portrait').attr('src',detailData[0].portrait);
	$("#gender").text(detailData[0].gender);
	$("#dob").text(detailData[0].birthday);
	$("#title").text(detailData[0].title);
	$('#fName').text(detailData[0].firstName);
	$('#mName').text(detailData[0].middleInitial);
	$('#lName').text(detailData[0].surname);
	$('#companyName').text(detailData[0].company);
	$('#email').text(detailData[0].email);
	$('#username').text(detailData[0].username);
	$('#occupation').text(detailData[0].occupation);
	$('#latitude').text(detailData[0].latitude);
	$('#longitude').text(detailData[0].longitude);
	$('#motto').text(detailData[0].motto);
	$("#streetAddress").text(detailData[0].streetAddress);
	$('#city').text(detailData[0].city +","+detailData[0].state+","+detailData[0].country+","+detailData[0].zipCode);
//	$('.ui-dialog').css("left","70%").css("top","50px");
	$('#dialog').dialog();
	
}