import * as tsGenerator from 'openapi-ts-generator';
import * as mermaidGenerator from 'openapi-mermaid';
import * as mermaid from '@mermaid-js/mermaid-cli';
import * as fs from 'fs';

tsGenerator.generateTsModels({
  openApiJsonUrl: 'http://localhost:8080/customers-od/swagger/v1/swagger.json',
  outputPath: './apps/itec5905/src/models/customers-od/',
  typeFilterCallBack: (entity) => !entity.name.endsWith('ODataEnvelope'),
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
});

tsGenerator.generateTsModels({
  openApiJsonUrl: 'http://localhost:8080/artists-od/swagger/v1/swagger.json',
  outputPath: './apps/itec5905/src/models/artists-od/',
  typeFilterCallBack: (entity) => !entity.name.endsWith('ODataEnvelope'),
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
});

mermaidGenerator.generateDiagrams({
  openApiJsonUrl: 'http://localhost:8080/customers-od/swagger/v1/swagger.json',
  outputPath: '../../docs/customers/',
  typeFilterCallBack: (entity) => !entity.name.endsWith('ODataEnvelope'),
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
});

mermaidGenerator.generateDiagrams({
  openApiJsonUrl: 'http://localhost:8080/artists-od/swagger/v1/swagger.json',
  outputPath: '../../docs/artists/',
  typeFilterCallBack: (entity) => !entity.name.endsWith('ODataEnvelope'),
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
});

await mermaid.run(
  '../../docs/artists/class-diagram.md',
  '../../docs/artists/class-diagram.png' // {optional options},
);

await mermaid.run(
  '../../docs/customers/class-diagram.md',
  '../../docs/customers/class-diagram.png' // {optional options},
);

fs.renameSync(
  '../../docs/artists/class-diagram-1.png',
  '../../docs/artists/class-diagram.png'
);
fs.renameSync(
  '../../docs/customers/class-diagram-1.png',
  '../../docs/customers/class-diagram.png',
);
