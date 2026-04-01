import { getAllEpisodeCards, getFeaturedEpisodes } from "@/lib/episodes";
import { fetchYouTubePlaylist, EVERYDAY_DATA_PLAYLIST_ID } from "@/lib/youtube";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import FeaturedEpisodes from "@/components/home/FeaturedEpisodes";
import TopicPillars from "@/components/home/TopicPillars";
import WhyListen from "@/components/home/WhyListen";
import HostCards from "@/components/home/HostCards";
import LatestEpisodes from "@/components/home/LatestEpisodes";
import HomeCTA from "@/components/home/HomeCTA";
import JsonLd from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/basePath";

export default async function HomePage() {
  const [featured, youtubeEpisodes] = await Promise.all([
    getFeaturedEpisodes(3),
    fetchYouTubePlaylist(EVERYDAY_DATA_PLAYLIST_ID, 3),
  ]);

  const podcastSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    name: "Everyday Data with Patricia & Zac",
    description:
      "Practical conversations about Data, AI, and how teams make them useful. Hosted by Patricia and Zac.",
    url: SITE_URL,
    image: `${SITE_URL}/og-default.png`,
    author: [
      { "@type": "Person", name: "Patricia" },
      { "@type": "Person", name: "Zachary Long", url: "https://zacharylong.github.io" },
    ],
    sameAs: [
      "https://open.spotify.com/show/0YoImym7yRsC6wGDxCrnRQ",
      "https://podcasts.apple.com/us/podcast/everyday-data-with-patricia-zac/id1874479161",
      "https://www.youtube.com/@EverydayDataWithPnZ",
    ],
  };

  return (
    <>
      <JsonLd data={podcastSchema} />
      <HeroSection />
      <AboutSection />
      <FeaturedEpisodes episodes={featured} />
      <TopicPillars />
      <WhyListen />
      <HostCards />
      <LatestEpisodes youtubeVideos={youtubeEpisodes} />
      <HomeCTA />
    </>
  );
}
