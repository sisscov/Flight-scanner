function FlightsNavbar() {
  return (
    <div className="topnav">
      <a href="#home" className="logo">
        <b>Fligo</b>
      </a>
      <a title="disabled" className="disabled">About</a>
      <a title="disabled" className="disabled">Contact</a>
      <input type="text" placeholder="Search.." title="disabled" className="disabled"/>
    </div>
  );
}

export default FlightsNavbar;
