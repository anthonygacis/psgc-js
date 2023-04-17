import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PSGC-JS",
  description: "A collection of philippine geographic data based on PSGC",
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.png'
      }
    ],
    [
      'meta',
      {
        name: 'google-site-verification',
        content: 'lke6qpq4v2yAc5ez9ztO0Rc0FmiTpSuCcyu1AK9x4sM'
      }
    ],
  ],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.png",
    siteTitle: "PSGC-JS",
    editLink: {
      pattern: 'https://github.com/anthonygacis/psgc-js/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
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
        text: 'API Usage',
        items: [
          { text: 'Using Geographic Level', link: '/usage/using-geographic-level' },
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
