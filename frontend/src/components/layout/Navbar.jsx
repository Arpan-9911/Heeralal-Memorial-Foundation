import React from "react";

const Topbar = () => {
  return (
    <div>
      <div className="bg-[var(--color-secondary)] text-white text-xs px-6 py-1 flex justify-between items-center">
        <div>
          <span className="font-semibold text-[var(--color-primary-light)]">
            LATEST:
          </span>{" "}
          Heeralal Memorial Foundation expands education reach...
        </div>
        <div className="flex items-center gap-3">
          <span>A+</span>
          <span>A-</span>
          <span>English | हिंदी</span>
        </div>
      </div>
      <div className="bg-white px-6 py-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-[var(--color-secondary)]" />
          <div>
            <h1 className="text-lg font-bold text-[var(--color-secondary)] tracking-wide">
              HEERALAL MEMORIAL FOUNDATION
            </h1>
            <p className="text-xs text-[var(--color-primary)] italic">
              Committed to Equality, Empowerment, and Sustainable Change
            </p>
          </div>
        </div>
        <div className="text-xs text-gray-600 text-right space-y-1">
          <div>NGO Reg No: DL/2023/...</div>
          <div>ESTD: 29, 2023</div>
          <div>CIN: U88900DL2023...</div>
        </div>
      </div>
    </div>
  );
};

const MainNav = () => {
  return (
    <header className="sticky top-0 z-100 bg-[var(--color-secondary)] shadow-md">
      <div className="text-white px-6 py-3 flex items-center justify-center relative gap-32">
        <div className="flex justify-end gap-8 text-xs font-medium flex-1">
          <span className="hover:text-[var(--color-primary-light)] cursor-pointer">
            HOME
          </span>
          <span className="hover:text-[var(--color-primary-light)] cursor-pointer">
            ABOUT US
          </span>
          <span className="hover:text-[var(--color-primary-light)] cursor-pointer">
            MEDIA
          </span>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="hover:scale-105 transition duration-300">
            <div className="w-16 h-16 rotate-45 bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-primary)] shadow-lg flex items-center justify-center">
              <span className="-rotate-45 text-[10px] font-bold text-black text-center">
                SUPPORT
                <br />
                DONATE
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-8 text-xs font-medium flex-1">
          <span className="hover:text-[var(--color-primary-light)] cursor-pointer">
            ACHIEVEMENTS
          </span>
          <span className="hover:text-[var(--color-primary-light)] cursor-pointer">
            PROGRAMS
          </span>
          <span className="hover:text-[var(--color-primary-light)] cursor-pointer">
            OUR TEAM
          </span>
        </div>
      </div>
    </header>
  );
};

const Navbar = () => {
  return (
    <>
      <Topbar />
      <MainNav />
    </>
  );
};

export default Navbar;
