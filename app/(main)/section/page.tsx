import { BannerCarousel } from "./components/banner";
import { HomePage } from "./home/HomePage";
export const revalidate = 60
export default function SectionRoot() {
  return (
    <div>
      <section className="my-6 sm:my-10">
        <BannerCarousel />
        <HomePage />
      </section>
    </div>
  );
}











