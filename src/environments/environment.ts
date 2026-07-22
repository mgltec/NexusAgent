// Development environment — points to the local ApiWager2026 WebAPI (.NET 10).
// `ng build` swaps this file for environment.prod.ts in production.
export const environment = {
  production: false,
  // New WagerApi (ApiWager2026) base URL. The Agent / AgentReports / AgentTools
  // controllers all live under this /api/ root.
  webAPI1: 'https://localhost:7240/api/',
};
