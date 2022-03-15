import PropTypes from "prop-types";

function Image({ src, caption }) {
  return (
    <img src={src} alt={caption} style={{ height: "60vh", width: "100%" }} />
  );
}

export default Image;
Image.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
