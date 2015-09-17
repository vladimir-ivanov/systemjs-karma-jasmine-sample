import ItemsManager from './components/items-list-manager/items-manager';
import _ from 'underscore';

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

(new ItemsManager()).initialize();
