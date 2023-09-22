import MenuPage from "@/components/template/MenuPage";

const Menu = ({ data }) => {
  return <MenuPage data={data} />;
};

export default Menu;

export async function getStaticProps() {
  const response = await fetch(`${process.env.BASE_URL}/data`);
  const data = await response.json();

  return {
    props: {
      data,
    },
    revalidate: process.env.REVALIDATE,
  };
}
