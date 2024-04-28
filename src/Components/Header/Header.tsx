function Header() {
  return (
    <>
      <header
        className="h-[80px] bg-transparent fixed w-full text-white flex items-center"
        style={{
          backdropFilter: "blur(8px)",
        }}
      >
        <nav className="max-width flex items-center justify-between">
          <div className="flex items-center">
            <span className="w-16 h-16 bg-[#353e4e] text-white text-[2.5rem] font-bold flex justify-center items-center rounded-full">
              W
            </span>
            <h2 className="text-[2rem] text-slate-700 font-semibold">eather</h2>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
