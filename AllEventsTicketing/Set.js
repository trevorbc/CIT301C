function Set() {
	
	
	this.intersection = function(listA, listB) {

        var resultList = [];

        if (listA == null || listB == null) {
            return null;
        }

        for (var i = 0; i < listA.length; i++) {
            var nextValue = listA[i];

            for (var j = 0; j < listB.length; j++) {
                if (listB[j] === nextValue) {
                    resultList.push(listB[j]);
                    break;
                }
            }
        }
	   return resultList;
	}
    
    
    
	this.union = function(listA, listB) {
        if (listA == null || listB == null){
            return null;
        }
        var resultList = [];
        this.append(resultList,listA);

        var baResult = this.relativeCompliment(listB, listA);
        this.append(resultList,baResult);

	   return resultList;
	}




	this.relativeCompliment = function(listA, listB) {

	   var resultList = new Array();

	   if (listA == null || listB == null){
	       return null;
       }

       if (listB.length === 0) {
			return listA;
       }

       for (var i = 0; i < listA.length;i++){
	       for (var j= 0; j<listB.length;j++){
	           if (listA[i] === listB[j]){
	               break;
               }
               if (j===listB.length - 1){
	               resultList.push(listA[i]);
               }
           }
       }
	   return resultList;
	}



	this.symetricDifference = function(listA, listB) {

        if (listA == null || listB == null){
            return null;
        }
	   var resultList = [];
      	var abResult = this.relativeCompliment(listA, listB);
      	this.append(resultList,abResult);

	   var baResult = this.relativeCompliment(listB, listA);
	   this.append(resultList,baResult);
	   return resultList;
	}	
	
this.append = function(resultSet, list) {
    for (var i = 0; i<list.length;i++){
        resultSet.push(list[i]);
    }
}
}
