import { type AppContext, type Component, createVNode, render } from "vue";

interface RenderComponentOptions {
  el: Element | ShadowRoot;
  component: Component;
  props?: Record<string, unknown>;
  appContext?: AppContext;
}

export default function renderComponent({
  el,
  component,
  props,
  appContext,
}: RenderComponentOptions) {
  let vnode = createVNode(component, props);
  if (appContext) {
    vnode.appContext = { ...appContext };
  }
  render(vnode, el);

  return () => {
    render(null, el);
    // Explicitly clear reference to aid GC
    vnode = createVNode({} as unknown as Component, undefined);
    // Finally unmount to ensure container is clean
    render(null, el);
  };
}
