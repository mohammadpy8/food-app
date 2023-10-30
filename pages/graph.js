import { useQuery } from "@apollo/client";
import { CLIENT, GET_DOG_PHOTO } from "@/graphql/client";
import { SkeletonTheme } from "react-loading-skeleton";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";


const Graph = () => {
  const { error, loading, data } = useQuery(CLIENT);

  if (loading) return <p>loading....</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      {data.locations.map(({ id, name, description, photo }) => (
        <div key={id}>
          <h3>name : {name}</h3>
          <img src={photo} alt={name} width="400" height="250" />
          <br />
          <p>desc: {description}</p>
        </div>
      ))}

      {/* <GetDog /> */}
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
      </Box>
    </div>
  );
};

export default Graph;

const GetDog = ({ breed }) => {
  const { data, loading, error, refetch } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
  });

  if (loading) return <p>loading....</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <button onClick={() => refetch({ breed: "new_dog_breed" })}>
        Refetch new breed!
      </button>
    </div>
  );
};
