define('Universal.Event.Entity.Stop', ['Universal.Event'], function(Event) {

    var ns = window.fivenations;

    function UniversalEventEntityStop() {
        var args = [].slice.call(arguments);
        Event.apply(this, args);
    }

    UniversalEventEntityStop.prototype = Object.create(Event.prototype);
    UniversalEventEntityStop.prototype.constructor = UniversalEventEntityStop;

    /**
     * No-op function to be overwritten in the child objects
     * @param {object} [options] [extendable object that presents event details]
     * @return {void}
     * @example
     * Expected Data format:
     * {
     *  id: 'entity/stop'
     *  targets: [124, 84],
     * }
     */
    UniversalEventEntityStop.prototype.execute = function(options) {
        if (!options.targets) {
            return;
        }
        options.targets.forEach(function(id) {
            ns.game.entityManager.entities(id).single().stop();
        });
    };

    return UniversalEventEntityStop;

});