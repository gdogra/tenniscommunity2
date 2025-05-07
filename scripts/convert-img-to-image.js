module.exports = function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let hasModifications = false;

  // Insert import if not already present
  const hasImageImport = root.find(j.ImportDeclaration, {
    source: { value: 'next/image' },
  }).length > 0;

  if (!hasImageImport) {
    root.get().node.program.body.unshift(
      j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier('Image'))],
        j.literal('next/image')
      )
    );
  }

  // Replace <img ... /> with <Image ... />
  root.find(j.JSXElement, {
    openingElement: { name: { name: 'img' } },
  }).forEach((path) => {
    const opening = path.node.openingElement;
    const closing = path.node.closingElement;
    opening.name.name = 'Image';
    if (closing) closing.name.name = 'Image';

    // Ensure width, height, alt are present (add dummy defaults)
    const attrNames = opening.attributes.map((attr) => attr.name.name);

    if (!attrNames.includes('width')) {
      opening.attributes.push(j.jsxAttribute(j.jsxIdentifier('width'), j.literal('40')));
    }

    if (!attrNames.includes('height')) {
      opening.attributes.push(j.jsxAttribute(j.jsxIdentifier('height'), j.literal('40')));
    }

    if (!attrNames.includes('alt')) {
      opening.attributes.push(j.jsxAttribute(j.jsxIdentifier('alt'), j.literal('""')));
    }

    hasModifications = true;
  });

  return hasModifications ? root.toSource() : null;
};

