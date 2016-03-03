$(function() {


	

	// onload hide few items..
	$("#tickerTableWrapper").hide();
	$("#chart_div").hide();
	$("#buttonGroup").hide();

	/*
	 * var tickerList = [ "Google", "Apple", "Yahoo", "Cisco", "Wellsfargo",
	 * "Visa", "Facebook", "Twitter", "Tesla", "Salesforce" ];
	 */

	// var tickerList = {"Google":"GOOG", "Apple":"AAPL", "Yahoo":"YHOO",
	// "Cisco":"CSCO", "Wellsfargo":"WFC",
	// "Visa":"V", "Facebook":"FB", "Twitter":"TWTR", "Tesla":"TSLA",
	// "Salesforce":"CRM" };
	var tickerList = [ {
		value : "GOOG",
		label : "GOOG google"
	}, {
		value : "AAPL",
		label : "AAPL apple"
	}, {
		value : "YHOO",
		label : "YHOO yahoo"
	}, {
		value : "CSCO",
		label : "CSCO cisco"
	}, {
		value : "WFC",
		label : "WFC wellsfargo"
	}, {
		value : "FB",
		label : "FB facebook"
	}, {
		value : "TWTR",
		label : "TWTR twitter"
	}, {
		value : "TSLA",
		label : "TSLA tesla"
	}, {
		value : "CRM",
		label : "CRM salesforce"
	} ]

	// var tickerList = {"GOOG":"google",
	// "AAPL":"apple","YHOO":"yahoo","CSCO":"cisco"};

	var jsonSample = {
		"quoteResponse" : {
			"quoteData" : {
				"dateTime" : "14:52:52 EST 01-04-2011",
				"option" : {
					"ask" : 94.73,

					"askSize" : 100,
					"bid" : 94.57,
					"bidSize" : 300,
					"companyName" : "GOOGLE INC",
					"daysToExpiration" : 0,
					"lastTrade" : 94.7299,
					"openInterest" : 0
				},
				"product" : {
					"symbol" : "GOOG",
					"type" : "EQ",
					"exchange" : "Q"
				}
			}
		}
	};

	/*
	 * $('#search').autocomplete({
	 * 
	 * source : function(request,response){ response($.map(tickerList,
	 * function(value,key){ return{ label:key, value:value }; })); } });
	 */

	var option1 = "Apr 15 2016";
	var option2 = "May 15 2016";
	var option3 = "Jun 15 2016";
	var option4 = "Jul 15 2016";
	var option5 = "Aug 15 2016";
	var option6 = "Sep 15 2016";

	var tickerOption1 = "55";
	var tickerOption2 = "60";
	var tickerOption3 = "65";
	var tickerOption4 = "70";
	var tickerOption5 = "80";
	var tickerOption6 = "85";
	var tickerOption7 = "90";

	var last = jsonSample.quoteResponse.quoteData.option.lastTrade;
	var ask = jsonSample.quoteResponse.quoteData.option.ask;
	var bid = jsonSample.quoteResponse.quoteData.option.bid;

	var call = "call";
	var put = "put";

	var realTimeData = "<div><span style='font-size: 15px; color: red; font-family: Verdana, Geneva, sans-serif'>Last:</span>"
			+ last
			+ "</div>"
			+ "<div><span style='font-size: 15px; color: red; font-family: Verdana, Geneva, sans-serif'>Ask:</span>"
			+ ask
			+ "&nbsp;&nbsp<span style='font-size: 15px; color: red; font-family: Verdana, Geneva, sans-serif'>Bid:</span>"
			+ bid + "</div>"

	var actionSelect = "<div class='form-group'>"
			+ "<div class='col-sm-6 col-md-4'>"
			+ "<select id='actionSelect' class='select-form-control'>"
			+ "<option value='1'>Buy to Open</option>" + "<option value='-1'>Sell to Open</option>"
			+ "</select>" + "</div>" + "</div>"; 



		/*var tickerMonth = "<div class='form-group'>"
			+ "<div class='col-sm-6 col-md-4'>"
			+ "<select name='tickerMonth' id='tickerMonth' class='select-form-control'>"
			+ "</select>" + "</div>" + "</div>";*/

	var tickerSelect = "<div class='form-group'>"
			+ "<div class='col-sm-6 col-md-4'>"
			+ "<select name='strike' id='strike' class='select-form-control'>"
			+ "<option></option>" + "<option>"
			+ tickerOption1
			+ "</option>"
			+ "<option>"
			+ tickerOption2
			+ "</option>"
			+ "<option>"
			+ tickerOption2
			+ "</option>"
			+ "<option>"
			+ tickerOption3
			+ "</option>"
			+ "<option>"
			+ tickerOption4
			+ "</option>"
			+ "<option>"
			+ tickerOption5
			+ "</option>"
			+ "<option>"
			+ tickerOption6
			+ "</option>"
			+ "<option>" + tickerOption7 + "</option>" +

			"</select>" + "</div>" + "</div>";

	var callPutSelect = "<div class='form-group'>"
			+ "<div class='col-sm-6 col-md-4'>"
			+ "<select name='callPut' id='callPut' class='select-form-control'>"
			+ "<option value='1'>" + call + "</option>" + "<option value='0'>" + put + "</option>" +

			"</select>" + "</div>" + "</div>";
	
	var tickerMonthsList;
	var strikeListByDate;
	var askBid;
	counter = 0;
	
	function getTickerMonths(selectedTicker){
		$.ajax({
			url : "../expirations",
			dataType: 'json',
			data : "selectedTicker="+selectedTicker,
			success:function(Data){
				console.log("Data---"+JSON.parse(Data));
				
				
				
			}
		}).then(function(data) {			
			tickerMonthsList = $.parseJSON(data);
			
			$.each(tickerMonthsList,function(i,item){
				
				console.log("Items from List---"+item);
				
				
				$('#tickerMonthSelect').append('<option>' + item + '</option>');
				
			});
			
			console.log("Result---"+tickerMonthsList);
			
			
		});
	}
	
	//url not working
	
	//http://localhost:8080/optionscircle/askbid?selectedDate=15%20Jul%202016&selectedTicker=AAPL&callPutSelected=call&selectedStrike=50.00
	
	var selectedTicker;
	var counterAddRow = 0;

	$("#addRow")
			.bind(
					"click",
					(function() {

						counterAddRow++;
						console.log("tickerOption1--" + tickerOption1);
						console.log("tickerOption2--" + tickerOption2);
						//var selectedTicker = $("#search").val();
						selectedTicker = $("#search").val();
						console.log("Counter-------->" + counterAddRow);
						
						console.log("List of dates for each ticketer--->>>"+tickerMonthsList);
						if (counterAddRow < 4) {
							$("#tableBody")
									.append(
											"<tr><td><span class='tickerCodeStyle'>"
													+ selectedTicker
													+ "</span></td>"
													+ "<td id='actionSelect"
													+ counterAddRow
													+ "'>"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select id='action"+counterAddRow+"' class='select-form-control'>"
													+ "<option value='1'>Buy to Open</option>" + "<option value='-1'>Sell to Open</option>"
													+ "</select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td id='ticketMonth"
													+ counterAddRow
													+ ">"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select name='tickerMonth' id='tickerMonthSelect_addRow"+counterAddRow+"' class='select-form-control'>"
													+ "<option></option></select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td id='ticketStrike"
													+ counterAddRow
													+ "'>"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select name='strike' id='strike"+counterAddRow+"' class='select-form-control'>"
													+ "<option></option></select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td id='callPut"
													+ counterAddRow
													+ "'>"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select name='callPut' id='callPutSelect"+counterAddRow+"' class='select-form-control'>"
													+ "<option></option><option value='1'>" + call + "</option>" + "<option value='0'>" + put + "</option>" +
													"</select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td>1</td>"
													+ "<td id='realtimeData"
													+ counterAddRow
													+ "'>"
													+ "<div id='last"+counterAddRow+"'></div>"
													+ "<div id='askBid"+counterAddRow+"'></div>"
													+ "</td>"
													+ "<td>"
													+ "<button type='button' class='btn btn-default' aria-label='Left Align'>"
													+ "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"
													+ "</button>" + "</td>"
													+ "</tr>")
													
												
													if(counterAddRow == 1){
														
													//getTickerMonths_addRow1(selectedTicker);
														
														//getTickerDates
														$.each(tickerMonthsList,function(i,item){
															
															console.log("Items from List---"+item);
															$('#tickerMonthSelect_addRow1').append('<option>' + item + '</option>');
															
															console.log("strikeList in count1---"+strikeListByDate);
															
														});
														
														
														
													}else if(counterAddRow == 2){
														//getTickerMonths_addRow2(selectedTicker);	
														
														//getTickerDates
														$.each(tickerMonthsList,function(i,item){
															
															console.log("Items from List---"+item);
															$('#tickerMonthSelect_addRow2').append('<option>' + item + '</option>');
															console.log("strikeList in count2---"+strikeListByDate);
	
														});
														
																
													}else if(counterAddRow == 3){
															
														//get TickerDates
														$.each(tickerMonthsList,function(i,item){
															
															console.log("Items from List---"+item);
															$('#tickerMonthSelect_addRow3').append('<option>' + item + '</option>');
															console.log("strikeList in count3---"+strikeListByDate);

														});	
																
													}
							
											///////////////////Get Strike List and AskBid///////////////////////////
											//Call Strike on Change of Date
											
											
											$("#tickerMonthSelect_addRow"+counterAddRow).change(function(){
											
													var selectedSelectBoxId = $(this).attr('id');
												//alert("selected Date---"+$("#tickerMonthSelect"+counter).find('option:selected').val());
												console.log("Selected Date===="+$("#tickerMonthSelect_addRow"+counterAddRow).find('option:selected').val());
												var selectedDate = $("#"+selectedSelectBoxId).find('option:selected').val();
												
												
												
												//Get Strikes By Month
												$.ajax({
													url : "../strikes",
													dataType: 'json',
													data : "selectedDate="+selectedDate+"&selectedTicker="+selectedTicker,
													success:function(Data){
														console.log("Strike List---"+JSON.parse(Data));
													}
												}).then(function(data) {			
													strikeListByDate = $.parseJSON(data);
													
													$.each(strikeListByDate,function(i,item){
														
														console.log("Items from Strike---"+item);
														
														
														$('#strike'+counterAddRow).append('<option>' + item + '</option>');
														
													});
													
													console.log("strikeListByDate Result---"+strikeListByDate);
													
													
												});
											});
											
											
											
											//On change of Call/Put
											$("#callPutSelect"+counterAddRow).change(function(){
												
												
												var selectedSelectBoxId = $(this).attr('id');
												 var currentRow = selectedSelectBoxId.substring(selectedSelectBoxId.length, selectedSelectBoxId.length-1);

												//alert("selected---"+$('#callPutSelect'+counter).find('option:selected').val());
												console.log("Action===="+$("#callPutSelect"+counterAddRow).find('option:selected').val());
												
												var callPutSelected = $("#"+selectedSelectBoxId).find('option:selected').val();
												var selectedStrike = $('#strike'+currentRow).find('option:selected').html();
												
												var date = $("#tickerMonthSelect_addRow"+counterAddRow).find('option:selected').html();
												
												
												//Get Strikes By Month
												$.ajax({
													url : "../askbid",
													dataType: 'json',
													data : "selectedDate="+date+"&selectedTicker="+selectedTicker+"&callPutSelected="+callPutSelected+"&selectedStrike="+selectedStrike,
													success:function(Data){
														console.log("Strike List---"+JSON.parse(Data));
													}
												}).then(function(data) {			
													askBid = $.parseJSON(data);
													
													console.log("AskBid Last=="+askBid.Last);
													console.log("AskBid ask=="+askBid.Ask);
													console.log("AskBid bid=="+askBid.Bid);
													
												
													$("#last"+currentRow).html("<span class='askBidStyle'>Last:</span><span id='askBidLast"+currentRow+"'>"+askBid.Last+"</span>");
													$("#askBid"+currentRow).html("<span class='askBidStyle'>Ask:</span>"+ askBid.Ask+ "&nbsp;&nbsp<span class='askBidStyle'>Bid:</span>"+ askBid.Bid);
												
												});
											});
											////////////////////End StrikeList and AskBid//////////////////////////
						};
					}));

	$('#search')
			.autocomplete(
					{

						source : tickerList,
						select : function(event, ui) {

							$("#tickerTableWrapper").show();
							$("#buttonGroup").show();
							$("#chart_div").hide();

							// alert("Test---"+ui.item.value);

							// counter++;
							$("#tickerTable > tbody").empty();
							
							
							console.log("tickerOption1--" + tickerOption1);
							console.log("tickerOption2--" + tickerOption2);
							var selectedTicker = $("#search").val();
							
							console.log("ui.item.value=="+ui.item.value);
							
		
							
							$("#tableBody")
									.append(
											"<tr id='"
													+ counter
													+ "'><td><span style='font-size: 15px; color: blue; font-family: Verdana, Geneva, sans-serif'>"
													+ ui.item.value
													+ "</span></td>"
													+ "<td id='actionSelect"
													+ counter
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select id='action"+counter+"' class='select-form-control'>"
													+ "<option value='1'>Buy to Open</option>" + "<option value='-1'>Sell to Open</option>"
													+ "</select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td id='ticketMonth"
													+ counter
													+ "'>"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select name='tickerMonth' id='tickerMonthSelect"+counter+"' class='select-form-control'>"
													+ "<option></option></select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td id='ticketStrike"
													+ counter
													+ "'>"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select name='strike' id='strike"+counter+"' class='select-form-control'>"
													+ "<option></option></select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td id='callPut"
													+ counter
													+ "'>"
													+ "<div class='form-group'>"
													+ "<div class='col-sm-6 col-md-4'>"
													+ "<select name='callPut' id='callPutSelect"+counter+"' class='select-form-control'>"
													+ "<option></option><option value='1'>" + call + "</option>" + "<option value='0'>" + put + "</option>" +
													"</select>" + "</div>" + "</div>"
													+ "</td>"
													+ "<td>1</td>"
													+ "<td id='realtimeData"
													+ counter
													+ "'>"
													+ "<div id='last"+counter+"'></div>"
													+ "<div id='askBid"+counter+"'></div>"
													+ "</td>"
													+ "<td>"
													+ "<a href='#' class='btn btn-default' aria-label='Left Align'>"
													+ "<span class='glyphicon glyphicon-remove' aria-hidden='true'></span>"
													+ "</a>" + "</td>"
													+ "</tr>")
													
													$.ajax({
														url : "../expirations",
														dataType: 'json',
														data : "selectedTicker="+ui.item.value,
														success:function(Data){
															console.log("Data---"+JSON.parse(Data));
														}
													}).then(function(data) {			
														tickerMonthsList = $.parseJSON(data);
														
														$.each(tickerMonthsList,function(i,item){
															
															console.log("Items from List---"+item);
															
															
															$('#tickerMonthSelect'+counter).append('<option>' + item + '</option>');
															
														});
														
														console.log("Result---"+tickerMonthsList);
														
														
													});
							
								//
								$("#action"+counter).change(function(){
									//alert("selected---"+$('#action0').find('option:selected').val());
									console.log("Action===="+$("#action"+counter).find('option:selected').val());
								});
								
								//Call Strike on Change of Date
								$("#tickerMonthSelect"+counter).change(function(){
									//alert("selected Date---"+$("#tickerMonthSelect"+counter).find('option:selected').val());
									console.log("Selected Date===="+$("#tickerMonthSelect"+counter).find('option:selected').val());
									var selectedDate = $("#tickerMonthSelect"+counter).find('option:selected').val();
									
									//Get Strikes By Month
									$.ajax({
										url : "../strikes",
										dataType: 'json',
										data : "selectedDate="+selectedDate+"&selectedTicker="+ui.item.value,
										success:function(Data){
											console.log("Strike List---"+JSON.parse(Data));
										}
									}).then(function(data) {			
										strikeListByDate = $.parseJSON(data);
										
										$.each(strikeListByDate,function(i,item){
											
											console.log("Items from Strike---"+item);
											
											
											$('#strike'+counter).append('<option>' + item + '</option>');
											
										});
										
										console.log("strikeListByDate Result---"+strikeListByDate);
										
										
									});
								});
								
								//On change of Call/Put
								$("#callPutSelect"+counter).change(function(){
									//alert("selected---"+$('#callPutSelect'+counter).find('option:selected').val());
									console.log("Action===="+$("#callPutSelect"+counter).find('option:selected').val());
									
									var callPutSelected = $("#callPutSelect"+counter).find('option:selected').val();
									var selectedStrike = $('#strike'+counter).find('option:selected').html();
									var selectedDate = $("#tickerMonthSelect"+counter).find('option:selected').html();
									
									
									//Get Strikes By Month
									$.ajax({
										url : "../askbid",
										dataType: 'json',
										data : "selectedDate="+selectedDate+"&selectedTicker="+ui.item.value+"&callPutSelected="+callPutSelected+"&selectedStrike="+selectedStrike,
										success:function(Data){
											console.log("Strike List---"+JSON.parse(Data));
										}
									}).then(function(data) {			
										askBid = $.parseJSON(data);
										
										console.log("AskBid Last=="+askBid.Last);
										console.log("AskBid ask=="+askBid.Ask);
										console.log("AskBid bid=="+askBid.Bid);
										
										$("#last"+counter).html("<span class='askBidStyle'>Last:</span><span id='askBidLast0'>"+askBid.Last+"</span>");
										$("#askBid"+counter).html("<span class='askBidStyle'>Ask:</span>"+ askBid.Ask+ "&nbsp;&nbsp<span class='askBidStyle'>Bid:</span>"+ askBid.Bid);
									
									});
								});
							
							

						}

					});
	
	function getStrikeFromDate(counter){
		//Call Strike on Change of Date
		$("#tickerMonthSelect"+counter).change(function(){
			//alert("selected Date---"+$("#tickerMonthSelect"+counter).find('option:selected').val());
			console.log("Selected Date===="+$("#tickerMonthSelect"+counter).find('option:selected').val());
			var selectedDate = $("#tickerMonthSelect"+counter).find('option:selected').val();
			
			//Get Strikes By Month
			$.ajax({
				url : "../strikes",
				dataType: 'json',
				data : "selectedDate="+selectedDate+"&selectedTicker="+ui.item.value,
				success:function(Data){
					console.log("Strike List---"+JSON.parse(Data));
				}
			}).then(function(data) {			
				tickerMonthsList = $.parseJSON(data);
				
				$.each(tickerMonthsList,function(i,item){
					
					console.log("Items from Strike---"+item);
					
					
					$('#strike'+counter).append('<option>' + item + '</option>');
					
				});
				
				console.log("Result---"+tickerMonthsList);
				
				
			});
		});
	}



	$("#saveandtweetButton").bind("click", (function(e) {
		
		$.ajax({
			type : "POST",
			url : "../tweet",
			dataType : "json",
			success : function() {

				alert("succesfully tweeted");
			}
		});

	}));
	
	
	
	

	google.charts.load('current', {
		packages : [ 'corechart', 'line' ]
	});
	// google.charts.setOnLoadCallback(drawBackgroundColor);
	
	$("#previewChart").bind("click", (function() {

		$("#chart_div").show();
		google.charts.setOnLoadCallback(drawBackgroundColor);

	}));

	function drawBackgroundColor() {

		// alert("sss--");
		// console.log("dd--"+$('#ticketMonth0, #strike
		// option:selected').val());
		// alert("dd--"+$('#ticketMonth0,
		// #strike').find('option:selected').html());
		// alert("Strike Price---"+$('#ticketStrike0,
		// #strike').find('option:selected').html());

		var data = new google.visualization.DataTable();
		data.addColumn('number', 'X');
		data.addColumn('number', 'Y');

		// alert("Welcome!");
		/*
		 * data.addRows([ [50,-8], [51,-8], [52,-8], [53,-8], [54,-8], [55,-8],
		 * [56,-8], [57,-8], [58,-8], [59,-8], [60,-8], [61,-8], [62,-8],
		 * [63,-8], [64,-8], [65,-8], [66,-8], [67,-8], [68,-8], [69,-8],
		 * [70,-8], [71,-8], [72,-8], [73,-8], [74,-8], [75,-8], [76,-8],
		 * [77,-8], [78,-8], [79,-8], [80,-8], [81,-8], [82,-8], [83,-8],
		 * [84,-8], [85,-8], [86,-8], [87,-8], [88,-8], [89,-8], [90,-8],
		 * [91,-8], [92,-8], [93,-8], [94,-8], [95,-8], [96,-8], [97,-8],
		 * [98,-8], [99,-8], [100,-8], [101,-4], [102,0], [103,4], [104,8],
		 * [105,12], [106,16], [107,20], [108,24], [109,28], [110,32], [111,36],
		 * [112,40], [113,44], [114,48], [115,52], [116,56], [117,60], [118,64],
		 * [119,68], [120,72], [121,76], [122,80], [123,84], [124,88], [125,92],
		 * [126,96], [127,100], [128,104], [129,108], [130,112], [131,116],
		 * [132,120], [133,124], [134,128], [135,132], [136,136], [137,140],
		 * [138,144], [139,148], [140,152], [141,156], [142,160], [143,164],
		 * [144,168], [145,172], [146,176], [147,180], [148,184], [149,188] ]);
		 */
		/* based on the data table */
		/* row1 */
		//var r1_buy_or_sell = 1; /* buy is 1 , sell is -1) */
		var r1_buy_or_sell = $('#action0').find('option:selected').val();
		
		//var r1_call_or_put = 1; /* call is 1 , put is 0) */
		var r1_call_or_put = $('#callPutSelect0').find('option:selected').val();
		var r1_quantity = 1;
		if(r1_buy_or_sell =='1'){
			r1_quantity = 1;
		}else {
			r1_quantity = -1;
		}
		// var r1_strike_price = 100;
		var r1_strike_price = $('#strike0').find('option:selected')
				.html();
		
		
		var r1_cost = $("#askBidLast0").clone().children().remove().end().text();
		
		var r1_totalCost = r1_cost * r1_quantity * r1_buy_or_sell * -1;
		
		console.log("r1_Strike_Price--" + r1_strike_price);
		console.log("r1_buy_or_sell=="+r1_buy_or_sell);
		console.log("r1_call_or_put=="+r1_call_or_put);
		console.log("r1_cost=="+r1_cost);
		console.log("r1_totalCost=="+r1_totalCost);
		
		
		/* row2 */
		//var r2_buy_or_sell = 1; /* buy is 1 , sell is -1) */
		var r2_buy_or_sell = $('#action1').find('option:selected').val();
		//var r2_call_or_put = 1; /* call is 1 , put is 0) */
		var r2_call_or_put = $('#callPutSelect1').find('option:selected').val();
		var r2_quantity = 1;
		// var r2_strike_price = 100;
		var r2_strike_price = $('#strike1').find('option:selected')
				.html();
		console.log("r2_Strike_Price--" + r2_strike_price);
		var r2_cost = $("#askBidLast1").clone().children().remove().end().text();
		var r2_totalCost = r2_cost * r2_quantity * r2_buy_or_sell * -1;
		
		if(r2_buy_or_sell =='1'){
			r2_quantity = 1;
		}else {
			r2_quantity = -1;
		}
		
		console.log("r2_Strike_Price--" + r2_strike_price);
		console.log("r2_buy_or_sell=="+r2_buy_or_sell);
		console.log("r2_call_or_put=="+r2_call_or_put);
		console.log("r2_cost=="+r2_cost);
		console.log("r2_totalCost=="+r2_totalCost);

		/* row3 */
		//var r3_buy_or_sell = 1; /* buy is 1 , sell is -1) */
		var r3_buy_or_sell = $('#action2').find('option:selected').val();
		//var r3_call_or_put = 1; /* call is 1 , put is 0) */
		var r3_call_or_put = $('#callPutSelect2').find('option:selected').val();
		var r3_quantity = 1;
		
		if(r3_buy_or_sell =='1'){
			r3_quantity = 1;
		}else {
			r3_quantity = -1;
		}
		
		// var r3_strike_price = 100;
		var r3_strike_price = $('#strike2').find('option:selected')
				.html();
	
		var r3_cost = $("#askBidLast2").clone().children().remove().end().text();
		var r3_totalCost = r3_cost * r3_quantity * r3_buy_or_sell * -1;
		
		console.log("r3_Strike_Price--" + r3_strike_price);
		console.log("r3_buy_or_sell=="+r3_buy_or_sell);
		console.log("r3_call_or_put=="+r3_call_or_put);
		console.log("r3_cost=="+r3_cost);
		console.log("r3_totalCost=="+r3_totalCost);

		/* row4 */
		//var r4_buy_or_sell = 1; /* buy is 1 , sell is -1) */
		var r4_buy_or_sell = $('#action3').find('option:selected').val();
		//var r4_call_or_put = 1; /* call is 1 , put is 0) */
		var r4_call_or_put = $('#callPutSelect3').find('option:selected').val();
		var r4_quantity = 1;
		if(r4_buy_or_sell =='1'){
			r4_quantity = 1;
		}else {
			r4_quantity = -1;
		}
		// var r4_strike_price = 100;
		var r4_strike_price = $('#strike3').find('option:selected')
				.html();
		console.log("r4_Strike_Price--" + r4_strike_price);
		
		var r4_cost = $("#askBidLast3").clone().children().remove().end().text();
		var r4_totalCost = r4_cost * r4_quantity * r4_buy_or_sell * -1;
		
		console.log("r4_Strike_Price--" + r4_strike_price);
		console.log("r4_buy_or_sell=="+r4_buy_or_sell);
		console.log("r4_call_or_put=="+r4_call_or_put);
		console.log("r4_cost=="+r4_cost);
		console.log("r4_totalCost=="+r4_totalCost);

		var strikeRange = Math.max(r1_strike_price, r2_strike_price,
				r3_strike_price, r4_strike_price);

		// alert ("strike Range "+strikeRange);
		// alert ("total cost "+r4_totalCost);
		for (i = strikeRange * .5; i < r1_strike_price * 1.5; i++) {

			var r1_payoff = 0;
			var r2_payoff = 0;
			var r3_payoff = 0;
			var r4_payoff = 0;
			var totalPayoff = 0;

			/* calculate payoff for row1 */
			if (r1_call_or_put == 1) {
				if (r1_quantity > 0) {
					r1_payoff = Math.max(r1_totalCost, r1_quantity
							* (i - r1_strike_price) + r1_totalCost);
				} else {
					r1_payoff = Math.min(r1_totalCost, r1_quantity
							* (i - r1_strike_price) + r1_totalCost);
				}

			} else {

				if (r1_quantity > 0) {
					r1_payoff = Math.max(r1_totalCost, r1_quantity
							* (r1_strike_price - i) + r1_totalCost);
				} else {
					r1_payoff = Math.min(-1*r1_totalCost, r1_quantity
							* (r1_strike_price-i) - r1_totalCost);
				}

			}
			/* calculate payoff for row2 */

			if (r2_call_or_put == 1) {
				if (r2_quantity > 0) {
					r2_payoff = Math.max(r2_totalCost, r2_quantity
							* (i - r2_strike_price) + r2_totalCost);
				} else {
					r2_payoff = Math.min(r2_totalCost, r2_quantity
							* (i - r2_strike_price) + r2_totalCost);
				}

			} else {

				if (r2_quantity > 0) {
					r2_payoff = Math.max(r2_totalCost, r2_quantity
							* (r2_strike_price - i) + r2_totalCost);
				} else {
					r2_payoff = Math.min(-1*r2_totalCost, r2_quantity
							* (r2_strike_price-i) - r2_totalCost);
				}

			}
			/* calculate payoff for row3 */

			if (r3_call_or_put == 1) {
				if (r3_quantity > 0) {
					r3_payoff = Math.max(r3_totalCost, r3_quantity
							* (i - r3_strike_price) + r3_totalCost);
				} else {
					r3_payoff = Math.min(r3_totalCost, r3_quantity
							* (i - r3_strike_price) + r3_totalCost);
				}

			} else {

				if (r3_quantity > 0) {
					r3_payoff = Math.max(r3_totalCost, r3_quantity
							* (r3_strike_price - i) + r3_totalCost);
				} else {
					r3_payoff = Math.min(-1*r3_totalCost, r3_quantity
							* (r3_strike_price-i) - r3_totalCost);
				}

			}
			/* calculate payoff for row4 */

			if (r4_call_or_put == 1) {
				if (r4_quantity > 0) {
					r4_payoff = Math.max(r4_totalCost, r4_quantity
							* (i - r4_strike_price) + r4_totalCost);
				} else {
					r4_payoff = Math.min(r4_totalCost, r4_quantity
							* (i - r4_strike_price) + r4_totalCost);
				}

			} else {

				if (r2_quantity > 0) {
					r4_payoff = Math.max(r4_totalCost, r4_quantity
							* (r4_strike_price - i) + r4_totalCost);
				} else {
					r4_payoff = Math.min(-1*r4_totalCost, r4_quantity
							* (r4_strike_price-i) - r4_totalCost);
				}

			}
			totalPayoff = r1_payoff + r2_payoff + r3_payoff + r4_payoff;
			// alert(" i =>"+i);
			data.addRows([ [ i, totalPayoff ] ]);

			// alert("totalPayoff =>"+totalPayoff);
		}

	
		// alert("data --"+data.totalPayoff);
		/* based on the data table END */

		var options = {
			hAxis : {
				title : 'Strike'
			},
			vAxis : {
				title : 'Payoff'
			},
			backgroundColor : '#f1f8e9'
		};

		var chart = new google.visualization.LineChart(document
				.getElementById('chart_div'));
		chart.draw(data, options);
	}

});
