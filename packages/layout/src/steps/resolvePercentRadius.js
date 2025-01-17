import { evolve, matchPercent } from '@nutshelllabs/fns';

/**
 *
 * @param {Object} container width and height
 * @param {String | Number} value border radius value
 * @returns {Number} fixed border radius value
 */
const resolveRadius = container => value => {
  if (!value) return undefined;

  const match = matchPercent(value);

  return match
    ? match.percent * Math.min(container.width, container.height)
    : value;
};

/**
 * Transforms percent border radius into fixed values
 *
 * @param {Object} node
 * @returns {Object} node
 */
const resolvePercentRadius = node => {
  const style = evolve(
    {
      borderTopLeftRadius: resolveRadius(node.box),
      borderTopRightRadius: resolveRadius(node.box),
      borderBottomRightRadius: resolveRadius(node.box),
      borderBottomLeftRadius: resolveRadius(node.box),
    },
    node.style || {},
  );

  node.style = style;

  if (node.children) {
    node.children.forEach(resolvePercentRadius);
  }

  return node;
};

export default resolvePercentRadius;
