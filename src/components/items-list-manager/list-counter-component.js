import _ from 'underscore';

//manages the list of items
export default class ListCounterComponent {
    constructor() {
        //not truly private like TypeScript
        this._template = document.getElementById('counter-template');
        this._domEl = null;
    }

    compile(data) {
        if (!this._domEl) {
            this._domEl = document.createElement('div');
        }

        //could be optimized just the number span element to update its value, rather than the whole text, but too minor to do so
        Object.observe(data, () => this._domEl.innerHTML = _.template(this._template.innerHTML)(data));

        return this._domEl;
    }
}