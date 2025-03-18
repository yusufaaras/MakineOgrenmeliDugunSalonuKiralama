function Footer() {
  const footerStyle = {
    backgroundColor: "#343a40",
    color: "white",
    textAlign: "center",
    padding: "15px 0",
    width: "100%",
    marginTop: "auto",
  };

  const layoutStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const contentStyle = {
    flexGrow: 1,
    padding: "20px",
  };

  return (
    <div style={layoutStyle}>
      <div style={contentStyle}></div>
      <footer style={footerStyle}>
        <div className="container d-flex justify-content-center">
          <span className="text-muted">Copyright &copy; Website 2021</span>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
