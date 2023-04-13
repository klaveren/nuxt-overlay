import { createVNode, render } from 'vue'

export default function renderComponent({ el, component, props, appContext }) {
  let vnode = createVNode(component, props)
  vnode.appContext = { ...appContext }
  render(vnode, el)

  return () => {
    // destroy vnode
    render(null, el)
    vnode = undefined
  }
}