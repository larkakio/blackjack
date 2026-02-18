/**
 * Base Mini App manifest config.
 * See: https://docs.base.org/mini-apps/quickstart/create-new-miniapp
 * Update accountAssociation after generating at https://www.base.dev/preview (Account association tab)
 */

const ROOT_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://blackjack-neo.vercel.app";

export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: "",
  },
  miniapp: {
    version: "1",
    name: "Blackjack Neo",
    subtitle: "Swipe to 21 on Base",
    description:
      "Futuristic Blackjack game on Base. Swipe to hit, stand, double or split. Neon cyberpunk style.",
    homeUrl: ROOT_URL,
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: "#0a0e1a",
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["blackjack", "casino", "cards", "base", "crypto"],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: "Swipe to 21 on Base",
    ogTitle: "Blackjack Neo | Play on Base",
    ogDescription: "Futuristic Blackjack with swipe controls",
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
    screenshotUrls: [`${ROOT_URL}/hero-image.png`],
  },
} as const;
