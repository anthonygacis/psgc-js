import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PSGC-JS",
  description: "A collection of philippine geographic data based on PSGC",
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    siteTitle: "PSGC-JS",

    nav: [
      { text: 'Home', link: '/' }
    ],

    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2021-present Anthony S. Gacis'
    },

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Demo', link: '/introduction/demo' },
          { text: 'Installation', link: '/introduction/installation' },
        ]
      },
      {
        text: 'API',
        items: [
          { text: 'Available Methods', link: '/api/available-methods' },
          { text: 'Region Code Reference', link: '/api/code-reference' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/anthonygacis/psgc-js' }
    ]
  }
})
