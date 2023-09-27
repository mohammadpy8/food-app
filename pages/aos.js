import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SkeletonTheme } from "react-loading-skeleton";
import { useSearchParams, usePathname, useParams } from "next/navigation";

const Aos = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const name = usePathname();
  const splitedName = name.split("/")[1];
  console.log(splitedName);
  const params = useParams();
  console.log(params);

  console.log(search);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <SkeletonTheme baseColor="#808080" highlightColor="#b1b1b1">
      <div data-aos="fade-up">Animate me!</div>
    </SkeletonTheme>
  );
};

export default Aos;
