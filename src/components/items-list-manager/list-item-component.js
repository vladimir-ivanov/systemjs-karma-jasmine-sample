import _ from 'underscore';

//manages the list of items
export default class ListItemComponent {
    constructor() {
        //not truly private like TypeScript
        this._template = document.getElementById('list-item-template');
    }

    //todo - emitter would be a more robust solution here than callback
    compile(item, onRemoveCallback) {
        var domEl = document.createElement('div');

        domEl.innerHTML = _.template(this._template.innerHTML)(item);
        //todo - needs a $.find equivalent selector here to make sure it is the button
        domEl.lastElementChild
            .addEventListener('click', ev => onRemoveCallback(ev.target.parentNode.getAttribute('data-id')));

        return domEl;
    }
}