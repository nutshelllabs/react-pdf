<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
  <p align="center">React renderer for creating PDF files on the browser and server<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@nutshelllabs-pdf/renderer">
      <img src="https://img.shields.io/npm/v/@nutshelllabs-pdf/renderer.svg" />
    </a>
    <a href="https://travis-ci.org/nutshelllabs/react-pdf">
      <img src="https://img.shields.io/travis/nutshelllabs/react-pdf.svg" />
    </a>
    <a href="https://github.com/nutshelllabs/react-pdf/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/nutshelllabs/react-pdf.svg" />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" />
    </a>
    <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf.svg?type=shield"/></a>
  </p>
</p>

## Lost?

This package is a fork of [react-pdf](https://github.com/diegomura/react-pdf).  We're trying to implement some specific performance improvements for multiple renders.  I'd recommend you don't use this package.

## How to install
```sh
yarn add @nutshelllabs-pdf/renderer
```

## How it works

```jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@nutshelllabs-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
```

### `Web.` Render in DOM
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@nutshelllabs-pdf/renderer';

const App = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### `Node.` Save in a file
```jsx
import React from 'react';
import ReactPDF from '@nutshelllabs-pdf/renderer';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
```

## Contributors

This project exists thanks to all the people who contribute. Looking to contribute? Please check our [[contribute]](https://github.com/nutshelllabs/react-pdf/blob/master/.github/CONTRIBUTING.md) document for more details about how to setup a development environment and submitting code.

<a href="https://github.com/nutshelllabs/react-pdf/blob/master/.github/CONTRIBUTING.md"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>

## Sponsors

Thank you to all our sponsors! [[Become a sponsors](https://opencollective.com/react-pdf#sponsors)]

<a href="https://opencollective.com/react-pdf#sponsors" target="_blank"><img src="https://opencollective.com/react-pdf/sponsors.svg?width=890"></a>

## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>

## License

MIT © [Diego Muracciole](http://github.com/diegomura)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf?ref=badge_large)

---
![](https://img.shields.io/npm/dt/@nutshelllabs-pdf/renderer.svg?style=flat)
