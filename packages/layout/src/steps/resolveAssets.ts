import * as P from '@nutshelllabs/primitives';
import FontStore from '@nutshelllabs/font';
import { castArray } from '@nutshelllabs/fns';

import fetchEmojis from '../text/emoji';
import fetchImage from '../image/fetchImage';
import { SafeImageNode, SafeNode } from '../types';

const isImage = (node: SafeNode): node is SafeImageNode =>
  node.type === P.Image;

const traverseImageAssets = (node: SafeNode, cb: (n: SafeImageNode) => void) => {
  const nodesToExplore = node.children?.slice(0) || [];
  while (nodesToExplore.length > 0) {
    const n = nodesToExplore.shift();
    if (n && n.type === P.Image) {
      cb(n as SafeImageNode);
    }
    if (n && n.children) {
      n.children.forEach((childNode) => {
        nodesToExplore.push(childNode);
      });
    }
  }
};

/**
 * Get all asset promises that need to be resolved
 *
 * @param fontStore - Font store
 * @param node - Root node
 * @returns Asset promises
 */
const fetchAssets = (fontStore: FontStore, node: SafeNode) => {
  const promises: Promise<void>[] = [];
  const listToExplore = node.children?.slice(0) || [];
  const emojiSource = fontStore ? fontStore.getEmojiSource() : null;

  while (listToExplore.length > 0) {
    const n = listToExplore.shift();

    if (isImage(n)) {
      if (!n.image) {
        promises.push(fetchImage(n));
      }
    }

    if (fontStore && n.style?.fontFamily) {
      const fontFamilies = castArray(n.style.fontFamily);

      promises.push(
        ...fontFamilies.map((fontFamily) =>
          fontStore.load({
            fontFamily,
            fontStyle: n.style.fontStyle,
            fontWeight: n.style.fontWeight,
          }),
        ),
      );
    }

    if (typeof n === 'string') {
      promises.push(...fetchEmojis(n, emojiSource));
    }

    if ('value' in n && typeof n.value === 'string') {
      promises.push(...fetchEmojis(n.value, emojiSource));
    }

    if (n.children) {
      n.children.forEach((childNode) => {
        listToExplore.push(childNode);
      });
    }
  }

  return promises;
};

/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param node root node
 * @param fontStore font store
 * @param cache cache for skipping already-processed documents
 * @returns Root node
 */
const resolveAssets = async (
  node: SafeNode,
  fontStore: FontStore,
  cache: Record<string, boolean> = {},
) => {
  // Skip if already cached by cacheId
  const cacheId = node.props?.cacheId;
  if (cacheId && cacheId in cache) {
    return node;
  }

  // Pre-fetch images that don't have data yet
  const imagePromises: Promise<void>[] = [];
  traverseImageAssets(node, (n) => {
    if (!n.image) {
      imagePromises.push(fetchImage(n));
    }
  });

  if (imagePromises.length > 0) {
    await Promise.all(imagePromises);
  }

  const promises = fetchAssets(fontStore, node);
  await Promise.all(promises);

  // Mark as cached
  if (cacheId) {
    cache[cacheId] = true;
  }

  return node;
};

export default resolveAssets;
