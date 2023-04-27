import { useEffect, useState } from "react";
import { userService } from "../services/UserService";
import { useRouter } from "next/router";

export default function Home() {
  const [Authorize, setAuthorize] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      setAuthorize(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export async function getStaticProps() {
  return {
    props: {
      path: null,
    },
    revalidate: 10,
  };
}
