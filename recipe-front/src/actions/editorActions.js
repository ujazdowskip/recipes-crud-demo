export const EDITOR_OPEN = 'EDITOR_OPEN';
export const EDITOR_CLOSE = 'EDITOR_CLOSE';

export const openEditor = data => ({
  type: EDITOR_OPEN,
  payload: {
    data
  }
});

export const closeEditor = () => ({
  type: EDITOR_CLOSE,
});