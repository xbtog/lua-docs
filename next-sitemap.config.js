/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://slotted.cc/docs",
  generateRobotsTxt: true, // (optional)
};

module.exports = config;
