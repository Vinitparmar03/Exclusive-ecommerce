import "./Skeleton.css";

const Skeleton = ({ width = "unset", length = 3 }) => {
  const skeletons = Array.from({ length }, (v, i) => (
    <div key={i} className="skeleton-shape"></div>
  ));

  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletons}
    </div>
  );
};

export default Skeleton;
