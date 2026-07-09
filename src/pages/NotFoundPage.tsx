import { Link } from "react-router-dom";
import { PageHeader, Seo } from "../components/PageElements";

export function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The requested Cellular Journeys page could not be found."
      />
      <PageHeader
        title="Page not found"
        intro="The page may have moved or the address may be incorrect."
      >
        <Link className="btn btn-primary" to="/">
          Return home
        </Link>
      </PageHeader>
    </>
  );
}
