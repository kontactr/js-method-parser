const parser = require("./parser/methodParser");

const target =`
    static method1( hello , world , worldOf = 1 ){
        console.log("Hello World:");
        let temp = {"a":"a"}
    }

    method2( hello , world , worldOf=2 ){
        let temp1 = {"a":"b"};
        console.log("Hello World);
    }

    method3(){

    }

    method4(hello=[{"a":"a"}]){
        console.log("hello world")
    }

    constructor(props){
        super(props);
    }

`



console.log(parser.parser(target).methods);