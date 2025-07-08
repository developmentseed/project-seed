export interface GeneratorOptions {
  projectName?: string;
  componentLibrary?: 'none' | 'chakra' | 'uswds';
  includeMap?: boolean;
  mapLibrary?: 'mapbox-gl' | 'maplibre';
}

export interface ProjectConfig {
  name: string;
}
