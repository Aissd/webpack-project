// require('./main.css');
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/less/common.less';
import './main.less';

let fn = () => {
    console.log('log');
};

fn();

let arr = [1,2,3,4,5,6,7];
console.log('sum is ' + arr.reduce((t, i) => t += i, 0));
console.log('max is ' + arr.filter(i => i > 3));
console.log('map is ' + arr.map(i => i * 2));

class A {
    constructor() {

    }
    log() {
        console.log('from class');
    }
}

let a = new A();
a.log();


console.log('~~~~~~~~~');


let $h1 = $('h1');
console.log($h1.text());