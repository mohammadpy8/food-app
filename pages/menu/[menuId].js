const MenuDetails = () => {
  return <div></div>;
};

export default MenuDetails;

export async function getStaticPaths() {
  const response = await fetch("http://localhost:4000/data");
  const json = await response.json();

  const data = json.slice(0, 10);

  const paths = data.map((food) => ({
    params: {
      id: food.id.toString(),
    },
  }));

  return {
      paths,
      fallback: true,
  };
}
