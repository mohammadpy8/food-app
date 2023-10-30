import { useTransition, useState, memo, useEffect } from "react";

const transition = () => {
  const [isPendding, startTransition] = useTransition();
  const [tab, setTab] = useState("about");
  const [include, setInclude] = useState("nine");

  let scrollPosition = 0;

  useEffect(() => {
    if (include.includes(include)) {
      console.log(true);
    } else {
      console.log(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      scrollPosition = window.scrollY;
      console.log(scrollPosition);
    });
  }, []);

  const selectTab = (nextTab) => {
    startTransition(() => {
      selectTab(nextTab);
    });
  };

  useEffect(() => {
    const logkey = (event) => {
      console.log(`${event.code}`);
    };

    document.addEventListener("keyup", logkey);

    return () => document.removeEventListener("keyup", logkey);
  }, []);

  const date = new Date("05 October 2011 14:48 UTC");
  //   console.log(date.toDateString());
  console.log(date.toString());
  console.log(date.toISOString);

  const encoder = new TextEncoder();
  const view = encoder.encode("*");
  console.log(view);

  const [select, setSelect] = useState("");

  useEffect(() => {
    const selectHandle = (event) => {
      const selectedItems = event.target.value.substring(
        event.target.selectionStart,
        event.target.selectionEnd
      );

      console.log(selectedItems);
    };

    document.addEventListener("select", selectHandle);

    return () => document.removeEventListener("select", selectHandle);
  }, []);

  return (
    <>
      <input
        value={select}
        onChange={(event) => setSelect(event.target.value)}
      />
      <TabButton isActive={tab === "about"} onClick={() => selectTab("about")}>
        about
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => selectTab("posts")}>
        posts (slow)
      </TabButton>
      <TabButton
        isActive={tab === "contact"}
        onClick={() => selectTab("contact")}
      >
        contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
};

export default transition;

const TabButton = ({ children, isActive, onClick }) => {
  if (isActive) return <b>{children}</b>;

  return <button onClick={() => onClick()}>{children}</button>;
};

const AboutTab = () => {
  return <p>reactjs</p>;
};

const PostsTab = memo(function PostsTab() {
  let items = [];
  for (let i = 0; i < 20; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }

  return <ul>{items}</ul>;
});

const SlowPost = ({ index }) => {
  const startTime = performance.now();

  while (performance.now() - startTime < 1) {}
  return <li># post {index + 1}</li>;
};

const ContactTab = () => {
  return (
    <>
      <p>You can find me online here:</p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
};
