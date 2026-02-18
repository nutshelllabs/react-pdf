import Reconciler from 'react-reconciler-23/cjs/react-reconciler.production.min.js';

import propsEqual from './propsEqual';
import { ReconcilerFactory } from './types';

const emptyObject = {};

const createRenderer: ReconcilerFactory = ({
  appendChild,
  appendChildToContainer,
  commitTextUpdate,
  commitUpdate,
  createInstance,
  createTextInstance,
  insertBefore,
  removeChild,
  removeChildFromContainer,
  resetAfterCommit,
}) => {
  const reconciler = Reconciler({
    appendChild,
    appendChildToContainer,
    appendInitialChild: appendChild,
    createInstance,
    createTextInstance,
    insertBefore,
    commitUpdate,
    commitTextUpdate,
    removeChild,
    removeChildFromContainer,
    resetAfterCommit,
    shouldSetTextContent: () => false,
    finalizeInitialChildren: () => false,
    getPublicInstance: (instance) => instance,
    getRootHostContext: () => emptyObject,
    getChildHostContext: () => emptyObject,
    prepareForCommit() {},
    clearContainer() {},
    resetTextContent() {},
    prepareUpdate: (element, type, oldProps, newProps) =>
      !propsEqual(oldProps, newProps),
  });

  const createContainer = (container: unknown) => {
    return reconciler.createContainer(container, false, false);
  };

  const updateContainer = (
    doc: unknown,
    mountNode: unknown,
    parentComponent: unknown,
    callback?: () => void,
  ) => {
    // Force synchronous update for React 18
    if (reconciler.flushSync) {
      reconciler.flushSync(() => {
        reconciler.updateContainer(doc, mountNode, parentComponent, callback);
      });
    } else {
      reconciler.updateContainer(doc, mountNode, parentComponent, callback);
    }
  };

  return {
    createContainer,
    updateContainer,
  };
};

export default createRenderer;
