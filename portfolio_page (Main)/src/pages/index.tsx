import Home from './home';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Index() {
  return (
    <>
      <Home />
      <SpeedInsights />
    </>
  );
}
