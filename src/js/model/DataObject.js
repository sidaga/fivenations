import { 
    ENTITY_SIZES, 
    ANIMATION_OFFSET_WHEN_ICONS_ARE_INTEGRATED 
} from '../common/Const';

/**
 * Returns the dimensions of the given entity model
 * @param {object} data - attributes of given entity model
 */
function getDimensionsBySize(data) {
    const size = data.size;
    if (!size || !ENTITY_SIZES[size]) return ENTITY_SIZES.m;
    return ENTITY_SIZES[size];
}

/**
 * Returns the damage area of the given entity model
 * @param {object} data - attributes of given entity model
 */
function getDamageArea(data) {
    const damageArea = data.sizeOffset;
    if (!damageArea) {
        return getDimensionsBySize(data);
    }
    return {
        width: damageArea.w * 2,
        height: damageArea.h * 2
    };
}

function DataObject(json) {

    var data = Object.assign({}, json);

    // setting up custom gameplay related data attributes
    data.maxhull = data.hull;
    data.maxshield = data.shield;
    data.maxpower = data.power;
    data.maxhangar = data.hangar;
    data.team = 1;

    // entity dimensions
    data.dimensions = getDimensionsBySize(data);
    data.damageArea = getDamageArea(data);

    // for providing privacy for the data variables we have to create a closure here so as not to
    // publish any data variable held by the entity
    return {

        damage: function(params) {
            var shield = this.getShield();
            if (shield > 0) {
                var diff = shield - params.damageShield;
                if (diff < 0) {
                    this.damageShield(params.damageShield);
                    this.damageHull(-diff);
                } else {
                    this.damageShield(params.damageShield);
                }
            } else {
                this.damageHull(params.damage);
            }
        },

        damageHull: function(value) {
            data.hull = Math.max(data.hull - Math.max(value - data.armor, 1), 0);
        },

        damageShield: function(value) {
            data.shield = Math.max(data.shield - value, 0);
        },

        restoreShield: function(value) {
            data.shield = Math.min(data.maxshield, data.shield + value);
        },

        setTeam: function(team) {
            data.team = team;
        },

        isBuilding: function() {
            return !!data.building;
        },

        getTeam: function() {
            return data.team;
        },

        getId: function() {
            return data.id;
        },

        getName: function() {
            return data.name;
        },

        getType: function() {
            return data.type;
        },

        getMaxHull: function() {
            return data.maxhull;
        },

        getMaxShield: function() {
            return data.maxshield;
        },

        getMaxPower: function() {
            return data.maxpower;
        },

        getMaxHangar: function() {
            return data.maxhangar;
        },

        getHull: function() {
            return data.hull;
        },

        getShield: function() {
            return data.shield;
        },

        getPower: function() {
            return data.power;
        },

        getArmor: function() {
            return data.armor;
        },

        getHangar: function() {
            return data.hangar;
        },

        getSpeed: function() {
            return data.speed;
        },

        getManeuverability: function() {
            return data.maneuverability;
        },

        getVision: function() {
            return data.vision;
        },

        getWeapons: function() {
            return data.weapons;
        },

        getTitanium: function() {
            return data.titanium;
        },

        getSilicium: function() {
            return data.silicium;
        },

        getEnergy: function() {
            return data.energy;
        },

        getUranium: function() {
            return data.uranium;
        },

        getSpace: function() {
            return data.space;
        },

        getBuildingTime: function() {
            return data.buildingTime;
        },

        getDirections: function() {
            return data.directions;
        },

        getAngleOffset: function() {
            return data.angleOffset;
        },

        getAnimFrame: function() {
            return data.animFrame;
        },

        getAnimType: function() {
            return data.animType;
        },

        getWidth: function() {
            return data.dimensions.width;
        },

        getHeight: function() {
            return data.dimensions.height;
        },

        getDamageWidth: function() {
            return data.damageArea.width;
        },

        getDamageHeight: function() {
            return data.damageArea.height;
        },

        getVariances: function() {
            return data.variances || [];
        },

        getCustomFrame: function() {
            return data.customFrame;
        },

        getAnimations: function() {
            return data.animations;
        },

        getAnimationByKey: function(key) {
            if (!data.animations) return;
            return data.animations[key];
        },

        getAnimationOffset: function() {
            return data.animationOffset || ANIMATION_OFFSET_WHEN_ICONS_ARE_INTEGRATED;
        },

        hasAnimation: function(key) {
            return !!data.animations[key];
        },

        hasMultipleAnimationFor: function(key) {
            if (!this.hasAnimation(key)) return false;
            var animation = this.getAnimationByKey(key);
            // whether the animation definition is an array
            return animation.length;
        },

        hasJetEngine: function() {
            return data.hasJetEngine;
        },

        hasRealManeuverSystem: function() {
            return data.realManeuverSystem || false;
        },

        getEvents: function() {
            return data.events;
        },

        getEvent: function(evt) {
            if (!evt || !data.events) return;
            return data.events[evt];
        },

        getTTL: function() {
            return data.ttl;
        },

        getFollowTarget: function() {
            return data.followTarget;
        },

        getTrails: function() {
            return data.trails;
        },

        isFighter: function() {
            return this.getType() === 'Fighter';
        },

        getTargetGraphicsGroup: function() {
            return data.targetGraphicsGroup;
        },

        toJSON: function() {
            const blackList = [
                'maxhangar',
                'maxpower',
                'maxshield',
                'maxhull',
                'dimensions',
                'team'
            ];
            return JSON.stringify(data, (key, value) => {
                if (blackList.indexOf(key) !== -1) return undefined;
                return value;
            }, '  ');
        },

        getProjectileOffset: function() {
            return data.initialPoints || {};
        },

        getSelectionOffset: function() {
            return data.selectionOffset || {};
        },

        doesPersistOrienationFromEmitter: function() {
            return data.persistOrienationFromEmitter;
        },

        getFrames: function() {
            return data.frames;
        }

    };
}

export default DataObject;
