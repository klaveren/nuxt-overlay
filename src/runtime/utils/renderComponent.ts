import { type AppContext, type Component, createVNode, render } from "vue";

interface RenderComponentOptions {
  el: Element | ShadowRoot;
  component: Component;
  props?: Record<string, any>;
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error allow release
    vnode = undefined;
  };
}
