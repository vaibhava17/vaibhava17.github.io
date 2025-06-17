import Content from '../content/content';

export default function manifest() {
  return {
    name: Content.APP_NAME,
    short_name: Content.APP_NAME,
    description: Content.APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: Content.THEME_COLOR_BG_DARK,
    theme_color: Content.THEME_COLOR_PRIMARY_DARK,
    icons: [
      {
        src: Content.APP_LOGO_LIGHT,
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    screenshots: [
      {
        src: "/images/screenshot1.png",
        type: "image/png",
        sizes: "540x720"
      },
      {
        src: "/images/screenshot2.jpg",
        type: "image/jpg",
        sizes: "720x540"
      }
    ]
  }
}