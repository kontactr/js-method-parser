function alphanumeric(inputtxt)
    { 
        var letters = /^[0-9a-zA-Z]+$/;
        if(inputtxt.match(letters))
            return true;
        else
            return false;
    }

function parser(queryString){

    

    function methodParameterParser(openBracketIndex){
        console.log(openBracketIndex , queryString[openBracketIndex]);
        let argumetObject = {}
        let argumentPreviousCache = "";
        let argumentCurrentCache = "";
        let invalue = false;
        openBracketIndex++;
        while(openBracketIndex < queryString.length){
            if(queryString[openBracketIndex] == ")"){
                if(argumentPreviousCache){
                    argumetObject[argumentPreviousCache.trim()] = {"type":"double" , "value":argumentCurrentCache.trim()};
                }else if(argumentCurrentCache){
                    argumetObject[argumentCurrentCache] = {"type":"single"};
                }else{
                }
                argumentPreviousCache = "";
                argumentCurrentCache = "";
                invalue = false;
                openBracketIndex++;
                break;
            }else if(queryString[openBracketIndex] === " "){
                if(!invalue){
                openBracketIndex++; }
                else{
                    argumentCurrentCache += queryString[openBracketIndex];
                    openBracketIndex++;
                }
            }else if(queryString[openBracketIndex] === "="){
                
                openBracketIndex++;
                argumentPreviousCache = argumentCurrentCache ;
                argumentCurrentCache = "";
                invalue = true;

            }else if(queryString[openBracketIndex] === ","){
                if(argumentPreviousCache){
                    argumetObject[previousCache.trim()] = {"type":"double" , "value":argumentCurrentCache};
                }else if(argumentCurrentCache){
                    argumetObject[argumentCurrentCache] = {"type":"single"};
                }else{
                }
                openBracketIndex++;
                argumentPreviousCache = "";
                argumentCurrentCache = "";
                invalue = false;
            }
            else if(alphanumeric(queryString[openBracketIndex])){
                argumentCurrentCache += queryString[openBracketIndex];
                openBracketIndex++;
            }else{
                argumentCurrentCache += queryString[openBracketIndex];
                openBracketIndex++;
                //console.log(queryString[openBracketIndex]);
            }

        }
        return {"object":argumetObject , "skipIndex":openBracketIndex} ;
    }        
        
    let previousCache = "";
    let queryCache = "";
    let counter = -1;
    let methodSpace = false;
    let methodStack = [];
    let methodString = "";

    function internalParser(resultObject , stack){

        for(let character=0 ; character<queryString.length; character++){
            counter++;
            //console.log(counter , queryString[character]);


            if(methodSpace){
                if(queryString[character] === "{"){
                    methodString += "{"
                    methodStack.push("{");
                }else if(queryString[character] === "}"){
                    methodStack.pop();
                    methodString += "}"
                    if(methodStack.length === 0){
                        console.log("Yess");
                        resultObject.methods[resultObject.methods.length - 1]["innerData"] = methodString;
                        methodSpace = false;
                        methodStack = [];
                        methodString = "";
                        previousCache = "";
                        queryCache = "";
                    }
                }else{
                    methodString += queryString[character];
                }
                continue;
            }

            if(queryString[character].charCodeAt(0) === 10){
                continue;
            }else if(queryString[character] === " "){
                if(queryCache){
                    previousCache = queryCache;
                    queryCache = "";
                }
            }else if(queryString[character] === "("){
                //console.log("Yesss - 2" , previousCache , queryCache , counter );
                let newObject = {}
                if(previousCache){
                    newObject["type"] = previousCache;
                }
                if(queryCache){
                    newObject["name"] = queryCache;
                }
                previousCache = "";
                queryCache = "";
                //resultObject = newObject;
                
                let result = methodParameterParser(character);
                newObject["args"] = result.object;
                character = result.skipIndex - 1;
                resultObject.methods.push(newObject);

            }else if(queryString[character] === "{"){
                methodStack.push("{")
                methodSpace = true;
            }
            
            else{
                queryCache += queryString[character];
            }

        }
        return resultObject;

    }

    let newObject = {}
    newObject.methods = [];
    return internalParser(newObject , [newObject]);

}

module.exports = {
    parser
}