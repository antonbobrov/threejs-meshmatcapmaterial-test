import { Mesh, MeshMatcapMaterial, SRGBColorSpace, TextureLoader } from 'three';
import { OBJLoader } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

import { Webgl } from './js/webgl';

import './styles/index.scss';

const container = document.getElementById('scene')!;

const webgl = new Webgl(container, {
  near: 0.1,
  far: 50,
  fov: 75,
  perspective: 5,
});

const textureLoader = new TextureLoader();
const textures = ['0', '1', '2', '3'].map((id) =>
  textureLoader.load(`${id}.png`),
);

textures.forEach((texture) => {
  texture.colorSpace = SRGBColorSpace;
});

const settings = {
  matcap: textures[0],
};

const material = new MeshMatcapMaterial({ matcap: settings.matcap });

const gui = new GUI();
gui
  .add(settings, 'matcap', {
    '0': textures[0],
    '1': textures[1],
    '2': textures[2],
  })
  .onChange(() => {
    material.matcap = settings.matcap;
  });

new OBJLoader().load('monkey.obj', (data) => {
  data.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = material;
    }
  });

  webgl.scene.add(data);
});
