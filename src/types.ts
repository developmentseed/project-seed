export interface GeneratorOptions {
  projectName?: string;
  componentLibrary?: 'none' | 'chakra' | 'uswds';
  includeMap?: boolean;
  mapLibrary?: 'mapbox-gl' | 'maplibre-gl';
}

export interface ProjectConfig {
  name: string;
}
