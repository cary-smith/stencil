# Stencil Compiler

The Stencil compiler is bundled into a single file that can be used within a browser or node environment.

https://unpkg.com/@stencil/core@1.2.0-0/compiler/stencil.js


## Compiler

Relative to the root of the `@stencil/core` package, the file can be found at `compiler/stencil.js`. An example path found within node modules would be `node_modules/@stencil/core/compiler/stencil.js`.

The Stencil compiler is an Immediately Invoked Function Expression (IIFE) and places all of its exports on the global `stencil` variable. The global `stencil` variable can be executed within a browser's web worker, main thread or node environment.


## TypeScript Dependency

TypeScript is a dependency of Stencil, but TypeScript is not bundled within the Stencil compiler. In order for the Stencil compiler to work it must also have the `ts` global from the TypeScript compiler also assigned to the same global.


## Compiler API

### `compile(code, options?)`

The `stencil.compile()` function inputs source code as a string, with various options within the second argument. The function returns a Promise of the results, including diagnostics and the compiled code. The `compile()` function does not handle any bundling, or compiling any css preprocessing like Sass or Less.

Since TypeScript is used, the compiler is able to transpile from TypeScript to JavaScript, and does not require Babel presets. Additionally, the compile options below can be used to set the `module` format, such as `cjs`, and JavaScript version, such as `es2017`.


#### Compile Options

| Option              | Description        | Default |
|---------------------|--------------------|---------|
| `file`              | The filename of the code being compiled. | `undefined` |
| `module`            | Module format of compiled code, which can be either `esm` or `cjs`. | `esm` |
| `script`            | The JavaScript source target to transpile to. Values can be `latest`, `esnext`, `es2017`, `es2015`, or `es5`. | `es2017` |
| `style`             | How component styles are associated to the component. The `import` value will update the `styleUrl` value to be an import. The `inline` value will inline the styles into the static style getter. | `import` |
| `componentExport`   | A component can automatically get defined as a custom element by using `customelement`, or it can be exported by using `module`. | `customelement` |
| `componentMetadata` | Sets how and if component metadata should be assigned on the compiled component output. The `proxy` value sets the metadata through a proxy function. The `static` value will set the metadata to a static getter on the component class. | `proxy` |


### `getMinifyScriptOptions(opts)`

This helper function provides recommended options to best optimize component minifying. The returned object contains `options` and `minifier`. The `minifier` data states the exact minifier and version to use for the recommended options.


### `dependencies`

An array of dependencies required for the Stencil compiler. This data is used to set which dependencies versions work with this particular version of the compiler. The `url` value is only a recommendation of a CDN.

Example `dependencies`:

```
// stencil.dependencies
[
  {
    "name": "typescript",
    "version": "3.5.3",
    "url": "https://cdn.jsdelivr.net/npm/typescript@3.5.3/lib/typescript.js"
  }
]
```


### `version`

The Stencil compiler version, for example: `1.2.0`.


## Example

```html
<script src="https://unpkg.com/typescript@3.5.3/lib/typescript.js"></script>
<script src="https://unpkg.com/@stencil/core@1.2.0-0/compiler/stencil.js"></script>
<script>

console.log('stencil', stencil.version);
console.log('typescript', ts.version);

const code = '@Component...';
const opts = {
  file: 'my-cmp.tsx'
};

stencil.compile(code, opts).then(results => {
  console.log(results.diagnostics);
  console.log(results.code);
});

</script>
```
