import ListItemComponent from './list-item-component';
import _ from 'underscore';

//manages the list of items
export default class ItemsManager {
    constructor() {
        //not truly private like TypeScript, but _something denotes pseudo private
        this._domElems = {};
        this._listDomRefs = {}; //keep to reduce dom access -> more efficient
        this._listItemComponent = new ListItemComponent();
    }

    initialize() {
        this._initializeDomElRefs();
        this._bindEvents();
        //todo - restrict to some MAX_LIMIT
        this._items = [];

        //todo - should be wrapped into a separate class and imported properly - a bit hacky as it stands to observe array
        Array.observe(this._items, change => {
            var changed = change[0];
            //todo - assumed single element is added or removed at a time, it should deal with any elements at the same time
            if (changed.removed.length === 0) {
                this._addDomItem(changed.object[changed.index]);

            } else {
                this._removeDomItem(change[0].removed[0]);
            }
        });
    }

    _addDomItem(itemData) {
        var itemEl = this._listItemComponent.compile(itemData, id => this._items.splice(this._items.findIndex(item =>  item.id === id), 1));

        this._domElems.list.appendChild(itemEl);

        this._listDomRefs[itemData.id] = itemEl;
    }

    _removeDomItem(itemData) {
        this._listDomRefs[itemData.id].remove();

        delete this._listDomRefs[itemData.id];
    }

    _initializeDomElRefs() {
        this._domElems.form = document.querySelector('[name="items-list-form"]');
        this._domElems.addButton = document.getElementById('add-button');
        this._domElems.textInput = document.getElementById('add-item');
        this._domElems.list = document.getElementById('list-items');
    }

    _bindEvents() {
        this._domElems.form.addEventListener('submit', ev => ev.preventDefault());
        this._domElems.addButton.addEventListener('click', () => this._items.push({
            itemName: this._domElems.textInput.value,
            id: _.uniqueId('id-')
        }));
    }
}