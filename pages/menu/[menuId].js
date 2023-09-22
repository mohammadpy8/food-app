import { useRouter } from "next/router";

const MenuDetails = ({ foodDetail }) => {
  const router = useRouter();
  if (router.isFallback) return <h2>Is Loading...</h2>;

  return <div></div>;
};

export default MenuDetails;

export async function getStaticPaths() {
  const response = await fetch("http://localhost:4000/data");
  const json = await response.json();

  const data = json.slice(0, 10);

  const paths = data.map((food) => ({
    params: {
      menuId: food.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { menuId },
  } = context;

  const response = await fetch(`http://localhost:4000/data/${menuId}`);
  const data = await response.json();
  if (!data.id) return { notFound: true };
  return {
    props: {
      foodDetail: data,
    },
    revalidate: 10,
  };
}
