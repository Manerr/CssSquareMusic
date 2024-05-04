
let jumper=document.querySelector("#jumper");


function scrollToTop(){

	let currentY=window.scrollY;
	let scrollRatio=window.innerHeight/15;


	var scrollInterval=setInterval(
		function(){
			currentY-=scrollRatio;
			scrollTo(0,currentY);
			if(currentY<scrollRatio){
				scrollTo(0,0);
				clearInterval(scrollInterval);
			}
		}
	,10);


}

jumper.onclick=function (event) {
	this.className="jumpeffect";
	setTimeout(function() {
	jumper.className="";	
	}, 200);
	scrollToTop();
}












let productsList=document.querySelectorAll(".product");

let filterType=document.querySelector(".filter-type");

let filterSort=document.querySelector(".filter-sort");




let sortingList=new Array();



function getPrices(_productsList){
	let prices=Array(_productsList.length-1);
	for (var i = _productsList.length - 1; i >= 0; i--) {
			let value=(_productsList[i].querySelector(".product-price"));
			if(value!==null){prices[i]=parseFloat(value.innerText);}
		}
	return prices;
}

function getPrice(product){
	let value=(product.querySelector(".product-price"));
	if(value!==null){return parseFloat(value.innerText);}
	return false;

}

function getAvalaibles(_productsList){
	let ava=Array(_productsList.length-1);
	for (var i = _productsList.length - 1; i >= 0; i--) {
			let value=(_productsList[i].querySelector(".shopping-info"));
			ava[i]= (value.innerText=="Avalaible");
		}
	return ava;
}

function getAvalaible(product){
	let value=product.querySelector(".shopping-info");
	if(value!==null){return value.innerText=="Avalaible"}
	return false;

}




function filterSortCall(e){

	let orderingType=filterSort.value;


	switch(orderingType){


		case "none":

		sortingList=new Array();

		for (var i = productsList.length - 1; i >= 0; i--) {
			productsList[i].style.order=i;
		}
		break;

		case "asc":

		sortingList=new Array( );
		priceList=new Array( (productsList.length-1) );
		priceList=getPrices(productsList).sort(function(a,b){return a-b});
		for (var i = priceList.length - 1; i >= 0; i--) {
		 	productsList[i].style.order=( priceList.indexOf( getPrice(productsList[i]) ) );
		}

		break;


		case "desc":

		sortingList=new Array( );
		priceList=new Array( (productsList.length-1) );
		priceList=getPrices(productsList).sort(function(a,b){return b-a});
		for (var i = priceList.length - 1; i >= 0; i--) {
		 	productsList[i].style.order=( priceList.indexOf( getPrice(productsList[i]) ) );
		}

		break;



		case "avalaible":

		sortingList=new Array( );
		avaList=new Array( (productsList.length-1) );
		avaList=getAvalaibles(productsList);

		console.log(avaList);

		for (var i = avaList.length - 1; i >= 0; i--) {
		 	productsList[i].style.order=sortingList.length-1-( avaList.indexOf( getAvalaible(productsList[i]) ) );
		}

		break;








	}


	for (var i = productsList.length - 1; i >= 0; i--) {
		productsList[i]=sortingList[i];
	}


}









function displayKeyboards(state){

	let keyboardList=document.querySelectorAll(".product.keyboard");
	for (var i = keyboardList.length - 1; i >= 0; i--) {
		if(state){keyboardList[i].style.display="flex";}
		else{keyboardList[i].style.display="none";}
	}

}


function displayRacks(state) {
	let rackList=document.querySelectorAll(".product.rack");
		for (var i = rackList.length - 1; i >= 0; i--) {
		if(state){rackList[i].style.display="flex";}
		else{rackList[i].style.display="none";}
	}

}




filterType.oninput=function (e) {

	if(filterType.value=="rack"){

		displayRacks(true);
		displayKeyboards(false);
	}
	else if(filterType.value=="keyboard"){
	
		displayRacks(false);
		displayKeyboards(true);
	}

	else{
		displayRacks(true);
		displayKeyboards(true);
	}


}






filterSort.oninput=filterSortCall;

filterSortCall(null); //ORDER BY DEFAULT