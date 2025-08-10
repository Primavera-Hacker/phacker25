const NotFound = () => {
  return (
    <div
      style={{
        height: "calc(100 * var(--dvh) - 100px)",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <h1 style={{ fontSize: "40vw", lineHeight: 1 }}>404</h1>
    </div>
  );
};

export default NotFound;
