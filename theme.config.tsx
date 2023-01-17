import React, { useEffect } from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";

let initialAnalyticsPost = false;
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
      description: "Slotted League Script LUA Documentation.",
    };
  },
  darkMode: true,
  head: () => {
    const router = useRouter();

    useEffect(() => {
      if (!initialAnalyticsPost) {
        postAnalytics(router.asPath);
        initialAnalyticsPost = true;
      }
    }, []);

    useEffect(() => {
      const handleStop = (e: any) => {
        if (typeof e === "string") {
          postAnalytics(e);
        }
      };

      router.events.on("routeChangeComplete", handleStop);
      router.events.on("routeChangeError", handleStop);

      return () => {
        router.events.off("routeChangeComplete", handleStop);
        router.events.off("routeChangeError", handleStop);
      };
    }, [router]);

    return <></>;
  },
  nextThemes: { defaultTheme: "dark" },
};

const postAnalytics = async (path: string) => {
  const getUtmSource = () => {
    let urlSearchParams = new URLSearchParams(window.location.search);
    const utmSource = urlSearchParams.get("utm_source");
    if (utmSource) return utmSource;
    const utmMedium = urlSearchParams.get("utm_medium");
    if (utmMedium) return utmMedium;
    const utmCampaign = urlSearchParams.get("utm_campaign");
    if (utmCampaign) return utmCampaign;
    return null;
  };

  await fetch("/api/alytcs/visit", {
    method: "POST",
    body: JSON.stringify({
      referrer: document.referrer,
      host: document.location.host,
      path: path,
      useragent: navigator.userAgent,
      hardware_concurrency: navigator.hardwareConcurrency,
      language: navigator.language,
      screen_height: window.screen.height,
      screen_width: window.screen.width,
      is_mobile: !!(
        "ontouchstart" in document.documentElement &&
        navigator.userAgent.match(/Mobi/)
      ),
      utm_source: getUtmSource(),
      device_memory: (navigator as any).deviceMemory,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export function reportWebVitals(metric: any) {
  (async () => {
    try {
      await fetch("/api/alytcs/vital", {
        method: "POST",
        body: JSON.stringify({
          name: metric.name,
          label: metric.label,
          value: metric.value,
          path:
            typeof window !== "undefined"
              ? window.location.pathname
              : "unknown",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  })();
}

export default config;
