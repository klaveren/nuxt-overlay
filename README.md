# Welcome to NuxtOverlay

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

The Nuxt Overlay is an incredibly versatile and powerful tool that enables developers to add a wide range of overlays and popups to their websites with ease. This component is designed to help you create beautiful and effective overlays that can capture leads, display marketing promotions, prevent users from closing the browser, and much more.

One of the key features of the Nuxt Overlay is its ability to render any component as an overlay. This means that you can use any Vue.js component in your overlay, making it incredibly flexible and customizable. You can also use multiple queues to render different components at different times, making it easy to create complex and dynamic overlays that change over time.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

- [Online playground]
  
  <!-- - [📖  Documentation](https://example.com) -->

# 💡Features

<!-- Highlight some of the features your module provide here -->

- Render any Vue.js component as an overlay, providing incredible flexibility and customization options.
- Use multiple queues to render different components at different times, allowing for complex and dynamic overlays that change over time.
- Support for 9 predefined positions, including top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, and bottom-right.
- Perfect for creating a wide range of overlays, including alerts, marketing promotions, and content overflow prevention.
- Easy to use and highly customizable, making it an essential tool for any developer looking to create effective and engaging overlays for their website.
- Customizable duration and animation for each overlay, allowing for smooth transitions and engaging user experiences.
- Support for click-to-close functionality, enabling users to easily dismiss overlays when they're done with them.
- Can be used with any Nuxt.js project, providing seamless integration with your existing codebase.
- Lightweight and fast, ensuring that your overlays won't slow down your website or impact performance.
- Compatible with all modern browsers, ensuring that your overlays will work for all of your users, regardless of their device or browser choice.

# ⏳ Quick Setup

1. Add `nuxt-overlay` dependency to your project:

```bash
# Using pnpm
pnpm add -D nuxt-overlay

# Using yarn
yarn add --dev nuxt-overlay

# Using npm
npm install --save-dev nuxt-overlay
```

2. Add `nuxt-overlay` to the `modules` array in your `nuxt.config.ts`.

```typescript
export default defineNuxtConfig({
  modules: ["nuxt-overlay"],
});
```

That's it! You can now use Nuxt Overlay in your Nuxt app ✨

# 🚀 Usage

## 👾 Props:

- **queueName** (string): The `queueName` is used to identify and differentiate between queues when rendering components. 
  
  **default:** "default"

- **position**: The `position` parameter is used to specify the position of the overlay component rendered on the screen.
  
  *top-left | top-center | top-right | center-left | center | center-right | bottom-left | bottom-center | bottom-right*
  
  **default:** "top-center".

- **width** (string | number): The `width` parameter is used to specify the width of the overlay component rendered by the Nuxt Overlay.
  
  **default:** "33vw"

- **duration** ( number | boolean): The `duration` property determines how long the overlay should be displayed (in milliseconds). If not provided, the default value from the `nuxtOverlayConfig` object will be used. Once the duration has elapsed, the overlay will automatically be removed.
  
  When `duration` is set to `false`, the overlay component will only be removed when the user clicks on the component. This can be useful when you want to display a message or notification to the user that they need to acknowledge before it disappears.
  
  **default:** 5000

- **closeOnClick** (boolean) : The `closeOnClick` parameter is a boolean value that determines whether the Nuxt Overlay should be closed when the user clicks on it.
  
  **default:** true

## 👾 Api $overlay

- **$overlay.create**(`{}`)

```typescript
// QueueCreate interface
{
  queueName?: string;
  closeOnClick?: boolean;
  duration?: number;
  [key: string]: any; //  indicates that this object can accept any additional properties that are not explicitly defined in the interface
}
```

    Adds a new item to the overlay queue with the specified `payload`. The `payload` parameter must be an object that conforms to the `QueueCreate` interface. 

    The `[key: string]: any;` indicates that this object can accept any additional properties that are not explicitly defined in the interface. In other words, the interface expects an object that has at least an `id` property of type `string`, and may have any number of additional properties, with any key names and any values.
    

- **$overlay.remove**(`id: string, duration?: number`)
  
  Removes an item from the queue. The `id` parameter is the unique identifier of the item to be removed, and the `duration` parameter (optional) specifies the number of milliseconds to wait before removing the item. 

- **$overlay.getQueue()**
  
  Returns an reactive array of all the items currently in the queue of the Nuxt Overlay Component. Each item in the array is an object containing the properties of the item, such as its type, text, icon, title, and color.

- **$overlay.getConfig()**
  Returns the reactive current configuration of the Nuxt Overlay Component, including properties such as `closeOnClick`, `duration`, `position`, and `queueName`. 

You can access the `$overlay` API directly inside a component's template or by importing it in a script tag. To access the API in the template, you can use the `$` prefix followed by the API name (e.g., `$overlay.getQueue()`). Here's an example of how to use `$overlay` in a component's template:

```html
<template>
  <pre>
    {{ $overlay.getQueue() })
  </pre>
<template>
```

To import the API in a script tag, you can use the `useNuxtApp` function provided by Nuxt.js. Here's an example of how to import the `$overlay` API in a script tag:

```typescript
<script setup lang="ts">
import { useNuxtApp } from "#imports";
const { $overlay } = useNuxtApp()

function createNotification() {
  $overlay.create({
    text: "Hello, World!",
    type: "success",
    duration: 3000,
    queueName: "system-notify"
  });
}
</script>
```

## 👾 Component

```html
<template>
  <div>
    <h1>Welcome to NuxtOverlay Playground Component</h1>
    <label for="duration">Set duration time in milliseconds</label>
    <input
      id="duration"
      v-model="duration"
      type="text"
    >
    <br>
    <label for="positions">Choose a position</label>
    <select
      id="positions"
      v-model="select"
    >
      <option
        v-for="(position, index) in positions"
        :key="index"
        :value="position"
      >
        {{ position }}
      </option>
    </select>
    <button
      @click="$overlay.create({
        queueName: select,
        duration: 5000,
        type: `success`,
        text: `${select} message`,
        icon: `icon`,
        title: `Component title`,
        color: 'green',
      })"
    >
      show in {{ select }}
    </button>

    <NuxtOverlay
      v-for="(position, index) in positions"
      :key="index"
      :queue-name="position"
      :position="position"
    />
  </div>
<template>

<script setup lang="ts">
import { ref } from 'vue'
const select = ref( 'top-center' )
const duration = ref(5000)
const positions = ref( [
  'top-left',
  'top-center',
  'top-right',
  'center-left',
  'center',
  'center-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
])
</script>
```

## 👾 Slot Default

The default slot that can be used to insert any Vue.js template code into the overlay. This slot allows developers to create custom content for their overlays, including text, images, forms, or any other elements that can be styled and rendered in a web browser.

The `itemQueue` props represents the current item being rendered in the queue. This parameter is typically used to access information about the item, such as its type, text, icon, title, and color, which can be used to dynamically update the content displayed in the overlay.

```html
  <NuxtOverlay 
    :queue-name="system-notify" 
    :position="top-center" 
    :width="50wh"
  >
    <template #default="{ itemQueue }">
      <div :id="itemQueue.id">
        <!-- custom alert component -->
        <AppAlert
          :options="{
            type: itemQueue.type,
            text: itemQueue.text,
            icon: itemQueue.icon,
            title: itemQueue.title,
            color: itemQueue.color,
          }"
          @close="$overlay.remove(itemQueue.id)"
        />
      </div>
    </template>
  </NuxtOverlay>
```

# ⚙️ Configuration

"You can customize the default settings for the NuxtOverlay by modifying the `nuxtOverlay` object in your `app.config.ts` file. The available options include `queueName`, `position`, `closeOnClick`, and `duration`. Simply update the values for these options to match your desired configuration. You can also create additional configuration objects for specific use cases and use them when rendering the NuxtOverlay component. For more information on how to use app configuration in Nuxt, check out the Nuxt documentation."

```typescript
// app.config.ts
export default defineAppConfig({
  nuxtOverlay: {
    queueName: 'custom',
    position: 'top-center',
    closeOnClick: false,
    duration: 7000
  }
})
```

# 🫵🏻 Contributing

1. Clone this [repository](https://github.com/klaveren/nuxt-overlay)
2. Install dependencies using `npm install`
3. Run `npm run dev:prepare` to generate type stubs.
4. Use `npm run dev` to start https://nuxt.com/modules/playground in development mode.

# 📎 License

[MIT License]((https://github.com/klaveren/nuxt-overlay/blob/main/LICENSE)

[npm-version-src]: https://img.shields.io/npm/v/nuxt-overlay/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-overlay
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-overlay.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-overlay
[license-src]: https://img.shields.io/npm/l/nuxt-overlay.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-overlay
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
