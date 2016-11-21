export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    // TODO: Implement Error Logging
    console.error(err)
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch (err) {
    // TODO: Implement Error Logging
    console.error(err)
    return undefined
  }
}

export const syncLocalStorageWithStore = (store) => {
  store.subscribe(() => {
    saveState({
      tokens: store.getState().tokens,
      authenticate: store.getState().authenticate
    })
  })
}
