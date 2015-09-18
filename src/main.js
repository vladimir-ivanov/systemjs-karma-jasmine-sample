import ItemsManager from './components/items-manager';
import _ from 'underscore';

_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

(new ItemsManager()).initialize();
