import Link from "next/link";
import SwiperList from "@/components/modules/SwiperList";

const Swiper = ({data}) => {
  // console.log(data);
  return (
    <>
      {data.map(food => (
        <SwiperList food={food}/>
      ))}
    </>
  );
};

export default Swiper;

export async function getStaticPaths() {
  const response = await fetch(`${process.env.BASE_URL}/data`);
  const data = await response.json();
  const paths = data.map(item => ({
    params: item.id.toString(),
  }));

  return {
    paths,
    fallback: true,
  }
};

export async function getStaticProps() {
  const response = await fetch(`${process.env.BASE_URL}/data`);
  const data = await response.json();

  return {
    props: {data}
  }
}