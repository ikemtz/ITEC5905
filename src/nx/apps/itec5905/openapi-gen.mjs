import * as tsGenerator from 'openapi-ts-generator';
import * as diagramGenerator from 'openapi-mermaid';
import * as mermaid from '@mermaid-js/mermaid-cli';
import * as fs from 'fs';

const server = 'http://localhost:8080/';
const v1SwaggerPage = '/swagger/v1/swagger.json';
const modelsDestPath = './apps/itec5905/src/models/';

await tsGenerator.generateTsModels({
  openApiJsonUrl: `${server}artists-odata${v1SwaggerPage}`,
  outputPath: `${modelsDestPath}artists-odata/`,
  typeFilterCallBack: (entity) => false,
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
  pathUrlFormattingCallBack: (val) => 'artists-odata' + val,
});

await tsGenerator.generateTsModels({
  openApiJsonUrl: `${server}artists-webapi${v1SwaggerPage}`,
  outputPath: `${modelsDestPath}artists-webapi/`,
  typeFilterCallBack: (entity) => !entity.name.endsWith('ODataEnvelope'),
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
  valuePropertyTypeFilterCallBack: (val, i, arr) =>
    !val.name.startsWith('created') && !val.name.startsWith('updated'),
  pathUrlFormattingCallBack: (val) =>
    'artists-webapi' + val.replace('.{format}', '.json'),
});

await tsGenerator.generateTsModels({
  openApiJsonUrl: `${server}customers-odata${v1SwaggerPage}`,
  outputPath: `${modelsDestPath}customers-odata/`,
  typeFilterCallBack: (entity) => false,
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
  pathUrlFormattingCallBack: (val) => 'customers-odata' + val,
});

await tsGenerator.generateTsModels({
  openApiJsonUrl: `${server}customers-webapi${v1SwaggerPage}`,
  outputPath: `${modelsDestPath}customers-webapi/`,
  typeFilterCallBack: (entity) => !entity.name.endsWith('ODataEnvelope'),
  genAngularFormGroups: true /* Set this to true if only if you're in an Angular project*/,
  valuePropertyTypeFilterCallBack: (val, i, arr) =>
    !val.name.startsWith('created') && !val.name.startsWith('updated'),
  pathUrlFormattingCallBack: (val) =>
    'customers-webapi' + val.replace('.{format}', '.json'),
});

diagramGenerator.generateDiagrams({
  openApiJsonUrl: `${server}artists-odata${v1SwaggerPage}`,
  outputPath: '../../docs/artists-odata/',
});

diagramGenerator.generateDiagrams({
  openApiJsonUrl: `${server}artists-webapi${v1SwaggerPage}`,
  outputPath: '../../docs/artists-webapi/',
});

diagramGenerator.generateDiagrams({
  openApiJsonUrl: `${server}customers-odata${v1SwaggerPage}`,
  outputPath: '../../docs/customers-odata/',
});

diagramGenerator.generateDiagrams({
  openApiJsonUrl: `${server}customers-webapi${v1SwaggerPage}`,
  outputPath: '../../docs/customers-webapi/',
});

await mermaid.run(
  '../../docs/artists-odata/class-diagram.md',
  '../../docs/artists-odata/class-diagram.png' // {optional options},
);

await mermaid.run(
  '../../docs/artists-webapi/class-diagram.md',
  '../../docs/artists-webapi/class-diagram.png' // {optional options},
);

await mermaid.run(
  '../../docs/customers-odata/class-diagram.md',
  '../../docs/customers-odata/class-diagram.png' // {optional options},
);

await mermaid.run(
  '../../docs/customers-webapi/class-diagram.md',
  '../../docs/customers-webapi/class-diagram.png' // {optional options},
);

fs.renameSync(
  '../../docs/artists-odata/class-diagram-1.png',
  '../../docs/artists-odata/class-diagram.png'
);
fs.renameSync(
  '../../docs/artists-webapi/class-diagram-1.png',
  '../../docs/artists-webapi/class-diagram.png'
);
fs.renameSync(
  '../../docs/customers-odata/class-diagram-1.png',
  '../../docs/customers-odata/class-diagram.png'
);
fs.renameSync(
  '../../docs/customers-webapi/class-diagram-1.png',
  '../../docs/customers-webapi/class-diagram.png'
);
