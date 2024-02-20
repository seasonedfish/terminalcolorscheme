import { ColorTranslator } from "../node_modules/colortranslator/index.js";

class MyThing {
    myNumber: number;

    constructor() {
        this.myNumber = 5;
    }
}

const myThing = new MyThing();
const ct = new ColorTranslator("red");
console.log(ct);
console.log(myThing);
