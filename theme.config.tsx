import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>Slotted Docs</span>,
  editLink: false as any,
  feedback: false as any,
  footer: {
    text: `© ${new Date().getFullYear()} slotted.cc`,
  },
  useNextSeoProps: () => {
    return {
      title: "Slotted - LUA Documentation",
      description: "Slotted League Script LUA Documentation."
    }
  },
  darkMode: true,

}

export default config
