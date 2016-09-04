# @northbrook/mocha

> Reusable mocha configuration for your Northbrook projects

## Get it

```sh
npm install --save-dev @northbrook/mocha
```

## API

This configuration comes with two northbrook scripts

#### **northbrook run mocha**

This will run your mocha tests in your current directory

#### **northbrook run coverage**

Just like `nb run mocha`, but it will also run code coverage through NYC.

___

If you need to run these within a monorepo, over multiple packages,
you can prefix these commands with `northbrook exec`
e.g.

```sh
nb exec -- nb run mocha
nb exec -- nb run coverage
```

___
## Configuration

```js
// northbrook.json
{
  "mocha": {
    // default: 'test/'
    "directory": 'test/' // where to look for tests,
    // default: none
    "require": ["buba/register"] // require hooks
  }
}
```
