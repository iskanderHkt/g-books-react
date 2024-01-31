import CategorySection from "../components/CategorySection";
import MainSwiper from "../components/MainSwiper/MainSwiper";

const Home = () => {
  const categories = ["classics", "programming", "science"] as const;

  return (
    <>
      <MainSwiper />
      {categories.map((category: string) => (
        <CategorySection categoryName={category} key={category} />
      ))}
    </>
  );
};

export default Home;
