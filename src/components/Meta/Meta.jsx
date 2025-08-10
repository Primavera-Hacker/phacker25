import { Helmet } from "react-helmet";
import {
  DEFAULT_META_DESCRIPTION,
  DEFAULT_META_KEYWORDS,
} from "../Router/routes";

const Meta = ({
  title,
  description = DEFAULT_META_DESCRIPTION,
  keywords = DEFAULT_META_KEYWORDS,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* OpenGraph / Twitter meta tags para redes sociales */}
      <meta property="og:title" content={title} />
    </Helmet>
  );
};
export default Meta;
