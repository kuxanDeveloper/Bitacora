import { useEffect, useState } from "react";
import { userService } from "../services/UserService";

export default function Home() {
  const [Authorize, setAuthorize] = useState(false)
  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      setAuthorize(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return<></>
}
