import Vue from "vue";
import objectPath from "object-path";

export const SET_MUTATION = "vuexSync/set";
export const DELETE_MUTATION = "vuexSync/delete";

export function crackStorePath(path) {
  if (path.length < 1) {
    throw new Error(`Invalid path ${path}, length must be >= 1`);
  }

  const trunkPath = path.slice();
  const leafKey = trunkPath.pop();
  return { trunkPath, leafKey };
}

export const vuexSyncMutations = {
  [SET_MUTATION](state, { path, value }) {
    const { trunkPath, leafKey } = crackStorePath(path);
    const trunk = objectPath.get(state, trunkPath);
    if (!trunk) {
      throw new Error(
        `${SET_MUTATION}: Unable to set value at invalid path ${path}`
      );
    }
    Vue.set(trunk, leafKey, value);
  },

  [DELETE_MUTATION](state, { path }) {
    const { trunkPath, leafKey } = crackStorePath(path);
    const trunk = objectPath.get(state, trunkPath);
    if (!trunk) {
      throw new Error(
        `${DELETE_MUTATION}: Unable to delete value at invalid path ${path}`
      );
    }
    Vue.delete(trunk, leafKey);
  }
};
