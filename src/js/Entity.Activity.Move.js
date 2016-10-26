define('Entity.Activity.Move', ['Entity.Activity'], function(Activity) {

    /**
     * Constructor function to Move
     * @param  {[object]} entity Instance of an Entity class
     * @return {[object]} 
     */
    function Move(entity) {
        Activity.call(this);
        this.entity = entity;
        this.coords = {};
    }

    Move.prototype = new Activity;
    Move.prototype.constructor = Move;

    /**
     * Applying the activity on an entity
     * @return {[void]}
     */
    Move.prototype.activate = function() {
        if (this.entity) {
            this.entity.getMotionManager().moveTo(this);
        }
        Activity.prototype.activate.call(this);
    };

    /**
     * Saving the target to which the entity will be moved
     * @return {[void]}
     */
    Move.prototype.setCoords = function(coords) {
        if (!coords) {
            throw 'The given paramater is invalid to set up the coordinates!';
        }
        this.coords = coords;
    };

    /**
     * Returns the coordinates to which the entity moves 
     * @return {object} object literal that contains the coordinates
     */
    Move.prototype.getCoords = function() {
        return this.coords;
    };

    return Move;

});