import Event from './Event';
const ns = window.fivenations;

function EntityRemove() {
    var args = [].slice.call(arguments);
    Event.apply(this, args);
}

EntityRemove.prototype = Object.create(Event.prototype);
EntityRemove.prototype.constructor = EntityRemove;

/**
 * No-op function to be overwritten in the child objects
 * @param {object} [options] [extendable object that presents event details]
 * @return {void}
 */
EntityRemove.prototype.execute = function(options) {
    if (!options.targets) {
        return;
    }
    options.targets.forEach(function(id) {
        var entity = ns.game.entityManager.entities(id);
        ns.game.entityManager.remove(entity);
    });        

};

export default EntityRemove;
