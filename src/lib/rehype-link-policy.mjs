const externalProtocol = /^https?:\/\//i;

const walk = (node) => {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'element' && node.tagName === 'a') {
    const href = String(node.properties?.href ?? '');
    node.properties ??= {};

    if (href.startsWith('/go/')) {
      node.properties.target = '_blank';
      node.properties.rel = ['sponsored', 'nofollow', 'noopener', 'noreferrer'];
    } else if (externalProtocol.test(href)) {
      node.properties.target = '_blank';
      node.properties.rel = ['noopener', 'noreferrer'];
    }
  }
  for (const child of node.children ?? []) walk(child);
};

export default function rehypeLinkPolicy() {
  return (tree) => walk(tree);
}
