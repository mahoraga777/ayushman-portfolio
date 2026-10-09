const shipImports = import.meta.glob('../assets/models/spaceships/*.{glb,gltf}', { eager: true, query: '?url', import: 'default' });
export const SPACESHIP_MODELS = Object.values(shipImports);

const planetImports = import.meta.glob('../assets/models/planets/*.{glb,gltf}', { eager: true, query: '?url', import: 'default' });
export const PLANET_MODELS = Object.values(planetImports);

export const BG_VIDEO = '/assets/videos/background.mp4';
export const HIRE_IMAGE = '/assets/images/hire-me-meme.jpg';
export const projectVideo = (slug) => `/assets/videos/projects/${slug}.mp4`;
export const projectImage = (slug) => `/assets/images/projects/${slug}.jpg`;
