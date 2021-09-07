import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { backendUrl } from "../constants/constants";
import { redirect } from "../utils/authUser";

function App({ Component, pageProps }) {
  return (
    <Layout {...pageProps}>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
  let pageProps = {};
  const protectedRoutes = ctx.pathname === "/";
  if (!token) {
    protectedRoutes && redirect(ctx, "/login");
  } else {
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    try {
      const res = await fetch(`${backendUrl}/api/auth`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      let data;
      if (!res.ok) {
        data = await res.text();
        throw new Error(data);
      }
      data = await res.json();
      const user = data;
      if (user) !protectedRoutes && redirect(ctx, "/");
      pageProps.user = user;
    } catch (e) {
      destroyCookie(ctx, "token");
      redirect(ctx, "/login");
    }
  }
  return { pageProps };
};

export default App;
