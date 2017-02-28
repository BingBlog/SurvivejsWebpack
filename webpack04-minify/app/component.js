var styles = require('./main.css')
module.exports = function (){
    var Element = document.createElement('h1');

    Element.innerHTML = 'Hello Word!';

    Element.className = styles.redButton;

    return Element;
}