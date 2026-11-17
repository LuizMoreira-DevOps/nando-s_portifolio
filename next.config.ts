import type { NextConfig } from "next";

// ==========================================
// AMBIENTE DE PUBLICACAO
// ==========================================

const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const basePath = process.env.PAGES_BASE_PATH ?? "";

// ==========================================
// NEXT.JS CONFIGURATION
// ==========================================

const nextConfig: NextConfig = isGitHubPages
    ? {
          output: "export",

          trailingSlash: true,

          images: {
              unoptimized: true,
          },

          ...(basePath ? { basePath } : {}),
      }
    : {};

export default nextConfig;
