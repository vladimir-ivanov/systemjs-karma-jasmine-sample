import ListItemComponent from '../../src/components/items-list-manager/list-item-component';
import _ from 'underscore';

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

describe('ListItemComponent', function () {
    beforeEach(() => {
        var self = this;
        this.addEventListener = () => {
        };

        this.onRemoveCallback = () => {
        };
        this.getAttribute = () => {
        };
        this.event = {
            target: {
                parentNode: {
                    getAttribute: self.getAttribute
                }
            }
        };

        spyOn(this, 'addEventListener');
        spyOn(this, 'onRemoveCallback').and.callThrough();
        spyOn(this, 'getAttribute').and.returnValue('someIdValue');

        spyOn(document, 'getElementById').and.returnValue({
            innerHTML: '<div>{{someContent}}</div>'
        });

        spyOn(document, 'createElement').and.returnValue({
            innerHTML: '',
            lastElementChild: {
                addEventListener: this.addEventListener
            }
        });

        this.component = new ListItemComponent();
    });

    describe('compile()', () => {
        it('should initialize a dom element with a click event', () => {
            var domEl = this.component.compile({someContent: 'hello'}, this.onRemoveCallback);

            expect(document.getElementById.calls.argsFor(0)).toEqual(['list-item-template']);
            expect(document.createElement.calls.argsFor(0)).toEqual(['div']);
            expect(domEl.innerHTML).toEqual('<div>hello</div>');

            var argsForAddEventListener = this.addEventListener.calls.argsFor(0);
            expect(argsForAddEventListener[0]).toEqual('click');

            //exec the callback
            argsForAddEventListener[1](this.event);

            expect(this.onRemoveCallback.calls.count()).toEqual(1);
            //todo - a couple of more expectations needed
        });
    });
});