import SpaceObject from './SpaceObject';
import SpaceObjectGenerator from './SpaceObjectGenerator';
import Util from '../common/Util';

const ns = window.fivenations;

function PlanetGenerator(deepSpaceLayer) {
    SpaceObjectGenerator.call(this, deepSpaceLayer);
}

PlanetGenerator.prototype = Object.create(SpaceObjectGenerator.prototype);
PlanetGenerator.prototype.constructor = PlanetGenerator;

PlanetGenerator.prototype.generate = function(numberOfPlanets) {
    SpaceObjectGenerator.prototype.generate.call(this);

    this.createPlanet(numberOfPlanets);
}

PlanetGenerator.prototype.createPlanet = function(numberOfPlanets) {
    if (!numberOfPlanets) numberOfPlanets = 1;
    for (var i = 0; i < numberOfPlanets; i += 1) {
        this.createRandomizedPlanet();
    }
};

PlanetGenerator.prototype.createRandomizedPlanet = function() {
    const NUMBER_OF_TYPES = 2;
    const NUMBER_OF_FRAMES = 10;
    const screenWidth = ns.window.width;
    const screenHeight = ns.window.height;

    const map = this.deepSpaceLayer.getMap();
    const sprites = this.deepSpaceLayer.getSprites();
    const type = Util.rnd(1, NUMBER_OF_TYPES);
    const sprite = sprites['planet' + type];
    const z = Math.min(Math.random() + 0.1, Math.random() > 0.5 ? 0.25 : 0.6);
    const x = Math.floor(Util.rnd(0, map.getScreenWidth() - screenWidth) * z);
    const y = Math.floor(Util.rnd(0, map.getScreenHeight() - screenHeight) * z);
    const frame = Util.rnd(0, NUMBER_OF_FRAMES - 1);
    const scale = Util.rnd(100, 200) / 100;

    const planet = new SpaceObject(sprite)
        .setX(x)
        .setY(y)
        .setZ(z)
        .setScale(scale)
        .setFrame(frame);

    this.addSpaceObject(planet);
};

export default PlanetGenerator;
